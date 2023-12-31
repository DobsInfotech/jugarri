const express = require("express");
const fs = require("fs");
const https = require("https");

const app = express();
const router = require("../src/router/router");

var path = require("path");

const key = fs.readFileSync(path.join(__dirname, "../ssl/private.key"));
const cert = fs.readFileSync(path.join(__dirname, "../ssl/certificate.crt"));

const cred = {
  key,
  cert,
};

app.use(express.static(path.join(__dirname, "../public")));
var ejs = require("ejs");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path);

require("dotenv").config();
var port = process.env.PORT || 3000;

// const sound = require("sound-play");
// sound.play(path.join(__dirname, "../public/Music/melodyloops.mp3"));

// app.get(
//   "/.well-known/pki-validation/B8A473917AB1495BD04013B279BA2AA0.txt",
//   (req, res) => {
//     res.sendFile(
//       path.join(__dirname, "../ssl/B8A473917AB1495BD04013B279BA2AA0.txt")
//     );
//   }
// );

app.get(
  "/.well-known/pki-validation/B8A473917AB1495BD04013B279BA2AA0.txt",
  (req, res) => {
    var a = {
      nm: "合成 1",
      ddd: 0,
      h: 435,
      w: 465,
      meta: { g: "@lottiefiles/toolkit-js 0.26.1" },
      layers: [
        {
          ty: 1,
          nm: "白色 纯色 1",
          sr: 1,
          st: 0,
          op: 250,
          ip: 0,
          hd: false,
          ddd: 0,
          bm: 0,
          hasMask: true,
          ao: 0,
          ks: {
            a: { a: 0, k: [232.5, 217.5, 0], ix: 1 },
            s: {
              a: 1,
              k: [
                {
                  o: { x: 0.167, y: 0.167 },
                  i: { x: 0.833, y: 0.833 },
                  s: [139, 139, 100],
                  t: 0,
                },
                {
                  o: { x: 0.167, y: 0.167 },
                  i: { x: 0.833, y: 0.833 },
                  s: [112.176, 112.176, 100],
                  t: 14,
                },
                {
                  o: { x: 0.167, y: 0.167 },
                  i: { x: 0.833, y: 1 },
                  s: [154, 154, 100],
                  t: 23,
                },
                {
                  o: { x: 0.167, y: 0 },
                  i: { x: 0.833, y: 0.833 },
                  s: [139, 139, 100],
                  t: 26,
                },
                {
                  o: { x: 0.167, y: 0.167 },
                  i: { x: 0.833, y: 0.833 },
                  s: [154, 154, 100],
                  t: 29,
                },
                { s: [139, 139, 100], t: 32 },
              ],
              ix: 6,
            },
            sk: { a: 0, k: 0 },
            p: { a: 0, k: [234, 216.25, 0], ix: 2 },
            r: { a: 0, k: 0, ix: 10 },
            sa: { a: 0, k: 0 },
            o: { a: 0, k: 100, ix: 11 },
          },
          ef: [],
          masksProperties: [
            {
              nm: "蒙版 1",
              inv: false,
              mode: "f",
              x: { a: 0, k: 0, ix: 4 },
              o: { a: 0, k: 100, ix: 3 },
              pt: {
                a: 0,
                k: {
                  c: true,
                  i: [
                    [0, 0],
                    [0, 0],
                    [1.948, 1.948],
                    [0, 0],
                    [-3.629, 0],
                    [0, 0],
                    [0, 0],
                    [-2.717, 0],
                    [0, 0],
                    [0, -2.717],
                    [0, 0],
                    [0, 0],
                    [2.681, -2.699],
                  ],
                  o: [
                    [0, 0],
                    [-1.948, 1.948],
                    [0, 0],
                    [-2.77, -2.77],
                    [0, 0],
                    [0, 0],
                    [0, -2.699],
                    [0, 0],
                    [2.699, 0],
                    [0, 0],
                    [0, 0],
                    [3.7, 0],
                    [0, 0],
                  ],
                  v: [
                    [266.828, 229.262],
                    [236.066, 260.006],
                    [229.005, 260.006],
                    [198.261, 229.243],
                    [201.425, 221.629],
                    [216.672, 221.629],
                    [216.672, 177.943],
                    [221.569, 173.046],
                    [243.52, 173.046],
                    [248.417, 177.943],
                    [248.417, 221.647],
                    [263.7, 221.647],
                    [266.828, 229.262],
                  ],
                },
                ix: 1,
              },
            },
          ],
          sc: "#ffffff",
          sh: 435,
          sw: 465,
          ind: 1,
        },
      ],
      v: "5.5.5",
      fr: 25,
      op: 32,
      ip: 0,
      assets: [],
    };
    res.json(a);
  }
);

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/css/style.css"));
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const httpsServer = https.createServer(cred, app);
httpsServer.listen(8443);
