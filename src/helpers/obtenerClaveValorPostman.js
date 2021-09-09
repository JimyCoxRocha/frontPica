export const obtenerClaveValorPostman = (arreglo) =>{
    let urlString = "";
    
    for(let i = 0; i<arreglo.length; i++){
        if(i === 0){
            urlString = "?" + arreglo[i].key + "=" + encodeURIComponent(arreglo[i].value);
        }
        else{
            urlString = "&" + arreglo[i].key + "=" + encodeURIComponent(arreglo[i].value);
        }
    }  

    console.log(urlString);
    return urlString;
}

export const obtenerClaveValorPostmanHeader = (arreglo) =>{
    let listaClaveValor = [];
    let objetoClaveValor = {};
    arreglo.forEach(element => {
        objetoClaveValor = {};
        objetoClaveValor[element.key] = element.value;
        listaClaveValor.push(objetoClaveValor);
    });
    return listaClaveValor;
}