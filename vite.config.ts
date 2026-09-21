import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import https from 'https';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function googleDriveSyncPlugin(): Plugin {
  let cache: Record<string, { timestamp: number; data: any }> = {};

  const handleDriveRequest = async (req: any, res: any, next: any) => {
    if (req.url && req.url.startsWith('/api/drive-folder-images')) {
      const parsedUrl = new URL(req.url, 'http://localhost:3000');
      const folderId = parsedUrl.searchParams.get('folderId') || '1iE-yNnJvrZG-BnTUzWzdF2DdelpfiDd3';

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');

      const now = Date.now();
      // 10-second TTL cache for responsiveness and rate-limiting
      if (cache[folderId] && now - cache[folderId].timestamp < 10000) {
        res.end(JSON.stringify(cache[folderId].data));
        return;
      }

      try {
        const fetchHtml = (id: string) => new Promise<string>((resolve, reject) => {
          https.get(`https://drive.google.com/drive/folders/${id}?usp=sharing`, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            }
          }, (dRes) => {
            let body = '';
            dRes.on('data', chunk => body += chunk);
            dRes.on('end', () => resolve(body));
          }).on('error', reject);
        });

        const driveHtml = await fetchHtml(folderId);

        const items: Array<{
          id: string;
          filename: string;
          title: string;
          mimeType: string;
          url: string;
          fallbackUrl: string;
          width?: number;
          height?: number;
          aspectRatio?: string;
          slug?: string;
          clientName?: string;
          category?: string;
          year?: string;
          websiteUrl?: string;
          description?: string;
          fullGuideId?: string;
          fullGuideFilename?: string;
          fullGuideMimeType?: string;
          fullGuideType?: string;
          fullGuideWidth?: number;
          fullGuideHeight?: number;
          fullGuideUrl?: string;
          fallbackFullGuideUrl?: string;
        }> = [];

        // Known dimension map for common files across projects
        const dimensionMap: Record<string, { width: number; height: number }> = {
          '1ygHHH0Roe_YOLW8IiJlsoG4x1Zs3EIKk': { width: 1080, height: 1350 }, // Hyu.png (4:5)
          '1RiZIcusa472KtDl6vzFwX7fT-6Z_iLiN': { width: 2500, height: 2500 },
          '1T88ZHIrBUZdQwdIn1xe8jHwJUGxWQk1Z': { width: 1080, height: 1080 },
          '1z4KIlEkN9uACIqGIop7aVSwmQMI3d-0T': { width: 1080, height: 1080 },
          '1ep_Fm-7I5CDWeBF0y7a2HP3_fRXnHqR4': { width: 1080, height: 1080 },
          '1Bxff8CiS4dhJxfXyO4F_c0k7Q69jXgPB': { width: 1080, height: 1080 },
          '1aFTi7G6RUX6PxLWaDgmTASTlM9l07M4L': { width: 1080, height: 1080 },
          '15mDIEvyzkxxxsw3yopbQc9M8oKPZKDcm': { width: 1080, height: 1080 },
          // Logo & Branding items
          '1s5wJISvGi4PiC6eCZ7h_7GoyL5jUIPz8': { width: 1600, height: 900 }, // Aadhya Thumbnail (16:9)
          '1v0kK9GOPRwEhE8E6Tef8oFe11ukMcj4a': { width: 1600, height: 900 }, // Ink Thumbnail (16:9)
          '1SAcpHN89FcOX6uEifNCPvy58piIX2OrN': { width: 1600, height: 900 }, // Kaya Thumbnail (16:9)
          '16sgw-tXv1V_W4v1javw0q7TUoj_FLEMP': { width: 969, height: 1600 },
          '1x1mQ7X7zc59duu77uc-C7liK9IHYxzSP': { width: 228, height: 1600 },
          '1BngSz6IyKvrjASIl1VAiv_GA704L5VKJ': { width: 518, height: 1600 }
        };

        const parseImages = (html: string) => {
          const list: Array<{ id: string; mimeType: string; filename: string }> = [];
          const regex = /\[\[null,"([a-zA-Z0-9_-]{25,})"\],null,null,null,"(image\/[^"]+)"[\s\S]*?\[\[\["([^"]+)",null,1\]\]\]/g;
          let match;
          while ((match = regex.exec(html)) !== null) {
            list.push({ id: match[1], mimeType: match[2], filename: match[3] });
          }
          return list;
        };

        // 1. Direct images in the root folder
        const directImages = parseImages(driveHtml);
        for (const img of directImages) {
          const title = img.filename.replace(/\.[^/.]+$/, '');
          const safeName = img.filename.toLowerCase().replace(/\s+/g, '-');
          const dims = dimensionMap[img.id];
          items.push({
            id: img.id,
            filename: img.filename,
            title,
            mimeType: img.mimeType,
            url: `https://lh3.googleusercontent.com/d/${img.id}`,
            fallbackUrl: `images/social-media/drive/${safeName}`,
            ...(dims ? { width: dims.width, height: dims.height, aspectRatio: `${dims.width} / ${dims.height}` } : {})
          });
        }

        // 2. Subfolders inside the root folder
        if (items.length === 0) {
          const subfolderRegex = /<tr data-selectable data-id="([a-zA-Z0-9_-]{25,})"[^>]*>[\s\S]*?(?:aria-label|title)="([^"]+?)\s+Shared folder"/g;
          let sfMatch;
          const subfolders: Array<{ id: string; name: string }> = [];
          while ((sfMatch = subfolderRegex.exec(driveHtml)) !== null) {
            subfolders.push({ id: sfMatch[1], name: sfMatch[2] });
          }

          for (const sf of subfolders) {
            try {
              const sfHtml = await fetchHtml(sf.id);
              const sfImages = parseImages(sfHtml);
              if (sfImages.length > 0) {
                // Find thumbnail image
                const thumbImg = sfImages.find(i => /thumb|thub/i.test(i.filename)) || sfImages[0];
                const guideImg = sfImages.find(i => i.id !== thumbImg.id);
                const dims = dimensionMap[thumbImg.id];
                const safeName = thumbImg.filename.toLowerCase().replace(/\s+/g, '-');
                const slug = sf.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const isPdf = guideImg ? (guideImg.mimeType === 'application/pdf' || /\.pdf$/i.test(guideImg.filename)) : false;
                const guideDims = guideImg ? dimensionMap[guideImg.id] : null;
                const safeGuideName = guideImg ? guideImg.filename.toLowerCase().replace(/\s+/g, '-') : '';

                items.push({
                  id: thumbImg.id,
                  slug,
                  clientName: sf.name,
                  filename: thumbImg.filename,
                  title: `${sf.name} — Brand Identity`,
                  category: 'Basic Brand Guide',
                  year: '2024',
                  mimeType: thumbImg.mimeType,
                  url: `https://lh3.googleusercontent.com/d/${thumbImg.id}`,
                  fallbackUrl: `images/logo-branding/drive/${safeName}`,
                  ...(dims ? { width: dims.width, height: dims.height, aspectRatio: `${dims.width} / ${dims.height}` } : {}),
                  ...(guideImg ? {
                    fullGuideId: guideImg.id,
                    fullGuideFilename: guideImg.filename,
                    fullGuideMimeType: guideImg.mimeType,
                    fullGuideType: isPdf ? 'pdf' : 'image',
                    fullGuideUrl: `https://lh3.googleusercontent.com/d/${guideImg.id}`,
                    fallbackFullGuideUrl: `images/logo-branding/drive/${safeGuideName}`,
                    ...(guideDims ? { fullGuideWidth: guideDims.width, fullGuideHeight: guideDims.height } : {})
                  } : {})
                });
              }
            } catch (err: any) {
              console.warn(`[Google Drive Sync] Subfolder ${sf.name} fetch error:`, err?.message);
            }
          }
        }

        if (items.length > 0) {
          const payload = {
            success: true,
            folderId,
            count: items.length,
            images: items,
            fetchedAt: new Date().toISOString()
          };
          cache[folderId] = { timestamp: now, data: payload };
          res.end(JSON.stringify(payload));
          return;
        }
      } catch (err: any) {
        console.warn('[Google Drive Sync] live fetch notice:', err?.message);
      }

      // Fallback to specific static manifest if available
      const specificFallback = folderId === '1JPKtgjLMcRf2a6-YPQvWXqsivNeGUNnf'
        ? path.resolve(__dirname, 'public', 'api', 'drive-folder-logo-branding.json')
        : path.resolve(__dirname, 'public', 'api', 'drive-folder-images.json');

      if (fs.existsSync(specificFallback)) {
        res.end(fs.readFileSync(specificFallback, 'utf8'));
      } else {
        const fallbackPath = path.resolve(__dirname, 'public', 'api', 'drive-folder-images.json');
        if (fs.existsSync(fallbackPath)) {
          res.end(fs.readFileSync(fallbackPath, 'utf8'));
        } else {
          res.statusCode = 500;
          res.end(JSON.stringify({ success: false, error: 'Failed to fetch Drive images' }));
        }
      }
      return;
    }
    next();
  };

  return {
    name: 'vite-plugin-google-drive-sync',
    configureServer(server) {
      server.middlewares.use(handleDriveRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleDriveRequest);
    }
  };
}

