const jsonServer = require("json-server");
const heroData = require("../server/data/heroes");

const middlewares = jsonServer.defaults();
const server = jsonServer.create();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/api/heroes", (req, res, next) => {
  res.status(200).send(heroData.getHeroes);
});

server.delete("/api/heroes/:id", (req, res) => {
  res.status(200).send(heroData.deleteHero);
});

server.put("/api/hero", (req, res) => {
  res.status(200).send(heroData.editHero);
});

server.post("/api/hero", (req, res) => {
  res.status(200).send(heroData.createHero);
});

server.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});
