const axios = require("axios");
const cheerio = require("cheerio");
const urlParis = 'https://www.paris.cl/consola-ps5-440437999.html?utm_source=soicos&utm_medium=referral';
const urlWeplay = 'https://www.weplay.cl/consola-playstation-5.html';



const producto = {nombre:"",precio:"",url:""}

async function scrapearParisPS5()
{
    const {data} = await axios.get(urlParis);
    const $ = cheerio.load(data,{normalizeWhitespace: false, xmlMode: true});
    const precio = $('#pdpMain > div > div.col-xs-12.col-sm-12.col-md-6.col-lg-5.info-product-detail > div > div.col-xs-12.product-price-2 > div > div.price__inner > div.price__text-wrap.price__text-wrap--primary > div.price__text').first().text();
    const PRECIOREAL = parseInt(precio.replace(/[^0-9,.]+/g,"").replace(/[,.]+/g,""));
    if(PRECIOREAL < 600000)
    {
        console.log('#################OFERTA####################');
        console.log('Entra');
        console.log(`Precio : ${precio.trim()}`);
        console.log(`URL : ${urlParis}`);
    }
    else
    {
        console.log('SIN OFERTA!');
        console.log(`Precio : ${precio.trim()}`);
        console.log(`URL : ${urlParis}`);
    } 
    console.log('#################-------------------------------####################');
    console.log('#################-------------------------------####################');
    console.log('#################-------------------------------####################');
}

async function scrapearWeplayPS5()
{
    const {data} = await axios.get(urlWeplay);
    const $ = cheerio.load(data,{normalizeWhitespace: false, xmlMode: true});
    const precio = $('#product-price-35943 > span').first().text();
    const PRECIOREAL = precio.replace(/[^0-9,.]+/g,"").replace(/[,.]+/g,"");
    if(PRECIOREAL < 600000)
    {
        console.log('#################OFERTA####################');
        console.log('Entra');
        console.log(`Precio : ${precio.trim()}`);
        console.log(`URL : ${urlWeplay}`);
    }
    else
    {
        console.log('SIN OFERTA!');
        console.log(`Precio : ${precio.trim()}`);
        console.log(`URL : ${urlWeplay}`);
    } 
    console.log('#################-------------------------------####################');
    console.log('#################-------------------------------####################');
    console.log('#################-------------------------------####################');
}

scrapearParisPS5();
scrapearWeplayPS5();