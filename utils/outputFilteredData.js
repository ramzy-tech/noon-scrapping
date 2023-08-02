const fs = require("fs");

async function outputFilteredData(pagesData, fileName = "../data.json") {
  let filteredData = [];

  pagesData.forEach((pageData) => {
    pageData = pageData.map((product) => ({
      brand: product.brand,
      name: product.name,
      price: product.price,
      salePrice: product.sale_price,
      url: product.url,
      rating: product.product_rating,
    }));
    filteredData = [...filteredData, ...pageData];
  });
  const jsonData = JSON.stringify(filteredData);
  fs.writeFile(fileName, jsonData, (err) => {
    if (err) console.log(err.message);
    console.log("Saved...");
  });
}

module.exports = outputFilteredData;
