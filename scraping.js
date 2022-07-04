require('dotenv').config();
const variables = require('./utils.js')
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
var cors = require('cors')
let datos = [];

const formatearPrecio = (precio)=> precio.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, "");
const express = require('express');
const app = express();
app.use(cors());

app.use((req,res,next)  => {
    if (!req.get('Authorization')) {
        var err = new Error('No estas autorizado');
        res.status(401).set('WWW-Authenticate', 'Basic');
        next(err);
    } else {
        var credenciales = Buffer.from(req.get('Authorization').split(' ')[1],'base64').toString()
        .split(':');

        var user = credenciales[0];
        var pass = credenciales[1];
        if (!(user ===process.env.TOKENUSERNAME && pass === process.env.TOKENPASS)) {
            var err = new Error('Invalid credentials');
            res.status(401).set('WWW-Authenticate', 'Basic');
            next(err);
        } else {
            res.status(200);
            next();
        }
    }
})

app.get('/',(req,res)=>{
    allPromise.then(values => {
        DrawTable(datos);
        res.json(datos);
      }).catch(error => {
        error;
      });
})

app.get('/reloadPrice',(req,res)=>{
    console.log("actualizando Precios");
    datos = [];
    allPromise = Promise.all([scrapearParisPS5(), scrapearWeplayPS5(),scrapearLaPolarPS5(),scrapearFalabellaPS5(),scrapearHitesPS5(),scrapearPcNitroPS5(),
    scrapearGoldenGamerPS5(),scrapearTottusPS5(),scrapearRipleyPS5(),scrapearProMovilPS5()]);
    allPromise.then(values =>{
        DrawTable(datos);
        console.log("terminado");
        res.json(datos);
      }).catch(error=>{
        error;
      });
})

app.listen(process.env.PORT,()=>{
    console.log(`app corriendo en el puerto ${process.env.PORT}`)
})

async function scrapearProMovilPS5() {
    try {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(variables.urlProMovilExport);
    let text = await page.evaluate(() => {
        return document.querySelector('#main > div:nth-child(2) > div.col-md-7 > div.product-prices > div.product-price.h5.has-discount > div > span:nth-child(1)').innerText;
    });
    await page.close();
    await browser.close();
    datos.push({ url: variables.urlProMovilExport, precio: text, precioParse: formatearPrecio(text),tienda:"Pro Movil" });  
    } catch(error) {
        console.log(error); 
        await page.close();
        await browser.close();
    }
}

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

async function scrapearTottusPS5() {
    try {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(variables.urlToTusExport);
    let text = await page.evaluate(() => {
        return document.querySelector('#container > section > div.jsx-4104767650.jsx-3114293674.columns > div.jsx-4104767650.jsx-3114293674.column-right > div > div.jsx-1050174312.ProductPrice.big > span > span.list.price.medium.cmrPrice').innerText;
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

async function scrapearPcNitroPS5() {
    try {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto(variables.urlPcNitroExport);
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

async function scrapearFalabellaPS5() {

    try {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
    
            await page.goto(variables.urlFalabellaExport,{
                waitUntil: 'load',
                timeout: 0
            });
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

let allPromise = Promise.all([scrapearParisPS5(), scrapearWeplayPS5(),scrapearLaPolarPS5(),scrapearFalabellaPS5(),scrapearHitesPS5(),scrapearPcNitroPS5(),
    scrapearGoldenGamerPS5(),scrapearTottusPS5(),scrapearRipleyPS5(),scrapearProMovilPS5()]);

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
