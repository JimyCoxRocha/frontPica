export const obtenerClaveValorPostman = (arreglo) =>{
    console.log(arreglo);
    let value = new URLSearchParams();
    arreglo.forEach(element => {
        value.append(element.key, decodeURIComponent(element.value));
    })
    console.log(value);
    return value;
}

export const obtenerClaveValorPostmanHeader = (arreglo) =>{
    let listaClaveValor = {};
    let objetoClaveValor = {};
    arreglo.forEach(element => {
        objetoClaveValor[element.key] = element.value;
        listaClaveValor = {...listaClaveValor, ...objetoClaveValor};
    });
    return listaClaveValor;
}