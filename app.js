require('dotenv').config();
const express = require('express');
var cors = require('cors')


//App
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text());

//midleware
app.use((req,res,next)  => {
    res.header("Access-Control-Allow-Origin", "*");
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

//Router
const scrapingRouterPS5 = require('./Routes/scraping.js');
app.use('/scrapingPS5',scrapingRouterPS5);

app.listen(process.env.PORT,()=>{
    console.log(`app corriendo en el puerto ${process.env.PORT}`)
})
