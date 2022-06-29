const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const urlParis = 'https://www.paris.cl/consola-ps5-440437999.html?utm_source=soicos&utm_medium=referral';
const urlWeplay = 'https://www.weplay.cl/consola-playstation-5.html';
const urlLaPolar = 'https://www.lapolar.cl/consola-sony-playstation-5-control/23395401.html';
const urlFalabella = 'https://www.falabella.com/falabella-cl/product/15706659/Consola-Sony-PS5-Digital/15706659';
const urlHites = 'https://www.hites.com/consola-sony-playstation-5-edicion-con-disco-837800001.html?gclid=Cj0KCQjw8O-VBhCpARIsACMvVLMYOVflwDsi5fPx4jWSU-7SarW_AqMnvNg-yxQKPrSnrlLmzkmJKYsaAqfEEALw_wcB';
const urlPcNitro = 'https://pcnitro.cl/inicio/19241-playstation-5-consola-playstation-5-sony-825gb-digital-edition-color-blanco-y-negro.html';
const urlGoldenGamer = 'https://goldengamers.cl/products/playstation-5-digital-edicion-jp';
const urlTottus = 'https://www.tottus.cl/playstation-consola-playstation-5-digital-sony-20756270/p/?utm_source=mediasur&utm_medium=banner&utm_campaign=electro_ao_ene21_mediasur_banner&utm_content=electro_ao_ene21_mediasur_banner-2163342757';

const datos = [];

async function scrapearTottusPS5() {
    const browser = await puppeteer.launch({
        defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto(urlTottus);
    const text = await page.evaluate(() => {
        return document.querySelector('#container > section > div.jsx-4104767650.jsx-3114293674.columns > div.jsx-4104767650.jsx-3114293674.column-right > div > div.jsx-1050174312.ProductPrice.big > span > span.list.price.medium.cmrPrice').innerText;
    });
    await page.close();
    await browser.close();

    const PRECIOREAL = parseInt(text.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, ""));
    datos.push({ url: urlTottus, precio: text, precioParse: PRECIOREAL });
}

async function scrapearGoldenGamerPS5() {
    const { data } = await axios.get(urlGoldenGamer);
    const $ = cheerio.load(data);
    const precio = $('#ProductPrice-product-template > span').first().text();
    const PRECIOREAL = parseInt(precio.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, ""));
    datos.push({ url: urlGoldenGamer, precio: precio, precioParse: PRECIOREAL });
}


async function scrapearPcNitroPS5() {
    const browser = await puppeteer.launch({
        defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto(urlPcNitro);
    const text = await page.evaluate(() => {
        return document.querySelector('#main > div.tvproduct-page-wrapper > div.tvprduct-image-info-wrapper.clearfix.row > div.col-md-6.tv-product-page-content > div.product-prices > div.product-price.h5 > div > span').innerText;
    });
    await page.close();
    await browser.close();

    const PRECIOREAL = parseInt(text.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, ""));
    datos.push({ url: urlPcNitro, precio: text, precioParse: PRECIOREAL });
}

async function scrapearHitesPS5() {
    const { data } = await axios.get(urlHites);
    const $ = cheerio.load(data, { normalizeWhitespace: false, xmlMode: true });
    const precio = $('#zoom-837800001 > div.row.d-none.d-lg-flex > div > div > div > div > span.price-item.sales > span').first().text();
    const PRECIOREAL = parseInt(precio.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, ""));
    datos.push({ url: urlHites, precio: precio, precioParse: PRECIOREAL });
}

async function scrapearParisPS5() {
    const { data } = await axios.get(urlParis);
    const $ = cheerio.load(data, { normalizeWhitespace: false, xmlMode: true });
    const precio = $('#pdpMain > div > div.col-xs-12.col-sm-12.col-md-6.col-lg-5.info-product-detail > div > div.col-xs-12.product-price-2 > div > div.price__inner > div.price__text-wrap.price__text-wrap--primary > div.price__text').first().text();
    const PRECIOREAL = parseInt(precio.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, ""));
    datos.push({ url: urlParis, precio: precio, precioParse: PRECIOREAL });
}

async function scrapearWeplayPS5() {
    const { data } = await axios.get(urlWeplay);
    const $ = cheerio.load(data, { normalizeWhitespace: false, xmlMode: true });
    const precio = $('#product-price-35943 > span').first().text();
    const PRECIOREAL = parseInt(precio.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, ""));
    datos.push({ url: urlWeplay, precio: precio, precioParse: PRECIOREAL });

}

async function scrapearLaPolarPS5() {
    const { data } = await axios.get(urlLaPolar);
    const $ = cheerio.load(data);
    const precio = $('body > div.page > div > div.ms-contain-desktoplarge.pdp-wrapper.product-wrapper.product-detail > div.ms-row.pdp-image-and-detail.ms-margin-hp.collapsed.product-detail > div.pdp-right-content.details-container.col-xs-12.col-sm.ms-no-padding.js-details-container > div > div.col-xs-12.ms-flex.ms-no-padding.prices-actions > div > p.la-polar.price.js-tlp-price.lp-font--barlow-bold.ms-flex > span.price-value').text();
    const PRECIOREAL = parseInt(precio.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, ""));
    datos.push({ url: urlLaPolar, precio: precio, precioParse: PRECIOREAL });
}

async function scrapearFalabellaPS5() {
    let PRECIOREAL = 0
    const browser = await puppeteer.launch({
        defaultViewport: null
    });
    const page = await browser.newPage();

        await page.goto(urlFalabella);
        const text = await page.evaluate(() => {
            return document.querySelector('#testId-pod-prices-15706659 > ol > li.jsx-2797633547.prices-0 > div > span').innerText;
        });

        PRECIOREAL = parseInt(text.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, ""));
        datos.push({ url: urlFalabella, precio: text, precioParse: PRECIOREAL });

    await page.close();
    await browser.close();
}

const allPromise = Promise.all([scrapearParisPS5(), scrapearWeplayPS5(),scrapearLaPolarPS5(),scrapearFalabellaPS5(),scrapearHitesPS5(),scrapearPcNitroPS5(),
    scrapearGoldenGamerPS5(),scrapearTottusPS5()]);

setTimeout(() => {
    response();
},30000);


const response = () =>allPromise.then(values => {
    DrawTable(datos);
  }).catch(error => {
    error;
  });



function DrawTable(objet)
{
    console.log("##############  Rastreo para PlayStation 5 ##############")
    console.log("-----------------------------------------------------------------------")
    console.log("-----------------------------------------------------------------------")
    objet.map((values)=>{
        console.log(values.precioParse < 600000 ? '@@@@@@ OFERTA @@@@@@@' : 'Sin Oferta')  
        console.log(`Precio : $${values.precioParse} Pesos`)   
        console.log(`Link del Comercio : $ ${values.url}`)
        console.log("****************************************************")     
    });
    //console.log(JSON.stringify(objet))
}