const express = require("express");
const lumie = require("lumie");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3000;

app.get("/api/health", (req, res) => {
  res.send("alive!");
});

app.use(express.json());

let corsOptions;
corsOptions = {
  origin: "*",
  allowedHeaders: ["Origin", "Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

lumie.load(app, {
  preURL: "api",
  verbose: true,
  ignore: ["*.spec", "*.action", "helper"],
  controllers_path: path.join(__dirname, "src/controllers"),
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
