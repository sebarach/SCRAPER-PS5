
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const timeout = require('connect-timeout')
const urlParis = 'https://www.paris.cl/consola-ps5-440437999.html?utm_source=soicos&utm_medium=referral';
const urlWeplay = 'https://www.weplay.cl/consola-playstation-5.html';
const urlLaPolar = 'https://www.lapolar.cl/consola-sony-playstation-5-control/23395401.html';
const urlFalabella = 'https://www.falabella.com/falabella-cl/product/15706659/Consola-Sony-PS5-Digital/15706659';
const urlHites = 'https://www.hites.com/consola-sony-playstation-5-edicion-con-disco-837800001.html?gclid=Cj0KCQjw8O-VBhCpARIsACMvVLMYOVflwDsi5fPx4jWSU-7SarW_AqMnvNg-yxQKPrSnrlLmzkmJKYsaAqfEEALw_wcB';
const urlPcNitro = 'https://pcnitro.cl/inicio/19241-playstation-5-consola-playstation-5-sony-825gb-digital-edition-color-blanco-y-negro.html';
const urlGoldenGamer = 'https://goldengamers.cl/products/playstation-5-digital-edicion-jp';
const urlTottus = 'https://www.tottus.cl/playstation-consola-playstation-5-digital-sony-20756270/p/?utm_source=mediasur&utm_medium=banner&utm_campaign=electro_ao_ene21_mediasur_banner&utm_content=electro_ao_ene21_mediasur_banner-2163342757';
const urlRipley = 'http://simple.ripley.cl/consola-ps5-digital-2000380458314p?s=mdco';
const datos = [];

//import {formatearPrecio} from './utils.js'
//const util = require('./utils.js');

const formatearPrecio = (precio)=> precio.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, "");

const express = require('express');
const app = express();
app.use(timeout('45s'));
const puerto = 3000;

app.get('/',(req,res)=>{
    allPromise.then(values => {
        DrawTable(datos);
        res.json(datos);
      }).catch(error => {
        error;
      });  
})


app.listen(process.env.PORT || puerto,()=>{
    console.log(`app corriendo en el puerto ${puerto}`)
})


async function scrapearRipleyPS5() {
    try {
        const { data } = await axios.get(urlRipley);
        const $ = cheerio.load(data);
        const precio = $('#row > div.col-xs-12.col-sm-12.col-md-5 > section.product-info > dl > div.product-price-container.product-internet-price-not-best > dt').first().text();
        datos.push({ url: urlRipley, precio: precio, precioParse: formatearPrecio(precio) });
    }catch (error) {
        datos.push({ url: urlRipley, precio: 'ERROR', precioParse: 0 });
    }
}



async function scrapearTottusPS5() {
    try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlTottus);
    const text = await page.evaluate(() => {
        return document.querySelector('#container > section > div.jsx-4104767650.jsx-3114293674.columns > div.jsx-4104767650.jsx-3114293674.column-right > div > div.jsx-1050174312.ProductPrice.big > span > span.list.price.medium.cmrPrice').innerText;
    });
    await page.close();
    await browser.close();
    datos.push({ url: urlTottus, precio: text, precioParse: formatearPrecio(text) });  
    } catch(error) {
        datos.push({ url: urlTottus, precio:'ERROR', precioParse: 0 });  
        await page.close();
        await browser.close();
    }
}

async function scrapearGoldenGamerPS5() {
    const { data } = await axios.get(urlGoldenGamer);
    const $ = cheerio.load(data);
    const precio = $('#ProductPrice-product-template > span').first().text();
    datos.push({ url: urlGoldenGamer, precio: precio, precioParse: formatearPrecio(precio) });
}


async function scrapearPcNitroPS5() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlPcNitro);
    const text = await page.evaluate(() => {
        return document.querySelector('#main > div.tvproduct-page-wrapper > div.tvprduct-image-info-wrapper.clearfix.row > div.col-md-6.tv-product-page-content > div.product-prices > div.product-price.h5 > div > span').innerText;
    });
    await page.close();
    await browser.close();
   datos.push({ url: urlPcNitro, precio: text, precioParse: formatearPrecio(text) });
}

