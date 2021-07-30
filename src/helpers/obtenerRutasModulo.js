import { enlacesView } from "../types/enlacesView.js";

function toMinuscula(string = ''){
    return string.toLowerCase();
}

export const obtenerRutasModulo = function(modulo = ''){
    const nameRecibido = toMinuscula(modulo);
    let nameEsperado = "";

    const rutaObtenida = enlacesView.filter(function (obj){
        nameEsperado = toMinuscula(obj.nameEsperado);
        if ('nameEsperado' in obj && nameEsperado === nameRecibido) {
            return true;
          } else {
            return false;
          }
    });
    console.log( modulo );
    return rutaObtenida[0]?.route || "/home";
    
    
}
