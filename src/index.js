import fs from "node:fs/promises";
import vm from "node:vm";
import { Worker, isMainThread, parentPort } from "node:worker_threads";

import { DEFAULT, CARDS } from "./consts.js";
import { getFiles, camelize, kebabify } from "./utils.js";

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
                /(?!mob)\/bg.png$/.test(i)
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
                    /mob\/bg.png$/.test(i)
                )});
            }
    
        }

        `;
            cssFile.writeFile(cssString);
            cssFile.close();

            const $ = load(CARDS);

            const htmlFile = await fs.open(`out/card.html`, "w");

            const cs_card = $(`a[href='\/${cs.cardParent}']`).parent().parent();

            cs_card.attr(
                "onclick",
                `window.innerWidth >= 300 && window.open('/${camelize(
                    cs.name
                )}/', '_self')`
            );
            cs_card.find(".box_content_img.desktop_only").attr(
                "src",
                images.find((i) => /card-main/.test(i))
            );
            cs_card.find(".box_content_img.mobileOnly").attr(
                "src",
                images.find((i) => /card-main/.test(i))
            );

            cs_card.find(".bxocontent_logo img:nth-child(1)").attr(
                "src",
                images.find((i) => /logo/.test(i))
            );
            cs_card.find(".bxocontent_logo img:nth-child(2)").attr(
                "src",
                images.find((i) => /logo/.test(i))
            );
            cs_card.find("h2").text(cs.title.desk.replaceAll("</br>", ""));
            cs_card.find("p").text(cs.overview);
            cs_card.find("a").attr("href", `/${camelize(cs.name)}`);

            htmlFile.writeFile(cs_card.toString().replaceAll("&amp;", "&"));
        });
        return;
    }

    const code = await fs.readFile("./src/cs.js", "utf-8");

    const cs = await vm.runInContext(code, vm.createContext({}));

    const lname = camelize(cs.name);

    await fs.mkdir(`out/${lname}`, {
        recursive: true,
    });

    const result = await fs.open(`out/${lname}/index.html`, "w");

    const $ = load(DEFAULT);

    const host = "https://xp.network";
    const imgBase = "/assets/img/" + lname + "/";
    //NEED TO TEST PATHES ON MAC!!!!!!!
    const images = (await getFiles(path.join(process.cwd(), "/src/img"))).map(
        (p) => imgBase + p.split("/src/img/")[1]
    );

    const cssGenerator = new Worker("./src/index.js");
    cssGenerator.postMessage({
        cs,
        images,
    });

    // console.log(images);

    //html generation
    const slogan = cs.title.desk.replaceAll("</br>", "");
    $("head title").text(cs.name.replaceAll("</br>", ""));
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

    $("body").addClass(cs.darkTone ? "flate_menu" : "");
    $("body .bodyWrap").removeClass(cs.previous.class);
    $("body .bodyWrap").addClass(lname + "Page");

    $(".opilous_hero.deskOnly h2").html(cs.title.desk);
    $(".opilous_hero.deskOnly").addClass(cs.title.centred ? "centred" : "");
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
        images.find((i) => /mob\/overview.png$/.test(i)) ||
            images.find((i) => /overview.png$/.test(i))
    );

    //   /overviewImg deskOnly
    $("#csInfo").html(
        cs.content.reduce((acc, cur) => {
            const key = Object.keys(cur)[0];

            function paragraph(className = "") {
                const text = cur[key];
                const rows = text
                    .split("\n")
                    .map((str) => str.trim())
                    .filter((str) => str !== "")
                    .map((str) => `<p class="${className}">${str}</p>`)
                    .join("\n");

                return acc + rows;
            }

            switch (key) {
                case "h2": {
                    return acc + `<h2 class='titleMargin'>${cur[key]}</h2>\n`;
                }
                case "h4": {
                    return (
                        acc + `<h4 class='subTitleMargin'>${cur[key]}</h4>\n`
                    );
                }
                case "p": {
                    return paragraph();
                }
                case "list": {
                    return paragraph("list") + "</br>";
                }
                case "img": {
                    return (
                        acc +
                        `
            <div class="newform_card" style="padding: 0; margin-bottom: 30px;">
                <img src="${images.find((i) =>
                    new RegExp(`desk\/image${cur[key]}.png$`).test(i)
                )}" class="desktop_only">
                <img src="${images.find((i) =>
                    //NEED TO TEST PATHES ON MAC!!!!!!!
                    new RegExp(`mob\/image${cur[key]}.png$`).test(i)
                )}" class="mobileOnly" style="margin-top: 50px;">
            </div>
            `
                    );
                }
            }
        }, "")
    );

    $(".followUsDiv").text(cs.followUs);

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
    nextPrev.find("h2").html(cs.title.short);
    nextPrev.find("> img").attr(
        "src",
        images.find((i) => /logo/.test(i))
    );
    nextPrev.find("> img").attr("alt", lname + "Logo");

    const prevNext = $next(".caseSliderRow .caseSlideItem:nth-child(1)");

    prevNext.attr("onclick", `window.open('/${lname}', '_self')`);

    prevNext.find("a").attr("href", "/" + lname);
    prevNext.find("h2").html(cs.title.short);
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
