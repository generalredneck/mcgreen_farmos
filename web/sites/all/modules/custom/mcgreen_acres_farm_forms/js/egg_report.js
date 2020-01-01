jQuery(document).ready(function($) {

  var calendarEl = document.getElementById('calendar');
  var assets = Drupal.settings.mcgreen_acres_farm_forms.egg_report.assets;
  var eventSources = [];


  // Compile all the event sources
  for (var key in assets) {
    var item = assets[key];
    eventSources.push({
      url: '/mcgreen-acres/eggs/logs',
      color: item.color,
      textColor: item.textColor,
      extraParams: {
        asset: item.id
      }
    })
  }
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['interaction', 'dayGrid', 'timeGrid'],
    defaultView: 'dayGridMonth',
    height: 'parent',
    header: {
      left: 'today',
      center: 'title',
      right: 'prev,next'
    },
    eventSources: eventSources,
    eventClick: function(info) {
      console.log(info);
      $("input[name='date']").val(info.event.start.toISOString());
      $("input[name=event-id]").val(info.event.id);
      $("input[name='quantity']").val(info.event.extendedProps.quantity);
      $("input[name='animal'][value='" + info.event.extendedProps.asset + "']").attr('checked', 'checked');;
      $('#eggFormModal').modal();
    },
    dateClick: function (info) {
      $("input[name='date']").val(info.date.toISOString());
      $("input[name=event-id]").val('');
      $("input[name='quantity']").val('');
      $('#eggFormModal').modal();
    },
  });

  function saveEggData() {
    $('#eggFormModalSaveButton').attr("disabled", true);
    var $logId = $("input[name=event-id]").val();
    var $assetId = $("input[name='animal']:checked").val();
    var $quantity = $("input[name='quantity']").val();
    var $date = $("input[name='date']").val();
    $.post(
      '/mcgreen-acres/eggs/log/edit',
      {
        log_id: $logId,
        asset_id: $assetId,
        quantity: $quantity,
        date: $date
      },
      function(data) {
        if (!data.success) {
          alert(data.message);
        }
        calendar.refetchEvents();
        $('#eggFormModal').modal('hide');
        $('#eggFormModalSaveButton').attr("disabled", false);
      },
      'json'
    );
  }

  $('#eggFormModalSaveButton').on('click', saveEggData);
  calendar.render();
});
