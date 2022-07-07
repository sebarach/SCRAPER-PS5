const variables = {
    urlParisExport : 'https://www.paris.cl/consola-ps5-440437999.html?utm_source=soicos&utm_medium=referral',
    urlWePlayExport : 'https://www.weplay.cl/consola-playstation-5.html',
    urlLaPolarExport : 'https://www.lapolar.cl/consola-sony-playstation-5-control/23395401.html',
    urlFalabellaExport : 'https://www.falabella.com/falabella-cl/product/15706659/Consola-Sony-PS5-Digital/15706659',
    urlHitesExport : 'https://www.hites.com/consola-sony-playstation-5-edicion-con-disco-837800001.html?gclid=Cj0KCQjw8O-VBhCpARIsACMvVLMYOVflwDsi5fPx4jWSU-7SarW_AqMnvNg-yxQKPrSnrlLmzkmJKYsaAqfEEALw_wcB',
    urlPcNitroExport : 'https://pcnitro.cl/inicio/19241-playstation-5-consola-playstation-5-sony-825gb-digital-edition-color-blanco-y-negro.html',
    urlGoldenGamerExport : 'https://goldengamers.cl/products/playstation-5-digital-edicion-jp',
    urlToTusExport : 'https://www.tottus.cl/playstation-consola-playstation-5-digital-sony-20756270/p/?utm_source=mediasur&utm_medium=banner&utm_campaign=electro_ao_ene21_mediasur_banner&utm_content=electro_ao_ene21_mediasur_banner-2163342757',
    urlRipleyExport : 'http://simple.ripley.cl/consola-ps5-digital-2000380458314p?s=mdco',
    urlProMovilExport : 'https://www.promovil.cl/inicio/2716-consola-playstation-5-ps5-edici%C3%B3n-digital-blanca.html'
}

const chromeOptions = {
    headles:true,
    defaultViewPort:null,
    args:[
        "--incognito",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
        "--disable-setuid-sandbox"
    ],
    waitUntil: 'load',
    timeout: 0
}

module.exports = {variables,chromeOptions};