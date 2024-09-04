const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("File read error:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
      return;
    }
    try {
      // Parsing JSON data
      const jsonData = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(jsonData));
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Bad Request: Invalid JSON" }));
    }
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
