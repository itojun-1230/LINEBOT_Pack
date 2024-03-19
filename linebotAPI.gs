//eventを取得
function getEvent(e) {
  const event = JSON.parse(e.postData.contents).events[0];
  /*[event] type
  {
    "type": string,
    "message": {
    "id": string,
    "quoteToken": string,
    "text": string
    },
    "webhookeventId": string,
    "deliveryContext": {
      "isRedelivery": boolean
    },
    "timestamp": number,
    "source": {
      "type": string,
      "userId": string,
    },
    "replyToken": string,
    "mode": string
  }
  */
  return event;
}

//メッセージ送信
function sendMessage(userid, message) {
  //apiルート
  const API_URL = "https://api.line.me/v2/bot/message/push";
  //アクセストークン
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
//プロフィール取得
function getProfile( userId ) {
  //apiルート
  const API_URL = `https://api.line.me/v2/bot/profile/${userId}`;
  //アクセストークン
  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");

  const response = UrlFetchApp.fetch(
    API_URL,
    {  
      "method": "get",
      "headers": {
        "Content-Type" : "application/json; charset=UTF-8",
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    }
  );
  /*[response] type
  {
    "displayName": string,
    "userId": string,
    "language": string,
    "pictureUrl": string,
    "statusMessage": string
  }
  */
  return JSON.parse(response.getContentText());
}