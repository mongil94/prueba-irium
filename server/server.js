const jsonServer = require("json-server");
const heroData = require("../server/data/heroes");

const middlewares = jsonServer.defaults();
const server = jsonServer.create();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/api/heroes", (req, res, next) => {
  res.status(200).send(heroData.getHeroes);
});

server.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});
