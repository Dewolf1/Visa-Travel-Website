import jsPDF from 'jspdf';

// Fallback transparent 1x1 pixel
export const fallbackImage = {
  dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  width: 1,
  height: 1
};

// Helper to load image as base64 data URL with fallback
export const loadImageData = (url: string): Promise<{ dataUrl: string, width: number, height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width || 1;
        canvas.height = img.height || 1;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve({
            dataUrl: canvas.toDataURL('image/png'),
            width: canvas.width,
            height: canvas.height
          });
        } else {
          console.warn(`Failed to get canvas context for ${url}, using fallback.`);
          resolve(fallbackImage);
        }
      } catch (e) {
        console.warn(`Error processing image ${url}, using fallback.`, e);
        resolve(fallbackImage);
      }
    };
    
    img.onerror = () => {
      console.warn(`Failed to load ${url}, using fallback.`);
      resolve(fallbackImage);
    };
    
    img.src = url;
  });
};

export const addWatermark = (doc: jsPDF, watermarkImg: { dataUrl: string, width: number, height: number }, startY: number = -50) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  doc.setGState(new doc.GState({ opacity: 0.08 }));
  
  // Create a pattern of watermarks
  const imgWidth = 80;
  const imgHeight = (watermarkImg.height * imgWidth) / watermarkImg.width;
  
  for (let x = -50; x < pageWidth; x += 120) {
    for (let y = startY; y < pageHeight; y += 150) {
      // @ts-ignore - jspdf types are sometimes incomplete for advanced transformations
      doc.addImage(watermarkImg.dataUrl, 'PNG', x, y, imgWidth, imgHeight, undefined, 'NONE', -45);
    }
  }
  
  doc.setGState(new doc.GState({ opacity: 1 }));
};

export const addBanner = (doc: jsPDF, bannerImg: { dataUrl: string, width: number, height: number }) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // If the image is the 1x1 fallback pixel, use a default height of 40mm
  // Otherwise calculate aspect ratio properly and reduce height by 20% to save space
  const imgHeight = (bannerImg.width === 1 && bannerImg.height === 1) 
    ? 40 
    : ((bannerImg.height * pageWidth) / bannerImg.width) * 0.8;
    
  doc.addImage(bannerImg.dataUrl, 'PNG', 0, 0, pageWidth, imgHeight);
  return imgHeight;
};

// Helper to format YYYY-MM-DD to "11th Aug 2026"
export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  
  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) suffix = 'st';
  else if (day === 2 || day === 22) suffix = 'nd';
  else if (day === 3 || day === 23) suffix = 'rd';
  
  return `${day}${suffix} ${month} ${year}`;
};
