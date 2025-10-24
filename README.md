# LiveMesh

A minimal Next.js concept UI illustrating the LiveMesh "type → see → ship" workflow. The single page wireframe focuses on a chat-first builder that produces instant previews with lightweight deployment options.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Deployment notes

- Disable directory listings on any static file host. For Apache-based hosts, add the provided `.htaccess` file with:
  ```
  Options -Indexes
  DirectoryIndex index.html
  ```
- For a more robust setup, build the Next.js app and serve it from a Node.js runtime inside Docker behind a reverse proxy such as Caddy or Traefik.
- Point your DocumentRoot or proxy target to the built application output rather than the repository root to avoid exposing source files.
- Expose any backend functionality on the same origin under paths like `/api/*` to keep previews and API calls on a single host.
