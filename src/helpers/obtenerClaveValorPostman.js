export const obtenerClaveValorPostman = (arreglo) =>{
    let listaClaveValor = {};
    let objetoClaveValor = {};
    arreglo.forEach(element => {
        objetoClaveValor[element.key] = element.value;
        listaClaveValor = {...listaClaveValor, ...objetoClaveValor};
    });

    return listaClaveValor;
}