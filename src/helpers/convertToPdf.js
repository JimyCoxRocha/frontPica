import { jsPDF } from "jspdf";
import 'jspdf-autotable';

function crearBodyTable( data ) {
    let body = [];

    data.forEach(element => {
            body.push([
                element.pathController,
                element.pathEndpoint, 
                element.dateOutput,
                JSON.stringify(element.dataInput),
                JSON.stringify(element.dataOutput),
            ]);
    });
    return body;
}

export const convertToPdf = ( data, tipoReporte ) => {
    var doc = new jsPDF('p', 'pt', 'a3');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.text(tipoReporte, 230, 50);

    doc.autoTable({
        theme: 'grid',
        headStyles: {fillColor: [0, 82, 159]},
        startY: 90,
        head: [['Path categoría', 'Path endpoint', 'Fecha', 'Input', 'Output']],
        body: crearBodyTable(data),
    });

    doc.save(tipoReporte+'.pdf');
}