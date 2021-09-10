import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function crearArray( data ) {
    let body = [['Path categoría', 'Path endpoint', 'Fecha', 'Input', 'Output']];
    try{
        data.forEach    (element => {
                body.push([
                    element.pathController,
                    element.pathEndPoint, 
                    element.date,
                    JSON.stringify(element.dataInput),
                    JSON.stringify(element.dataOutput),
                ]);
        });
        return body;
    }catch(err){
        return body;
    }
}

export const convertToExcel = ( data,tipoReporte ) => {
    var wb = XLSX.utils.book_new();
    wb.SheetNames.push("Test Sheet");
    var ws = XLSX.utils.aoa_to_sheet(crearArray(data));
    wb.Sheets["Test Sheet"] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});


    function s2ab(s) { 
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf);  //create uint8array as viewer
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
        return buf;    
}
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), tipoReporte+'.xlsx');

}
