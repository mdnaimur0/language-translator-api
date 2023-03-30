function doPost(e) {
  var response = { 'success': false, 'response': "Something went wrong!" };
  if (e.postData != undefined) {
    var contents = JSON.parse(e.postData.contents);
    if (contents) {
      try {
        var result = {};
        contents.map((item) => result[item.key] = LanguageApp.translate(item.value, e.parameter.from, e.parameter.to));
        response = { 'success': true, 'response': result };
      } catch (err) { }
    }
  }
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  try {
    var response = LanguageApp.translate(e.parameter.text, e.parameter.from, e.parameter.to);
    return ContentService.createTextOutput(JSON.stringify({ "success": (response != null), "response": response })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "success": false, "response": "Something went wrong!" })).setMimeType(ContentService.MimeType.JSON);
  }
}