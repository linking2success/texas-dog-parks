"use strict";
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// Columns to extract
const columns = [
  "name",
  "site",
  "phone",
  "full_address",
  "street",
  "city",
  "postal_code",
  "state",
  "country",
  "latitude",
  "longitude",
  "photo",
  "working_hours",
  "business_status",
  "about",
  "description",
  "location_link"
];

const inputCsv = path.join(__dirname, "new_texas_dog_parks.csv");
const outputJs = path.join(__dirname, "parks-data.js");

const parks = [];

fs.createReadStream(inputCsv)
  .pipe(csv())
  .on("data", (row) => {
    // Only keep the required columns and add a slug
    const park = {};
    columns.forEach((col) => {
      park[col] = row[col] || "";
    });
    // Generate slug from name
    park.slug = (row.name || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    parks.push(park);
  })
  .on("end", () => {
    // Write to parks-data.js as a JS array
    const jsContent =
      "// Auto-generated from new_texas_dog_parks.csv\n" +
      "window.TEXAS_DOG_PARKS = " + JSON.stringify(parks, null, 2) + ";\n";
    fs.writeFileSync(outputJs, jsContent, "utf8");
    console.log(`parks-data.js generated with ${parks.length} parks.`);
  }); 