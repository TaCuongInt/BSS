const Koa = require("koa");
const cors = require("koa-cors");
const Router = require("koa-router");
const Logger = require("koa-logger");
const BodyParser = require("koa-bodyparser");

const router = new Router();
const app = new Koa();
const PORT = 3001;

app.use(cors());
app.use(Logger());
app.use(BodyParser());

//#region File

const readFile = (fileName) => {
  const rawdata = require("fs").readFileSync(`./Databases/${fileName}.json`);
  return JSON.parse(rawdata);
};

const writeFile = (dataAdd, fileName) => {
  let jsons = new Array();

  const rawdata = require("fs").readFileSync(`./Databases/${fileName}.json`);
  JSON.parse(rawdata).forEach((item) => {
    jsons.push(item);
  });
  /*
  dataAdd.forEach((item) => {
    jsons.push(item);
  });
  */
  jsons.push(dataAdd);

  const fs = require("fs");

  const data = JSON.stringify(jsons);
  fs.writeFileSync(`./Databases/${fileName}.json`, data);
  /*
  let rawdata1 = fs.readFileSync(`./Databases/${fileName}.json`);
  return JSON.parse(rawdata1);
  */
};

//#endregion

//#region Routers

router.post("/Login", async (ctx, next) => {
  const body = JSON.parse(ctx.request.rawBody);
  const fileData = readFile("accounts");

  if (!body.username || !body.password) {
    ctx.response.status = 400;
    ctx.response.body = {
      message: "Bad request!",
    };
    return;
  }

  const index = fileData.findIndex(
    (user) => user.username === body.username && user.password === body.password
  );

  if (index > -1) {
    const resData = fileData[index];
    ctx.response.body = {
      data: resData,
    };
  } else {
    ctx.response.status = 403;
    ctx.response.body = {
      message: "Forbidden",
    };
  }
  await next();
});

router.get("/Dashboard", async (ctx, next) => {
  ctx.body = readFile("devices");
  await next();
});

router.post("/Dashboard", async (ctx, next) => {
  const body = JSON.parse(ctx.request.rawBody);
  writeFile(body, "devices");
  if (!body) {
    ctx.response.status = 400;
    ctx.response.body = {
      message: "Bad request!",
    };
    return;
  } else {
    ctx.response.body = {
      data: "Success",
    };
  }
  await next();
});

router.get("/Logs", async (ctx, next) => {
  ctx.body = readFile("logs");
  await next();
});

//#endregion

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, function () {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/",
    PORT,
    PORT
  );
});
