const express = require('express')
const cors = require('cors');
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const variables = require('./utils.js')
let datos= [];
const formatearPrecio = (precio)=> precio.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, "");

// async function scrapearRipleyPS5() {
//     try {
//         let { data } = await axios.get(variables.urlRipleyExport);
//         let $ = cheerio.load(data);
//         let precio = $('#row > div.col-xs-12.col-sm-12.col-md-5 > section.product-info > dl > div.product-price-container.product-internet-price-not-best > dt').first().text();
//         datos.push({ url: variables.urlRipleyExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"Ripley" });
//     }catch (error) {
//         console.log(error);
//     }
// }

app.use(cors());
app.listen(3000, function() {console.log("App Corriendo en el puerto 3000");});


//let allPromise = Promise.all([scrapearRipleyPS5()]);

app.get('/',(req,res)=>{
res.send("asd");
      });

