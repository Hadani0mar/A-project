/**
 * سيرفر مشاهدة بسيط (بدون تبعيات) — يعرض صفحة لاعب ويبث الفيديو مع دعم
 * HTTP Range (تقديم/تأخير داخل المتصفح).
 * التشغيل: node scripts/serve-video.mjs  ثم افتح http://localhost:8080
 */
import { createServer } from "node:http";
import { createReadStream, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const PORT = 8080;
const VIDEO = join(root, "out", "arena-agent.mp4");
const POSTER = join(root, "out", "poster.jpg");

const page = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>🤖 أنا وكيلك الذكي — فيديو Arena Agent</title>
<style>
  * { margin: 0; box-sizing: border-box; }
  body { background: #EEF3FD; color: #0E1B33; font-family: "Segoe UI", Tahoma, Arial, sans-serif;
         min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
         padding: 28px 16px; gap: 18px;
         background-image: radial-gradient(ellipse 70% 50% at 15% 0%, rgba(242,89,140,.30), transparent),
                           radial-gradient(ellipse 55% 45% at 85% 8%, rgba(255,197,61,.34), transparent),
                           radial-gradient(ellipse 65% 55% at 90% 100%, rgba(47,124,246,.26), transparent),
                           radial-gradient(ellipse 50% 45% at 8% 100%, rgba(13,190,134,.24), transparent); }
  h1 { font-size: clamp(22px, 4vw, 38px); font-weight: 800; text-align: center; }
  h1 .grad { background: linear-gradient(100deg,#2F7CF6,#7C5CFF 55%,#FB4D6D);
             -webkit-background-clip: text; background-clip: text; color: transparent; }
  p { color: rgba(14,27,51,.68); text-align: center; }
  video { width: min(1080px, 96vw); aspect-ratio: 16/9; border-radius: 18px;
          border: 1px solid rgba(14,27,51,.10); box-shadow: 0 30px 80px rgba(80,100,170,.28); background:#EEF3FD; }
  .row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
  a.btn { text-decoration: none; color: #fff; font-weight: 700; padding: 12px 26px; border-radius: 999px;
          background: linear-gradient(100deg,#2F7CF6,#7C5CFF 60%,#FB4D6D); }
  a.ghost { background: #FFFFFF; color: #0E1B33; border: 1px solid rgba(14,27,51,.12); }
</style>
</head>
<body>
  <h1>🤖 أنا <span class="grad">وكيلك الذكي</span> — Arena · Agent Mode</h1>
  <p>فيديو موشن جرافيك مصنوع بالكامل بالكود (Remotion) · 66 ثانية · 1080p · تعليق عربي</p>
  <video src="/arena-agent.mp4" poster="/poster.jpg" controls autoplay playsinline></video>
  <div class="row">
    <a class="btn" href="/arena-agent.mp4" download>⬇️ تنزيل الفيديو MP4</a>
    <a class="btn ghost" href="https://github.com/Hadani0mar/A-project/pull/1" target="_blank" rel="noopener">💻 السورس كود (Pull Request)</a>
  </div>
</body>
</html>`;

function sendFile(req, res, filePath, contentType) {
  if (!existsSync(filePath)) { res.writeHead(404); return res.end("Not found"); }
  const { size } = statSync(filePath);
  const range = req.headers.range;
  if (range) {
    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    const start = parseInt(startStr, 10) || 0;
    const end = endStr ? parseInt(endStr, 10) : size - 1;
    res.writeHead(206, {
      "Content-Type": contentType,
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
    });
    createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
      "Content-Length": size,
    });
    createReadStream(filePath).pipe(res);
  }
}

createServer((req, res) => {
  const url = (req.url || "/").split("?")[0];
  if (url === "/" || url === "/index.html") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(page);
  }
  if (url === "/arena-agent.mp4") return sendFile(req, res, VIDEO, "video/mp4");
  if (url === "/poster.jpg") return sendFile(req, res, POSTER, "image/jpeg");
  res.writeHead(404); res.end("Not found");
}).listen(PORT, "0.0.0.0", () => console.log(`Video server ready on http://0.0.0.0:${PORT}`));
