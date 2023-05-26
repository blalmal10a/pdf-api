const puppeteer = require('puppeteer');
const express = require('express');
const app = express();




app.get(`/:filename`, async (req, res) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        const keys = Object.keys(res)
        keys.forEach(element => {
            console.log(res[element])
        });


        await page.goto(`${req.query?.url}`, {
            waitUntil: 'networkidle2'
        })

        const pdf = await page.pdf({
            // path: `${req.query?.name ?? `siruk_lain_${Date.now()}`}.pdf`,
            path: 'output.pdf',
            format: 'A4',
            printBackground: true,
            encoding: 'base64'
        })
        // const pdfStream = Buffer.from(pdf, 'binary');
        // res.send(pdfStream)
        // if (req.download);
        res.set({
            // 'Content-Disposition': 'attachment; filename="output.pdf"',
            'Content-Type': 'application/pdf',
            'Content-Length': pdf.length
        });
        res.send(pdf);

        // const pdf = await page.pdf({
        //     path: 'lcs.pdf',
        //     format: 'letter',
        //     printBackground: true,
        //     scale: 1,
        // });




    } catch (error) {
        res.send({
            status: 422,
            message: `Invalid URL, make sure you include 'http/https' in your link`
        });

    }

    await browser.close();
});
app.listen(3000, () => {
    console.log("Server started");
});