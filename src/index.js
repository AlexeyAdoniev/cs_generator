import fs from "node:fs/promises";
import vm from "node:vm";
import { Worker, isMainThread, parentPort } from "node:worker_threads";

import { DEFAULT } from "./consts.js";
import { getFiles, camelize } from "./utils.js";

import cheerio, { load } from "cheerio";

import path from "node:path";

(async () => {
  if (!isMainThread) {
    parentPort.once("message", async (data) => {
      const { cs, images } = data;

      const cssFile = await fs.open(`out/casestydies.css`, "w");

      const pageSelector = camelize(cs.name) + "Page";

      //NEED TO TEST PATHES ON MAC!!!!!!!
      const cssString = `
        .newCaseStydy.${pageSelector} .opilous_hero_area::before {
            background-image: url(${images.find((i) =>
              /(?!mob)\/background.png$/.test(i)
            )});
        }

        ${
          cs.distantPic
            ? `
        .newCaseStydy.${pageSelector} .distantPic {
            width: ${cs.distantPic}px;
            bottom: 5%;
            right: -20%;
        }
        `
            : ""
        }


        @media only screen and (max-width: 767px) {
            .newCaseStydy.${pageSelector} .opilous_hero_area::before {
                background-image: url(${images.find((i) =>
                  /mob\\background.png$/.test(i)
                )});
            }
    
        }

        `;
      cssFile.writeFile(cssString);
      cssFile.close();
    });
    return;
  }

  const code = await fs.readFile("./src/cs.js", "utf-8");

  const cs = await vm.runInContext(code, vm.createContext({}));

  const lname = cs.name.toLowerCase();

  await fs.mkdir(`out/${lname}`, {
    recursive: true,
  });

  const result = await fs.open(`out/${lname}/index.html`, "w");

  const $ = load(DEFAULT);

  const host = "https://xp.network";
  const imgBase = "/assets/img/" + lname + "/";
  //NEED TO TEST PATHES ON MAC!!!!!!!
  const images = (await getFiles(path.join(process.cwd(), "/src/img"))).map(
    (p) => imgBase + p.split("\\src\\img\\")[1]
  );

  const cssGenerator = new Worker("./src/index.js");
  cssGenerator.postMessage({
    cs,
    images,
  });

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

  cs.distantPic &&
    $(".opilous_hero.mainHeader.deskOnly").append(
      `<img src="${images.find((i) =>
        /distantPic.png$/.test(i)
      )}" alt="${lname}" class="distantPic" >`
    );

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

  prev.find("a").attr("href", "/" + cs.previous.route);
  prev.find("h2").html(cs.previous.slogan);
  prev.find("> img").attr("src", cs.previous.logo);

  next.attr("onclick", `window.open('/opulous', '_self')`);
  next.find("a").attr("href", "/opulous");
  next.find("h2").html("Bringing the power <br /> back to the artist");
  next.find("> img").attr("src", "/assets/img/home/opulous.svg");

  await result.writeFile($.html());
  result.close();

  //prev and next
  const [prevCS, nextCS] = await Promise.all([
    fs.readFile("prev/index.html", "utf-8"),
    fs.readFile("next/index.html", "utf-8"),
  ]);

  await Promise.all([
    fs.mkdir(`out/${cs.previous.route}`, {
      recursive: true,
    }),
    fs.mkdir(`out/opulous`, {
      recursive: true,
    }),
  ]);

  const [outPrevious, outNext] = await Promise.all([
    fs.open(`out/${cs.previous.route}/index.html`, "w"),
    fs.open(`out/opulous/index.html`, "w"),
  ]);

  const $prev = load(prevCS);
  const $next = load(nextCS);

  const nextPrev = $prev(".caseSliderRow .caseSlideItem:nth-child(2)");
  nextPrev.attr("onclick", `window.open('/${lname}', '_self')`);

  nextPrev.find("a").attr("href", "/" + lname);
  nextPrev.find("h2").html(slogan);
  nextPrev.find("> img").attr(
    "src",
    images.find((i) => /logo/.test(i))
  );
  nextPrev.find("> img").attr("alt", lname + "Logo");

  const prevNext = $next(".caseSliderRow .caseSlideItem:nth-child(1)");

  prevNext.attr("onclick", `window.open('/${lname}', '_self')`);

  prevNext.find("a").attr("href", "/" + lname);
  prevNext.find("h2").html(slogan);
  prevNext.find("> img").attr(
    "src",
    images.find((i) => /logo/.test(i))
  );
  prevNext.find("> img").attr("alt", lname + "Logo");

  outPrevious.writeFile($prev.html());
  outNext.writeFile($next.html());

  outPrevious.close();
  outNext.close();
})();

export {};
