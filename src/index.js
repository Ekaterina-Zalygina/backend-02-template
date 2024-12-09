const http = require("http");
const url = require("url");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);

  if (parsedUrl.pathname === "/" && "hello" in parsedUrl.query) {
    const name = parsedUrl.query.hello;

    if (name) {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.write(`Hello, ${name}`);
    } else {
      response.statusCode = 400;
      response.setHeader("Content-Type", "text/plain");
      response.write("Enter a name");
    }
    response.end();
    return;
  }

  if (parsedUrl.pathname === "/" && request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.write("Hello, World!");
    response.end();
    return;
  }

  if (parsedUrl.pathname === "/" && "users" in parsedUrl.query) {
    try {
      const users = getUsers();
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(users);
    } catch (err) {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.write("Error reading users file");
    }
    response.end();
    return;
  }
  response.statusCode = 500;
  response.setHeader("Content-Type", "text/plain");
  response.end();
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
