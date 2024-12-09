import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  if (req.method === "GET" && req.url.includes("_page")) {
    const totalCount = router.db
      .get(req.url.split("?")[0].slice(1))
      .value().length;
    res.header("X-Total-Count", totalCount);
  }
  next();
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server run on http://localhost:3001");
});
