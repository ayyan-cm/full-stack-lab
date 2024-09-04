const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  fs.readFile("inde.html", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
