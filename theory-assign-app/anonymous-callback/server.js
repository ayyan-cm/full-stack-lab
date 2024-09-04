const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Asynchronous file read operation with an anonymous callback function
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    } else {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(jsonData));
    }
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
