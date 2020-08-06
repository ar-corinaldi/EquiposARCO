const puppeteer = require("puppeteer");

async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "http://localhost:3000/terceros/5f204c984bae830d8034a1d2/bodegas/5f204cd74bae830d8034a1d3/ordenes/5f204dc44bae830d8034a1ea",
    { waitUntil: "networkidle0" }
  );
  const pdf = await page.pdf({ format: "A4" });

  await browser.close();
  return pdf;
}

printPDF.then((pdf) => {
  res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
  res.send(pdf);
});
