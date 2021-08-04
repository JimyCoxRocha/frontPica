import { objRespPostman } from "../types/objetoPostman.js";
import { codigosError } from "../types/codigosRespuesta.js";

export const generarResponsePostman = (data, status, time, size) => {
    objRespPostman.data = data;
    objRespPostman.status = status + " " + codigosError[status];
    objRespPostman.time = time + " ms";
    objRespPostman.size = size + " B";

    return objRespPostman;
}