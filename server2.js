const app = require("./Backend/app");
const debug = require('debug')('node-angular');
const http = require("http");
// port function to see if it is a valid number
const normalizePort = val => {
  var port = parseInt(val, 10);
  //if it is null or empty
  if (isNaN(port)){
    return val;
  }

  if (port >= 0){
    return port;
  }
  return false;
};
// function to deal with errors
const onError = error =>{
  // if systems call is not listen it will throw an error
  if (error.syscall !== "listen"){
    throw error;
  }
  // checks if type of addr by using ternary to see if addr exists
const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
// switch statement for each of the error types
switch(error.code){
  case "EACCES":
    console.error(bind + " requires elevated privileges");
    process.exit(1);
    break;
  case "EADDRINUSE":
    console.error(bind + " is already in use");
    process.exit(1);
    break;
  default:
    throw error;
}
};
// function to listen to requests
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};
// checks if port is valid from the funciton created above
const port = normalizePort(process.env.PORT || "3000");
// sets the port on the app
app.set("port", port);
// create the connection to the server
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
