//Contiene el formato del objeto reporte

export const generarObjPostman = () => {
        return {
                url: "",
                method: "",
                body: "",
                headers: []
        }
}

export const objRespPostman = {
        data: [],
        status: "200 ok",
        time: "",
        size: ""
}
