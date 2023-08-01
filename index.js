const puppeteer = require("puppeteer");
const collectPageDataListener = require("./utils/collectPageDataListener");
const outputFilteredData = require("./utils/outputFilteredData");
const fs = require("fs");

const targetWebsite =
  "https://www.noon.com/egypt-en/search/?q=laptops&gclid=CjwKCAjwt52mBhB5EiwA05YKo7EaN5MNy6snwTACY9d4TxpxxdFWDr9W_Bn1REj3Wpj85XiKy1N1BRoCHWkQAvD_BwE&utm_campaign=C1000156235N_eg_en_web_searchxxexactandphrasexxallcompetitorsxx30052023_noon_web_c1000088l_acquisition_semunbranded_&utm_medium=cpc&utm_source=C1000088L";

async function main() {
  let accumulatorArray = [];
  let numberOfPages = 5;
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  try {
    await collectPageDataListener(page, accumulatorArray);
  } catch (error) {
    console.log("Error During responce listener");
  }

  try {
    await page.goto(targetWebsite);
    while (numberOfPages > 1) {
      await page.waitForSelector(".next img");
      await page.click(".next div");
      numberOfPages--;
    }
  } catch (error) {
    console.log("Error During Navigation");
  }
  await outputFilteredData(accumulatorArray, `${process.cwd()}/products.json`);

  await browser.close();
}

main();
