// Complete Events Exercise

const http = require("http");
const { EventEmitter } = require("events");
const path = require("path");
const fs = require("fs");

let NewsLetter = new EventEmitter();

http
  .createServer(function (req, res) {
    const { url, method } = req;
    const chunks = [];

    req.on("error", (err) => {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify(err));
      res.end();
    });

    req
      .on("data", (chunk) => {
        chunks.push(chunk);
      })
      .on("end", () => {
        if (url === "/newsletter_signup" && method === "POST") {
          const result = JSON.parse(Buffer.concat(chunks).toString());

          console.log(result);

          NewsLetter.emit("signup", result);

          res.setHeader("Content-Type", "application//json");
          res.write(
            JSON.stringify({ msg: "Successful signed up to newsletter" })
          );
          res.end();
        } else {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application//json");
          res.write(JSON.stringify({ msg: "Not a vaild endpoint" }));
          res.end();
        }
      });

    res.on("error", (error) => {
      console.log(err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(error));
      res.end();
    });
  })
  .listen(3001, function () {
    console.log("listening on port 3001...");
  });

NewsLetter.on("signup", (newContact) => {
  const contact = `${JSON.stringify(newContact)}\n`;
  fs.appendFile(path.join(__dirname, "/newsletter.csv"), contact, (err) => {
    if (err) {
      NewsLetter.emit("error", err);
      return;
    }
    console.log("The file was updated successfully!");
  });

  NewsLetter.on("error", (err) => {
    console.error(err);
  });
});
