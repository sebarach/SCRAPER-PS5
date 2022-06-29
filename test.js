const datos = [];

datos.push({nombre:"seba",apellido:"sepulveda",precio:5000});
datos.push({nombre:"diego",apellido:"sepulveda",precio:4000});
datos.push({nombre:"felipe",apellido:"sepulveda",precio:2000});
console.log(datos.sort((a,b)=>parseFloat(a.precio) - parseFloat(b.precio)));
