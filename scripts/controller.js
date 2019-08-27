// Create a client instance
var client;
//client = new Paho.Client(location.hostname, Number(location.port), "clientId");
//client = new Paho.Client("iot.eclipse.org", 443, "clientId");
client = new Paho.Client("broker.hivemq.com", 8000, "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("World");
  message = new Paho.Message("Hello PN!");
  message.destinationName = "World";//topic to subscribe
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}