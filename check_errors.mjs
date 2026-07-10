import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log('BROWSER CONSOLE:', msg.type(), msg.text());
    if (msg.type() === 'error') {
      const location = msg.location();
      console.log('LOCATION:', location.url, ':', location.lineNumber);
      if (msg.args() && msg.args().length > 0) {
        msg.args().forEach(async (arg) => {
          const val = await arg.jsonValue().catch(() => 'could not parse jsonValue');
          console.log('ARG:', val);
        });
      }
    }
  });
  
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  
  // Wait a bit for args to resolve
  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
})();
