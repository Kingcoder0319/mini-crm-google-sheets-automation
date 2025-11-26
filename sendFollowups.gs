function sendFollowUps() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CRM");
  if (!sheet) {
    Logger.log("sendFollowUps: CRM sheet not found.");
    return;
  }
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    Logger.log("sendFollowUps: No data rows.");
    return;
  }
  var data = sheet.getRange(2,1,lastRow-1,9).getValues();
  var today = new Date().toDateString();
  var sentCount = 0;

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var name = row[0];        // Customer Name (A)
    var email = row[2];       // Email (C)
    var followDate = row[6];  // Next Follow-up (G)

    if (followDate) {
      var fd = new Date(followDate).toDateString();
      if (fd === today) {
        if (email) {
          try {
            MailApp.sendEmail(
              email,
              "Follow-up Reminder",
              "Hi " + name + ",\n\nThis is a reminder for your scheduled follow-up today.\n\nRegards,\nCRM Team"
            );
            sentCount++;
          } catch (err) {
            Logger.log("Failed to send to " + email + ": " + err);
          }
        } else {
          Logger.log("Row " + (i+2) + " has no email; skipping.");
        }
      }
    }
  }

  Logger.log("sendFollowUps completed. Emails sent: " + sentCount);
  // Optional: write last-run timestamp to Dashboard (uncomment if you have Dashboard sheet)
  try {
    var dash = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Dashboard');
    if (dash) dash.getRange('K1').setValue('Last run: ' + new Date());
  } catch (e) {
    Logger.log('Could not write last-run timestamp: ' + e);
  }
}
