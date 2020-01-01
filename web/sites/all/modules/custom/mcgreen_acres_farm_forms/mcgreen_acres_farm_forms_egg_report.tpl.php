<div id="calendar">
</div>
<!-- Modal -->
<div class="modal fade" id="eggFormModal" tabindex="-1" role="dialog" aria-labelledby="eggFormModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="eggFormModalTitle">Record Eggs</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <input type="hidden" name="event-id" />
          <input type="hidden" name="date" />
          <div class="form-group">
            <label for="quantity" class="col-form-label">Number of eggs:</label>
            <input class="form-control" type="number" name="quantity" /><br />
          </div>
          <?php foreach ($assets as $asset_id => $asset): ?>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="animal" id="animal<?php echo $asset_id; ?>" value="<?php echo $asset_id; ?>">
              <label class="form-check-label" for="animal<?php echo $asset_id; ?>"><?php echo $asset; ?></label>
            </div>
          <?php endforeach; ?>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="eggFormModalSaveButton">Save changes</button>
      </div>
    </div>
  </div>
</div>
<!-- End Modal -->