async function scrapearHitesPS5() {
    const { data } = await axios.get(urlHites);
    const $ = cheerio.load(data, { normalizeWhitespace: false, xmlMode: true });
    const precio = $('#zoom-837800001 > div.row.d-none.d-lg-flex > div > div > div > div > span.price-item.sales > span').first().text();
    datos.push({ url: urlHites, precio: precio.trim(), precioParse: formatearPrecio(precio) });
}

async function scrapearParisPS5() {
    const { data } = await axios.get(urlParis);
    const $ = cheerio.load(data, { normalizeWhitespace: false, xmlMode: true });
    const precio = $('#pdpMain > div > div.col-xs-12.col-sm-12.col-md-6.col-lg-5.info-product-detail > div > div.col-xs-12.product-price-2 > div > div.price__inner > div.price__text-wrap.price__text-wrap--primary > div.price__text').first().text();
   datos.push({ url: urlParis, precio: precio, precioParse: formatearPrecio(precio) });
}

async function scrapearWeplayPS5() {
    const { data } = await axios.get(urlWeplay);
    const $ = cheerio.load(data, { normalizeWhitespace: false, xmlMode: true });
    const precio = $('#product-price-35943 > span').first().text();
    datos.push({ url: urlWeplay, precio: precio, precioParse: formatearPrecio(precio) });

}

async function scrapearLaPolarPS5() {
    const { data } = await axios.get(urlLaPolar);
    const $ = cheerio.load(data);
    const precio = $('body > div.page > div > div.ms-contain-desktoplarge.pdp-wrapper.product-wrapper.product-detail > div.ms-row.pdp-image-and-detail.ms-margin-hp.collapsed.product-detail > div.pdp-right-content.details-container.col-xs-12.col-sm.ms-no-padding.js-details-container > div > div.col-xs-12.ms-flex.ms-no-padding.prices-actions > div > p.la-polar.price.js-tlp-price.lp-font--barlow-bold.ms-flex > span.price-value').text();
    datos.push({ url: urlLaPolar, precio: precio, precioParse: formatearPrecio(precio) });
}

async function scrapearFalabellaPS5() {
    let PRECIOREAL = 0
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

        await page.goto(urlFalabella);
        const text = await page.evaluate(() => {
            return document.querySelector('#testId-pod-prices-15706659 > ol > li.jsx-2797633547.prices-0 > div > span').innerText;
        });
       datos.push({ url: urlFalabella, precio: text, precioParse: formatearPrecio(text)});

    await page.close();
    await browser.close();
}

const allPromise = Promise.all([scrapearParisPS5(), scrapearWeplayPS5(),scrapearLaPolarPS5(),scrapearFalabellaPS5(),scrapearHitesPS5(),scrapearPcNitroPS5(),
    scrapearGoldenGamerPS5(),scrapearTottusPS5(),scrapearRipleyPS5()]);

console.log("Buscando Ofertas ................");

  const response = () =>allPromise.then(values => {
    DrawTable(datos);
  }).catch(error => {
    error;
  });

  response();

function DrawTable(objet)
{
    console.log("##############  Rastreo para PlayStation 5 ##############")
    console.log("-----------------------------------------------------------------------")
    console.log("-----------------------------------------------------------------------")
    objet.map((values)=>{
        if(values.precioParse < 600000 && values.precioParse != 0){console.log('@@@@@@ OFERTA @@@@@@@')}
        if(values.precioParse > 600000){console.log('Sin Oferta')}
        if(values.precio ==='ERROR'){console.log('ERROR EN LA PAGINA')}
        console.log(`Precio : $${values.precioParse} Pesos`)   
        console.log(`Link del Comercio : $ ${values.url}`)
        console.log("****************************************************")     
    });
}
