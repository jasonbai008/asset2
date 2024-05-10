"use strict";

let fs = require("fs");
let path = require("path");

// 临时数组容器
let nameArr = [];
let valueArr = [];
let listArr = [];

fs.readdir("../mp3", (err, files) => {
  // 构建拼音名称数组
  valueArr = files;
  files.forEach((folderName) => {
    let innerPath = path.resolve(__dirname, `../mp3/${folderName}`);
    let fileArr = fs.readdirSync(innerPath);
    let linkArr = fileArr.map((name) => `https://jasonbai008.github.io/asset2/mp3/${folderName}/${name}`);
    fs.writeFileSync(`./${folderName}.json`, JSON.stringify(linkArr, null, 4));
    // 构建中文名称数组
    nameArr.push(fileArr[0].split("_")[0]);
  });

  listArr = valueArr.map((v, i) => {
    return {
      name: nameArr[i],
      value: v,
      origin: "asset2",
    };
  });

  fs.writeFileSync("./list.json", JSON.stringify(listArr, null, 4));
});
