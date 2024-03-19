const getEvent = (e) => {
  const event = JSON.parse(e.postData.contents).events[0];
  
  return event;
}
const sendMessage = (userid, message) => {
  const API_URL = "https://api.line.me/v2/bot/message/push";
  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");
  
  UrlFetchApp.fetch(
    API_URL,
    {  
      "method": "post",
      "headers": {
        "Content-Type" : "application/json; charset=UTF-8",
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
      "payload": JSON.stringify({
        "to" : userid,
        "messages" : [
          {
            'type':'text',
            'text': message
          }
        ]
      })
    }
  );
}