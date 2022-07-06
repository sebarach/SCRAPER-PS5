const express = require('express')
const cors = require('cors');
const fetch = require('node-fetch');
const cheerio = require("cheerio");
const app = express();
const {variables} = require('./utils.js')
let datos= [];
const formatearPrecio = (precio)=> precio.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, "");

app.use(cors());
app.use(express.json());



app.get('/test',(req,res)=>{
      console.log("Buscando Precios desde test");
      res.header("Access-Control-Allow-Origin", "*");
      allPromise.then(values => {
          console.log("Termino de Buscar Precios");
          res.json(datos);
        }).catch(error => {
            console.log(error);
        });
      });


async function scrapearRipleyPS5() {
    try {
        let data = await fetch(variables.urlRipleyExport);
        let $ = cheerio.load(await data.text());
        let precio = $('#row > div.col-xs-12.col-sm-12.col-md-5 > section.product-info > dl > div.product-price-container.product-internet-price-not-best > dt').first().text();
        datos.push({ url:variables.urlRipleyExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"Ripley" });
       }catch (error) {
        console.log(error);
    }
}




let allPromise = Promise.all([scrapearRipleyPS5()]);


app.listen(3000, function() {console.log("App Corriendo en el puerto 3000");});


