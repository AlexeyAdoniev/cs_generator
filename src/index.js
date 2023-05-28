import fs from "node:fs/promises";
import vm from "node:vm";

import { DEFAULT } from "./consts.js";
import { getFiles } from "./utils.js";

import cheerio, { load } from "cheerio";

import path from "node:path";

(async () => {
  const code = await fs.readFile("./src/cs.js", "utf-8");
  const cs = await vm.runInContext(code, vm.createContext({}));

  const result = await fs.open("results.html", "w");

  const $ = load(DEFAULT);

  const lname = cs.name.toLowerCase();
  const host = "https://xp.network";
  const imgBase = "/assets/img/" + lname + "/";
  //NEED TO TEST PATHES ON MAC!!!!!!!
  const images = (await getFiles(path.join(process.cwd(), "/src/img"))).map(
    (p) => imgBase + p.split("\\src\\img\\")[1]
  );

  console.log(images);
  //html generation
  const slogan = cs.title.desk.replace("</br>", "");
  $("head title").text(cs.name);
  $("head meta[name='twitter:title']").attr("content", slogan);
  $("head meta[property='og:title']").attr("content", slogan);
  $("head meta[name='description']").attr("content", cs.overview);
  $("head meta[name='twitter:description']").attr("content", cs.overview);
  $("head meta[property='og:description']").attr("content", cs.overview);

  $("head meta[name='twitter:image']").attr(
    "content",
    host + images.find((i) => /meta.png$/.test(i))
  );

  $("head meta[property='og:image']").attr(
    "content",
    host + images.find((i) => /meta.png$/.test(i))
  );

  $("body .bodyWrap").removeClass(cs.previous.class);
  $("body .bodyWrap").addClass(lname + "Page");

  $(".opilous_hero.deskOnly h2").html(cs.title.desk);
  $(".opilous_hero.mobOnly h2").html(cs.title.mob);

  $(".projectOverview p").text(cs.overview);

  $(".projectOverview a").text(cs.site.text);

  $(".projectOverview a").attr("href", cs.site.link);

  $(".overviewImg.deskOnly").attr(
    "src",
    images.find((i) => /overview.png$/.test(i))
  );

  $(".overviewImg.mobOnly").attr(
    "src",
    images.find((i) => /mOverview.png$/.test(i)) ||
      images.find((i) => /overview.png$/.test(i))
  );

  //   /overviewImg deskOnly
  $("#csInfo").html(
    cs.content.reduce((acc, cur) => {
      const key = Object.keys(cur)[0];
      console.log(key);
      switch (key) {
        case "h2": {
          return acc + `<h2 class='titleMargin'>${cur[key]}</h2>\n`;
        }
        case "p": {
          const text = cur[key];
          const rows = text
            .split("\n")
            .map((str) => str.trim())
            .filter((str) => str !== "")
            .map((str) => `<p>${str}</p>`)
            .join("\n");

          return acc + rows;
        }
        case "img": {
          return (
            acc +
            `
            <div class="newform_card" style="padding: 0; margin-bottom: 30px;">
                <img src="${images.find((i) =>
                  new RegExp(`${lname}\/image${cur[key]}.png$`).test(i)
                )}" class="desktop_only">
                <img src="${images.find((i) =>
                  //NEED TO TEST PATHES ON MAC!!!!!!!
                  new RegExp(`mob\\\\image${cur[key]}.png$`).test(i)
                )}" class="mobileOnly" style="margin-top: 50px;">
            </div>
            `
          );
        }
      }
    }, "")
  );

  const prev = $(".caseSliderRow .caseSlideItem:nth-child(1)");
  const next = $(".caseSliderRow .caseSlideItem:nth-child(2)");
  prev.attr("onclick", `window.open('/${cs.previous.route}', '_self')`);

  prev.find("a").attr("href", cs.previous.route);
  prev.find("h2").html(cs.previous.slogan);
  prev.find("> img").attr("src", cs.previous.logo);

  next.attr("onclick", `window.open('/opulous', '_self')`);
  next.find("a").attr("href", "/opulous");
  next.find("h2").html("Bringing the power <br /> back to the artist");
  next.find("> img").attr("src", "/assets/img/home/opulous.svg");

  await result.writeFile($.html());
  result.close();

  const prevCS = await fs.readFile("prev/index.html", "utf-8");
  const nextCS = await fs.readFile("next/index.html", "utf-8");

  console.log(nextCS);

  //edit prev and next cs
})();

export {};
