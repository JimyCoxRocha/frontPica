//Contiene el formato del objeto reporte
export const consultaReporte = function (fechaDesde, fechaHasta){
    let consultaReporte = {
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
    }
    return consultaReporte;
}