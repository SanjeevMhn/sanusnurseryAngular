import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export function convertToPdf(htmlElement: HTMLElement, fileName: string): void {
    html2canvas(htmlElement).then((canvas) => {
      let fileWidth = 200;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p','mm','a4');
      let position = 0; 

      pdf.addImage(FILEURI,'PNG',0,position,fileWidth,fileHeight);
      pdf.save(fileName);

    })

  }

