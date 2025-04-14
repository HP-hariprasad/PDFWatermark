const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');

async function addWatermarkToPDF(inputFileName, outputFileName, watermarkText) {
  try {
   
    const existingPdfBytes = fs.readFileSync(inputFileName);   
    const pdfDoc = await PDFDocument.load(existingPdfBytes);   
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);    
    const pages = pdfDoc.getPages();    
    pages.forEach((page) => {
      const { width, height } = page.getSize();

      page.drawText(watermarkText, {
        x: width / 2 - 170, 
        y: height / 4,      
        size: 70,           
        font: helveticaFont,
        color: rgb(0.8, 0.8, 0.8), 
        rotate: { type: 'degrees', angle: 45 }, 
        opacity: 0.7,       
      });
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputFileName, pdfBytes);

    console.log(`Watermark added successfully! Saved as: ${outputFileName}`);
  } catch (error) {
    console.error('Error applying watermark:', error);
  }
}

addWatermarkToPDF('House_Tax_paid_recipt_2024.pdf', 'House_Tax_paid_recipt_2024_WA.pdf', 'FOR VIEW ONLY');
