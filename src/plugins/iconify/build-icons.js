import { promises as fs } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Iconify tools and utilities
import { cleanupSVG, importDirectory, isEmptyColor, parseColors, runSVGO } from '@iconify/tools';
import { getIcons, getIconsCSS, stringToIcon } from '@iconify/utils';

// Importing JSON icon sets directly
import tablerIcons from '@iconify-json/tabler/icons.json';
import faIcons from '@iconify-json/fa/icons.json';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sources = {
    svg: [
        {
            dir: 'src/assets/images/iconify-svg',
            monotone: false,
            prefix: 'custom',
        },
    ],
    json: [
        tablerIcons,
        {
            filename: faIcons,
            icons: ['facebook', 'google', 'twitter', 'circle'],
        },
    ],
};

const target = join(__dirname, 'icons.css');

(async function () {
    const dir = dirname(target);
    try {
        await fs.mkdir(dir, { recursive: true });
    } catch (err) {}

    const allIcons = [];

    // Bundle JSON files and collect icons
    for (const item of sources.json) {
        const content = typeof item === 'object' ? item : JSON.parse(await fs.readFile(item, 'utf8'));
        
        if (content.prefix === 'tabler') {
            for (const k in content.icons) {
                content.icons[k].body = content.icons[k].body.replace(/stroke-width="2"/g, 'stroke-width="1.5"');
            }
        }

        if (typeof item !== 'string' && item.icons?.length) {
            const filteredContent = getIcons(content, item.icons);
            if (!filteredContent) throw new Error(`Cannot find required icons in ${item.filename}`);
            allIcons.push(filteredContent);
        } else {
            allIcons.push(content);
        }
    }

    // Bundle custom SVG icons and collect icons
    for (const source of sources.svg) {
        const iconSet = await importDirectory(source.dir, { prefix: source.prefix });
        await iconSet.forEach(async (name, type) => {
            if (type !== 'icon') return;
            const svg = iconSet.toSVG(name);
            if (!svg) {
                iconSet.remove(name);
                return;
            }
            try {
                await cleanupSVG(svg);
                if (source.monotone) {
                    await parseColors(svg, {
                        defaultColor: 'currentColor',
                        callback: (attr, colorStr, color) => (color && !isEmptyColor(color) ? 'currentColor' : colorStr),
                    });
                }
                await runSVGO(svg);
            } catch (err) {
                console.error(`Error parsing ${name} from ${source.dir}:`, err);
                iconSet.remove(name);
                return;
            }
            iconSet.fromSVG(name, svg);
        });
        allIcons.push(iconSet.export());
    }

    // Generate CSS from collected icons
    const cssContent = allIcons
        .map(iconSet => getIconsCSS(iconSet, Object.keys(iconSet.icons), {
            iconSelector: '.{prefix}-{name}',
            mode: 'mask',
        }))
        .join('\n');

    await fs.writeFile(target, cssContent, 'utf8');
    console.log(`Saved CSS to ${target}!`);
})();
