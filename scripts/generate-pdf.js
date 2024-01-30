import { chromium } from "playwright";

function parsePort(argv) {
  if (argv.length < 3) throw new Error("port not provided");
  const port = parseInt(argv[2]);
  if (!(port > 0)) throw new TypeError("port must be > 0");
  return port;
}

async function main() {
  const port = parsePort(process.argv);
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });

  await page.emulateMedia({ media: "print" });

  await page.pdf({
    path: "public/joseph-earl-resume.pdf",
    margin: { top: "50px", bottom: "80px" },
    printBackground: true,
  });

  return browser.close();
}

main();
