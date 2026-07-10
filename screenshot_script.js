import { createServer } from 'vite';
import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const server = await createServer({
    server: { port: 5173 },
    root: process.cwd(),
  });
  await server.listen();

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log(`[LOG] ${msg.text()}`));
  page.on('pageerror', error => console.log(`[ERR] ${error.message}`));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  await page.evaluate(() => {
    const vault = document.getElementById('vault');
    if (vault) vault.scrollIntoView({ behavior: 'instant' });
  });

  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await page.screenshot({ path: 'screenshot.png' });
  const html = await page.content();
  fs.writeFileSync('dom.html', html);
  
  await browser.close();
  await server.close();
  console.log('Done capturing screenshot and dom.');
})();
