const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const urlParis = 'https://www.paris.cl/consola-ps5-440437999.html?utm_source=soicos&utm_medium=referral';
const urlWeplay = 'https://www.weplay.cl/consola-playstation-5.html';
const urlLaPolar = 'https://www.lapolar.cl/consola-sony-playstation-5-control/23395401.html';
const urlFalabella = 'https://www.falabella.com/falabella-cl/product/15706659/Consola-Sony-PS5-Digital/15706659';
const urlHites = 'https://www.hites.com/consola-sony-playstation-5-edicion-con-disco-837800001.html?gclid=Cj0KCQjw8O-VBhCpARIsACMvVLMYOVflwDsi5fPx4jWSU-7SarW_AqMnvNg-yxQKPrSnrlLmzkmJKYsaAqfEEALw_wcB';

const datos = [];

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
    const browser = await puppeteer.launch({
        defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto(urlFalabella);
    const text = await page.evaluate(() => {
        return document.querySelector('#testId-pod-prices-15706659 > ol > li.jsx-2797633547.prices-0 > div > span').innerText;
    });
    await page.close();
    await browser.close();

    const PRECIOREAL = parseInt(text.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, ""));
    datos.push({ url: urlFalabella, precio: text, precioParse: PRECIOREAL });
}

const allPromise = Promise.all([scrapearParisPS5(), scrapearWeplayPS5(),scrapearLaPolarPS5(),scrapearFalabellaPS5(),scrapearHitesPS5()]);

allPromise.then(values => {
   // console.log(datos);
    DrawTable(datos);
  }).catch(error => {
    error;
  });


function DrawTable(objet)
{
    console.log("##############  Sistema de Rastreo para PlayStation 5 SEBITA  ##############")
    console.log("-----------------------------------------------------------------------")
    console.log("-----------------------------------------------------------------------")
    objet.map((values)=>{
        console.log(values.precioParse < 600000 ? 'En Oferta' : 'Sin Oferta')  
        console.log(`Precio : $${values.precioParse} Pesos`)   
        console.log(`Link del Comercio : $ ${values.url}`)
        console.log("****************************************************")     
    });
}
