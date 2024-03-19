class init {
  constructor(token){
    this.token = token;
  }
  getEvent(e) {
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
  sendMessage(userid, message) {
    //apiルート
    const API_URL = "https://api.line.me/v2/bot/message/push";
  
    UrlFetchApp.fetch(
      API_URL,
      {  
        "method": "post",
        "headers": {
          "Content-Type" : "application/json; charset=UTF-8",
          'Authorization': `Bearer ${this.token}`,
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
  getProfile( userId ) {
    //apiルート
    const API_URL = `https://api.line.me/v2/bot/profile/${userId}`;
    
    const response = UrlFetchApp.fetch(
      API_URL,
      {  
        "method": "get",
        "headers": {
          "Content-Type" : "application/json; charset=UTF-8",
          'Authorization': `Bearer ${this.token}`,
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
    this.profile = JSON.parse(response.getContentText());
  }
}