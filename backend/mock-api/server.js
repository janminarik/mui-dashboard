import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

const timeout = 1;

// Middleware na podporu filtrovania a stránkovania
server.use((req, res, next) => {
  if (req.method === "GET") {
    const queryKeys = Object.keys(req.query);
    const resource = req.path.slice(1);
    const db = router.db.get(resource).value();

    if (db && queryKeys.length > 0) {
      let filteredData = db;

      // Filtrovanie
      queryKeys.forEach((key) => {
        if (key.endsWith("_contains")) {
          const field = key.replace("_contains", "");
          const value = req.query[key]?.toString().toLowerCase();
          filteredData = filteredData.filter((item) =>
            item[field]?.toString().toLowerCase().includes(value)
          );
        } else if (key.endsWith("_startsWith")) {
          const field = key.replace("_startsWith", "");
          const value = req.query[key]?.toString().toLowerCase();
          filteredData = filteredData.filter((item) =>
            item[field]?.toString().toLowerCase().startsWith(value)
          );
        } else if (key.endsWith("_endsWith")) {
          const field = key.replace("_endsWith", "");
          const value = req.query[key]?.toString().toLowerCase();
          filteredData = filteredData.filter((item) =>
            item[field]?.toString().toLowerCase().endsWith(value)
          );
        } else if (key.endsWith("_equals")) {
          const field = key.replace("_equals", "");
          const value = req.query[key]?.toString().toLowerCase();
          filteredData = filteredData.filter(
            (item) => item[field]?.toString().toLowerCase() === value
          );
        }
      });

      // Stránkovanie
      const page = parseInt(req.query["_page"]) || 1;
      const limit = parseInt(req.query["_limit"]) || 10;
      const start = (page - 1) * limit;
      const end = start + limit;

      const paginatedData = filteredData.slice(start, end);

      // Hlavička X-Total-Count pre stránkovanie
      res.header("X-Total-Count", filteredData.length.toString());
      // **Pridanie hlavičky Access-Control-Expose-Headers**
      res.header("Access-Control-Expose-Headers", "X-Total-Count");

      //Oneskorenie pre test
      setTimeout(() => {
        res.json(paginatedData);
      }, timeout);
    } else {
      setTimeout(() => {
        next();
      }, timeout);
    }
  } else {
    setTimeout(() => {
      next();
    }, timeout);
  }
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server run on http://localhost:3001");
});
