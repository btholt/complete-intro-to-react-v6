const fs = require("fs").promises;
const path = require("path");
const fm = require("front-matter");
const isUrl = require("is-url-superb");
const parseLinks = require("parse-markdown-links");
const { sorter } = require("./src/util/helpers");
const mdDir = process.env.MARKDOWN_DIR || path.join(__dirname, "lessons/");
const outputPath =
  process.env.OUTPUT_CSV_PATH || path.join(__dirname, "public/lessons.csv");
const linksOutputPath =
  process.env.LINKS_CSV_PATH || path.join(__dirname, "public/links.csv");

async function createCsv() {
  console.log(`making the markdown files into a CSV from ${mdDir}`);

  // get paths
  const allFiles = await fs.readdir(mdDir);
  const files = allFiles.filter(filePath => filePath.endsWith(".md"));

  // read paths, get buffers
  const buffers = await Promise.all(
    files.map(filePath => fs.readFile(path.join(mdDir, filePath)))
  );

  // make buffers strings
  const contents = buffers.map(content => content.toString());

  // make strings objects
  let frontmatters = contents.map(fm);

  // find all attribute keys
  const seenAttributes = new Set();
  frontmatters.forEach(item => {
    Object.keys(item.attributes).forEach(attr => seenAttributes.add(attr));
  });
  const attributes = Array.from(seenAttributes.values());

  if (attributes.includes("order")) {
    frontmatters = frontmatters.sort(sorter);
  }

  // get all data into an array
  let rows = frontmatters.map(item => {
    const row = attributes.map(attr =>
      item.attributes[attr] ? JSON.stringify(item.attributes[attr]) : ""
    );
    return row;
  });

  // header row must be first row
  rows.unshift(attributes);

  // join into CSV string
  const csv = rows.map(row => row.join(",")).join("\n");

  // write file out
  await fs.writeFile(outputPath, csv);

  console.log(`Wrote ${rows.length} rows to ${outputPath}`);

  // make links csv
  let longestLength = 0;
  let linksArray = frontmatters.map(row => {
    const links = parseLinks(row.body).filter(isUrl);
    longestLength = longestLength > links.length ? longestLength : links.length;
    const newRow = [row.attributes.order, row.attributes.title, ...links];
    return newRow;
  });

  if (longestLength) {
    // add title row
    linksArray = linksArray.map(array => {
      const lengthToFill = longestLength + 2 - array.length;
      return array.concat(Array.from({ length: lengthToFill }).fill(""));
    });

    linksArray.unshift(
      ["order", "title"].concat(
        Array.from({ length: longestLength }).map((_, index) => `link${index}`)
      )
    );

    // join into CSV string
    const linksCsv = linksArray.map(row => row.join(",")).join("\n");

    // write file out
    await fs.writeFile(linksOutputPath, linksCsv);

    console.log(`Wrote ${linksArray.length} rows to ${linksOutputPath}`);
  }
}

createCsv();
