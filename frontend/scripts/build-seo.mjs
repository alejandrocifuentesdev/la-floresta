import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { PAGE_METADATA, renderSeoHead } from '../src/utils/seo.js'

const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
await mkdir(new URL('../dist/seo/', import.meta.url), { recursive: true })

for (const [path, metadata] of Object.entries(PAGE_METADATA)) {
  const html = template.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, `<!-- seo:start -->\n    ${renderSeoHead(path, metadata)}\n    <!-- seo:end -->`)
  const file = path === '/' ? 'index.html' : `seo/${path.slice(1)}.html`
  await writeFile(new URL(`../dist/${file}`, import.meta.url), html)
}
