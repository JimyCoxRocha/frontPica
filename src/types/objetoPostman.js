//Contiene el formato del objeto reporte

export const generarObjPostman = () => {
        return {
                elementosHeaders: null,
                elementosParams: null,
                dataJSONEnvio: null,
                peticion: null,
                url: null
        }
}

export const objRespPostman = {
        data: [],
        status: "200 ok",
        time: "",
        size: ""
}
