function sendWeeklyReport() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Dashboard");

  // Export the Dashboard sheet as PDF
  var url = ss.getUrl();
  var exportUrl = url.replace(/edit$/, '') + 
    'export?format=pdf&sheetnames=false&printtitle=false&' +
    'pagenumbers=false&gridlines=false&fzr=false&' +
    'size=A4&portrait=true&fitw=true&sheet=' + sheet.getSheetId();

  var token = ScriptApp.getOAuthToken();
  var response = UrlFetchApp.fetch(exportUrl, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  var pdfBlob = response.getBlob().setName("Weekly_CRM_Report.pdf");

  // Send the PDF to your email
  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: "Weekly CRM Report",
    body: "Here is your weekly CRM performance report.",
    attachments: [pdfBlob]
  });
}
