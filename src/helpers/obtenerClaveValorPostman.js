export const obtenerClaveValorPostman = (arreglo) =>{
    let listaClaveValor = {};
    let objetoClaveValor = {};
    arreglo.forEach(element => {
        objetoClaveValor[element.key] = element.value;
        listaClaveValor = {...listaClaveValor, ...objetoClaveValor};
    });
    console.log("Lista clave valor");
    console.log(listaClaveValor);
    console.log("objeto clave valor");
    console.log(objetoClaveValor);

    return listaClaveValor;
}