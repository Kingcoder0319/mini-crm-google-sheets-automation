function onEdit(e) {
  try {
    if (!e) {
      Logger.log('onEdit called with no event object — this happens when Run is pressed in editor. Aborting.');
      return;
    }

    var range = e.range;
    if (!range) {
      Logger.log('No range in event. Aborting.');
      return;
    }
    var sheet = range.getSheet();
    if (!sheet) return;
    if (sheet.getName().trim() !== 'CRM') {
      Logger.log('Edit not in CRM sheet: ' + sheet.getName());
      return;
    }

    // If column A (1) is edited and row > 1
    if (range.getColumn() == 1 && range.getRow() > 1) {
      var createdCell = sheet.getRange(range.getRow(), 9); // Column I
      if (!createdCell.getValue()) {
        createdCell.setValue(new Date());
        Logger.log('Created date set at row ' + range.getRow());
      } else {
        Logger.log('Created date already present at row ' + range.getRow());
      }
    }
  } catch (err) {
    Logger.log('Error in onEdit: ' + err);
  }
}
