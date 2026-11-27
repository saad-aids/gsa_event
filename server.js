const http = require("http"), fs = require("fs"), path = require("path");
const types = {".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css",".png":"image/png",".ico":"image/x-icon"};
const root = __dirname;
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const file = path.join(root, path.normalize(p));
  const allowed = ["index.html", "config.js"];
  if (!file.startsWith(root) || !allowed.includes(path.basename(file)) || path.dirname(file) !== root) { res.writeHead(404); return res.end("Not found"); }
  fs.readFile(file, (e, data) => {
    if (e) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, {"Content-Type": types[path.extname(file)] || "text/plain", "Cache-Control": "no-cache"});
    res.end(data);
  });
}).listen(process.env.PORT || 3000, "0.0.0.0", () => console.log("GAME ON NIGHT running"));
