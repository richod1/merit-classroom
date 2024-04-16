const puppeteer=require("puppeteer")


const getBuffer=async(html,pdfParams)=>{
    const args=[`--disable-web-security`,'--no-sandbox','--diable-setuid-sandbox'];
    const defaultPdfParams={
        width:'1123px',
        height:'794px',
    }

    const browser=puppeteer.launch({
        headless:'new',
        args,
    })

    const page=await browser.newPage();
    await page.setViewport({width:1123,height:794});
    await page.goto('data:text/html' + html,{waitUntil:'networkidle2'})
    await page.addStyleTag({content:'@page{size:auto}'});
    await page.emulateMediaType('screen')

    // creating a pdf buffer
    const pdfBuffer=await page.pdf(pdfParams|| defaultPdfParams);

    await browser.close();
    return pdfBuffer;

}

module.exports={
    getBuffer,
}