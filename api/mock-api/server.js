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

// Middleware na rozšírené filtrovanie
server.use((req, res, next) => {
  const queryKeys = Object.keys(req.query);

  // Získanie datasetu
  const resource = req.path.slice(1);
  const db = router.db.get(resource).value();

  if (db && queryKeys.length > 0) {
    let filteredData = db;

    queryKeys.forEach((key) => {
      if (key.endsWith("_contains")) {
        const field = key.replace("_contains", "");
        const value = req.query[key].toLowerCase();
        filteredData = filteredData.filter((item) =>
          item[field]?.toString().toLowerCase().includes(value)
        );
      } else if (key.endsWith("_startsWith")) {
        const field = key.replace("_startsWith", "");
        const value = req.query[key].toLowerCase();
        filteredData = filteredData.filter((item) =>
          item[field]?.toString().toLowerCase().startsWith(value)
        );
      } else if (key.endsWith("_endsWith")) {
        const field = key.replace("_endsWith", "");
        const value = req.query[key].toLowerCase();
        filteredData = filteredData.filter((item) =>
          item[field]?.toString().toLowerCase().endsWith(value)
        );
      } else if (key.endsWith("_equals")) {
        const field = key.replace("_equals", "");
        const value = req.query[key].toLowerCase();
        filteredData = filteredData.filter(
          (item) => item[field]?.toString().toLowerCase() === value
        );
      }
    });

    res.json(filteredData);
  } else {
    next();
  }
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server run on http://localhost:3001");
});
