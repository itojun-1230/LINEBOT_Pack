const getEvent = (e) => {
  const event = JSON.parse(e.postData.contents).events[0];
  
  return event;
}