export const obtenerClaveValorPostman = (arreglo) =>{
    let urlString = "";
    
    for(let i = 0; i<arreglo.length; i++){
        console.log(i, arreglo.length);
        if(i == 0){
            urlString = "?" + arreglo[i].key + "=" + arreglo[i].value;
        }
        else{
            urlString = urlString + "&" + arreglo[i].key + "=" + arreglo[i].value;
        }
    }
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