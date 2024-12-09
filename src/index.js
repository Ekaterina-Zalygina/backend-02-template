const http = require("http");
const url = require("url");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const query = parsedUrl.query;

  if (parsedUrl.pathname === "/") {
    if ("hello" in query) {
      if (query.hello) {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        response.end(`Hello, ${query.hello}`);
      } else {
        response.statusCode = 400;
        response.setHeader("Content-Type", "text/plain");
        response.end("Enter a name");
      }
      return;
    }

    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello, World!");
    return;
  }

  if (parsedUrl.pathname === "/users") {
    try {
      const users = getUsers();
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(users);
    } catch (err) {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end("Error reading users file");
    }
    return;
  }

  response.statusCode = 500;
  response.setHeader("Content-Type", "text/plain");
  response.end();
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
