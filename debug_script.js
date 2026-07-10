import { createServer } from 'vite';
import puppeteer from 'puppeteer';

(async () => {
  const server = await createServer({
    server: { port: 5173 },
    root: process.cwd(),
  });
  await server.listen();
  console.log('Vite server started.');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning' || msg.type() === 'log') {
      console.log(`[BROWSER ${msg.type().toUpperCase()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    console.log(`[BROWSER EXCEPTION] ${error.message}`);
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  await new Promise(resolve => setTimeout(resolve, 3000)); // wait for a bit
  
  await browser.close();
  await server.close();
  console.log('Debug done.');
})();
