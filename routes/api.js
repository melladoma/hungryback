var express = require("express");
var router = express.Router();
var request = require("sync-request");

const { default: mongoose } = require("mongoose");

const puppeteer = require('puppeteer');

const tesseract = require("node-tesseract-ocr");
const treatText = require("./text_treatment_function")
const treatWeb = require("./web_treatment_function")
var uniqid = require('uniqid');

//-------ROUTE TESSERACT - POST
router.post("/tesseract", async function (req, res, next) {
    var image = req.body.image;

    const config = {
        lang: "fra",
        oem: 3,
        psm: 3,
    }
    tesseract
        .recognize(image, config)
        .then((text) => {
            console.log("Result:", text)
            console.log(treatText(text))
            var resultObj = treatText(text)
            console.log(resultObj)
            res.json({ recipeTreated: resultObj });
        })
        .catch((error) => {
            console.log(error.message)
            res.json({ message: "err" });
        })

});
//     res.send('respond with a resource');
//  })
//DONNEES d'ENTREE: uri photo  req.body.photoUri
//TRAITEMENT : transfo text en objet
//DONNEES DE SORTIE: objet form{title,ingredients, direction, persons, cookingTime, prepTime, tags}


//------ROUTE URL SCRAPPER-POST
router.post("/url-scrapper", async function (req, res, next) {

    const iPhone = puppeteer.devices['iPhone 13'];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    /*  await page.emulate(iPhone); */


    await page.goto(req.body.url);

    //prend code source, mais certaines pages n'affichent rien comme React
    const extractedText = await page.$eval('*', (el) => el.innerText);
    console.log("extracted:", extractedText);

    //fais un copier coller à la main
    const extractedText1 = await page.$eval('*', (el) => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNode(el);
        selection.removeAllRanges();
        selection.addRange(range);
        return window.getSelection().toString();
    });
    console.log("extracted1", extractedText1);

    await page.screenshot({ path: './tmp/puppeteer/url_screenshot.jpg', fullPage: true });
    await page.pdf({ path: './tmp/puppeteer/puppet.pdf', format: 'a4' });

    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio,
        };
    });

    console.log('Dimensions:', dimensions);

    await browser.close();
    var resultObj = treatWeb(extractedText1)


    res.json({ status: true, recipe: resultObj });
})
//DONNEES d'ENTREE: uri photo  req.body.photoUri
//TRAITEMENT: ???
//DONNEES DE SORTIE:objet form{title,ingredients, direction, persons, cookingTime, prepTime, tags}


//---Test route tesseract
//ne pas oublier d'installer l'engine tesseract => brew install tesseract
//+packages langues => brew install tesseract-lang (attention, tres long )
router.get("/tesseract", async function (req, res, next) {

    // var text = await tesseract.recognize(
    // 	"https://picturetherecipe.com/wp-content/uploads/2013/07/Picture-The-Recipe-Tips-Muffin-tin-for-stuffed-veggies.jpg"
    // );

    // var image = "https://picturetherecipe.com/wp-content/uploads/2013/07/Picture-The-Recipe-Tips-Muffin-tin-for-stuffed-veggies.jpg"
    var image = "./tests/images/ok/ochazuke_9.png"

    const config = {
        lang: "fra",
        oem: 3,
        psm: 3,
    }
    tesseract
        .recognize(image, config)
        .then((text) => {
            console.log("Result:", text)
            console.log(treatText(text))
            var resultObj = treatText(text)
            res.json({ resultObj });
        })
        .catch((error) => {
            console.log(error.message)
            res.json({ message: "err" });
        })

});





module.exports = router;