const app = require('express')  
const router = app.Router() 
const {variables,chromeOptions,chromeOptions2} = require('../utils.js')
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');


const formatearPrecio = (precio)=> precio.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, "");
let datos = [];

router.get('/',(req,res)=>{
    console.log("Buscando Precios");
    res.header("Access-Control-Allow-Origin", "*");
    allPromise.then(values => {
        console.log("Termino de Buscar Precios");
        res.json(datos);
      }).catch(error => {
        error;
      });
})

router.get('/reloadPricePS5',(req,res)=>{
    console.log("Actualizando Precios");
    datos = [];
    allPromise = Promise.all([scrapearParisPS5(), scrapearWeplayPS5(),scrapearLaPolarPS5(),scrapearFalabellaPS5(),scrapearHitesPS5(),scrapearPcNitroPS5(),
    scrapearGoldenGamerPS5(),scrapearTottusPS5(),scrapearRipleyPS5(),scrapearProMovilPS5()]);
    allPromise.then(values =>{
        console.log("Termino de Actualizar Precios");
        res.json(datos);
      }).catch(error=>{
        error;
      });
})

//Cheerio

async function scrapearRipleyPS5() {
    try {
        let { data } = await axios.get(variables.urlRipleyExport);
        let $ = cheerio.load(data);
        let precio = $('#row > div.col-xs-12.col-sm-12.col-md-5 > section.product-info > dl > div.product-price-container.product-internet-price-not-best > dt').first().text();
        datos.push({ url: variables.urlRipleyExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"Ripley" });
    }catch (error) {
        console.log(error);
    }
}



async function scrapearGoldenGamerPS5() {
    try {
        let { data } = await axios.get(variables.urlGoldenGamerExport);
        let $ = cheerio.load(data);
        let precio = $('#ProductPrice-product-template > span').first().text();
        datos.push({ url: variables.urlGoldenGamerExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"Golden Gamer" });
    } catch (error) {
        console.log(error);
    }

}

async function scrapearHitesPS5() {
    try {
        let { data } = await axios.get(variables.urlHitesExport);
        let $ = cheerio.load(data, { normalizeWhitespace: false, xmlMode: true });
        let precio = $('#zoom-837800001 > div.row.d-none.d-lg-flex > div > div > div > div > span.price-item.sales > span').first().text();
        datos.push({ url: variables.urlHitesExport, precio: precio.trim(), precioParse: formatearPrecio(precio),tienda:"Hites" });
    } catch (error) {
        console.log(error);
    }

}

async function scrapearParisPS5() {
    try {
        let { data } = await axios.get(variables.urlParisExport);
        let $ = cheerio.load(data, { normalizeWhitespace: false, xmlMode: true });
        let precio = $('#pdpMain > div > div.col-xs-12.col-sm-12.col-md-6.col-lg-5.info-product-detail > div > div.col-xs-12.product-price-2 > div > div.price__inner > div.price__text-wrap.price__text-wrap--primary > div.price__text').first().text();
       datos.push({ url: variables.urlParisExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"Paris" });
    } catch (error) {
        console.error(error);
    }

}

async function scrapearWeplayPS5() {
    try {
        let { data } = await axios.get(variables.urlWePlayExport);
        let $ = cheerio.load(data, { normalizeWhitespace: false, xmlMode: true });
        let precio = $('#product-price-35943 > span').first().text();
        datos.push({ url: variables.urlWePlayExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"Weplay" });  
    } catch (error) {
        console.error(error);
    }


}

async function scrapearLaPolarPS5() {
    try {
        let { data } = await axios.get(variables.urlLaPolarExport);
        let $ = cheerio.load(data);
        let precio = $('body > div.page > div > div.ms-contain-desktoplarge.pdp-wrapper.product-wrapper.product-detail > div.ms-row.pdp-image-and-detail.ms-margin-hp.collapsed.product-detail > div.pdp-right-content.details-container.col-xs-12.col-sm.ms-no-padding.js-details-container > div > div.col-xs-12.ms-flex.ms-no-padding.prices-actions > div > p.la-polar.price.js-tlp-price.lp-font--barlow-bold.ms-flex > span.price-value').text();
        datos.push({ url: variables.urlLaPolarExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"La Polar" });
    } catch (error) {
        console.log(error);
    }

}

//Puppeter

async function scrapearTottusPS5() {
    try {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(variables.urlToTusExport,{chromeOptions2});
    let text = await page.evaluate(() => {
        return document.querySelector('#testId-pod-prices-110655008 > ol > li.jsx-2797633547.prices-0 > div > span').innerText;
    });
    await page.close();
    await browser.close();
    datos.push({ url: variables.urlToTusExport, precio: text, precioParse: formatearPrecio(text),tienda:"Tottus" });  
    } catch(error) {
        console.log(error); 
        await page.close();
        await browser.close();
    }
}


async function scrapearPcNitroPS5() {
    try {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto(variables.urlPcNitroExport,{chromeOptions2});
        let text = await page.evaluate(() => {
            return document.querySelector('#main > div.tvproduct-page-wrapper > div.tvprduct-image-info-wrapper.clearfix.row > div.col-md-6.tv-product-page-content > div.product-prices > div.product-price.h5 > div > span').innerText;
        });
        await page.close();
        await browser.close();
       datos.push({ url: variables.urlPcNitroExport, precio: text, precioParse: formatearPrecio(text),tienda:"PC Nitro" });
    } catch (error) {
        console.log(error);
    }
}

async function scrapearFalabellaPS5() {

    try {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
    
            await page.goto(variables.urlFalabellaExport,{chromeOptions2});
            let text = await page.evaluate(() => {
                return document.querySelector('#testId-pod-prices-15706659 > ol > li.jsx-2797633547.prices-0 > div > span').innerText;
            });
           datos.push({ url: variables.urlFalabellaExport, precio: text, precioParse: formatearPrecio(text),tienda:"Falabella"});
    
        await page.close();
        await browser.close();
    } catch (error) {
        console.error(error);
        await page.close();
        await browser.close();
    }

}

async function scrapearProMovilPS5() {
    try {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(variables.urlProMovilExport,{chromeOptions2});
    let text = await page.evaluate(() => {
        return document.querySelector('#main > div:nth-child(2) > div.col-md-7 > div.product-prices > div.product-price.h5.has-discount > div > span:nth-child(1)').innerText;
    });
    await page.close();
    await browser.close();
    datos.push({ url: variables.urlProMovilExport, precio: text, precioParse: formatearPrecio(text),tienda:"Pro Movil" });  
    } catch(error) {
        datos.push({ url: variables.urlProMovilExport, precio: 0, precioParse: 0,tienda:"Pro Movil" }); 
        console.log(error); 
        await page.close();
        await browser.close();
    }
}

let allPromise = Promise.all([scrapearParisPS5(), scrapearWeplayPS5(),scrapearLaPolarPS5(),scrapearFalabellaPS5(),scrapearHitesPS5(),scrapearPcNitroPS5(),
    scrapearGoldenGamerPS5(),scrapearTottusPS5(),scrapearRipleyPS5(),scrapearProMovilPS5()]);


module.exports = router;