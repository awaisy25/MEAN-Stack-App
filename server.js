const http = require('http');
const app = require('./Backend/app');
 // setting the default ports
const port = process.env.PORT || 3000;
app.set('port', port);
//creating the server from using the express app
const server = http.createServer(app);
// listening to the port
server.listen(port, () => {
  console.log("listening on port 3000...");
});