// LINT.IfChange(aistudio_media_plugin)
function aistudioMediaPlugin(): Plugin {
  return {
    name: 'vite-plugin-aistudio-media',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/assets/aistudio/')) {
          const rawPath = req.url.split('?')[0].split('#')[0];
          try {
            const decodedPath = decodeURIComponent(rawPath);
            const relativePath = decodedPath.replace(/^\//, '');
            const aistudioDir = path.resolve(
              __dirname,
              'public',
              'assets',
              'aistudio',
            );
            const filePath = path.resolve(__dirname, 'public', relativePath);
            if (
              filePath.startsWith(aistudioDir + path.sep) &&
              fs.existsSync(filePath) &&
              fs.statSync(filePath).isFile()
            ) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.bmp': 'image/bmp',
                '.ico': 'image/x-icon',
                '.mp4': 'video/mp4',
                '.webm': 'video/webm',
                '.ogv': 'video/ogg',
                '.mp3': 'audio/mpeg',
                '.wav': 'audio/wav',
                '.ogg': 'audio/ogg',
                '.pdf': 'application/pdf',
              };
              res.setHeader(
                'Content-Type',
                mimeMap[ext] || 'application/octet-stream',
              );
              res.setHeader('Cache-Control', 'no-cache');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          } catch {
            // Fall through if URI decoding or file access fails
          }
        }
        next();
      });
    },
  };
}
// LINT.ThenChange(//depot/google3/java/com/google/alkali/boq/makersuite/applet_dev_service/templates/initializers/react_theme/vite.config.ts:aistudio_media_plugin)

// Dynamic Guide route rewrite plugin for client pages (e.g. /guide/ink-contracting, /guide/aadhya)
function guideRoutePlugin(): Plugin {
  const handleGuideRoute = (req: any, _res: any, next: any) => {
    if (req.url && (req.url === '/guide' || req.url.startsWith('/guide/'))) {
      const queryIdx = req.url.indexOf('?');
      const query = queryIdx !== -1 ? req.url.slice(queryIdx) : '';
      req.url = '/index.html' + query;
    }
    next();
  };

  return {
    name: 'vite-plugin-guide-routes',
    configureServer(server) {
      server.middlewares.use(handleGuideRoute);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleGuideRoute);
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), aistudioMediaPlugin(), googleDriveSyncPlugin(), guideRoutePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          socialMedia: path.resolve(__dirname, 'social-media-designs.html'),
          digitalCampaigns: path.resolve(__dirname, 'digital-campaigns.html'),
          logoBranding: path.resolve(__dirname, 'logo-and-branding.html'),
          motionGraphics: path.resolve(__dirname, 'motion-graphics.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
