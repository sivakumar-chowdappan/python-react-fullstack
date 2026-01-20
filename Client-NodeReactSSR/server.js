
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';

async function createServer() {
  const app = express();
  let vite;
  let template;
  let render;

  if (!isProd) {
    // Dev: use Vite in middleware mode
    vite = await (await import('vite')).createServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    // Prod: serve dist
    app.use('/assets', express.static(path.resolve(__dirname, 'dist/client/assets'), { index: false }));
  }

  app.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;

      // Load and transform HTML template
      const indexHtmlPath = isProd
        ? path.resolve(__dirname, 'dist/client/index.html')
        : path.resolve(__dirname, 'index.html');

      let html = fs.readFileSync(indexHtmlPath, 'utf-8');
      if (!isProd) {
        html = await vite.transformIndexHtml(url, html);
        // Load server entry on each request in dev
        const mod = await vite.ssrLoadModule('/src/entry-server.jsx');
        render = mod.render;
      } else {
        // Import built server bundle in prod (once)
        if (!render) {
          const serverPath = pathToFileURL(path.resolve(__dirname, 'dist/server/entry-server.js')).href;
          const mod = await import(serverPath);
          render = mod.render;
        }
      }

      const appHtml = await render(url);

      const finalHtml = html.replace('<!--ssr-outlet-->', appHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
    } catch (e) {
      if (!isProd && vite) vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  const port = process.env.PORT || 5173;
  app.listen(port, () => {
    console.log(`SSR server running at http://localhost:${port}`);
  });
}

createServer();

