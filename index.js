const path = require("path");
const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
require('dotenv').config();
const router = express.Router();
// app.get('/', async (req, res) => {
//     res.sendFile('./index.html')
//     // res.send({
//     //     example: 'https://pdf-api-g4eh.onrender.com/YourFileName.pdf?url=https://your_website.com'
//     // })
// })

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
    //__dirname : It will resolve to your project folder.
});
app.use("/", router);
// app.get(`/:filename`, async (req, res) => {
//     try {
//         const browser = await puppeteer.launch({
//             args: [
//                 '--disable-setuid-sandbox',
//                 '--no-sandbox',
//                 '--single-process',
//                 'no-zygote',
//             ],
//             executablePath:
//                 process.env?.NODE_ENV === "production"
//                     ? process.env.PUPPETEER_EXECUTABLE_PATH
//                     : puppeteer.executablePath(),
//             headless: "new"
//         });
//         const page = await browser.newPage();

//         await page.goto(`${req.query?.url}`, {
//             waitUntil: "networkidle2"
//         });

//         const pdf = await page.pdf({
//             // path: `${req.query?.name ?? `siruk_lain_${Date.now()}`}.pdf`,
//             path: "output.pdf",
//             format: "A4",
//             printBackground: true,
//             encoding: "base64"
//         });
//         // const pdfStream = Buffer.from(pdf, 'binary');
//         // res.send(pdfStream)
//         // if (req.download);
//         res.set({
//             // 'Content-Disposition': 'attachment; filename="output.pdf"',
//             "Content-Type": "application/pdf",
//             "Content-Length": pdf.length
//         });
//         res.send(pdf);

//         await browser.close();
//     } catch (error) {
//         console.log(error.message);
//         res.send({
//             status: 422,
//             message: `Invalid URL, make sure you include 'http/https' in your link \n error message is: ${error.message}`
//         });
//     }
// });


app.get(`/test`, async (req, res) => {
    try {

        const browser = await puppeteer.launch({
            args: [
                '--disable-setuid-sandbox',
                '--no-sandbox',
                '--single-process',
                'no-zygote',
            ],
            executablePath: '/usr/bin/google-chrome-stable',
            // process.env?.NODE_ENV === "production"
            //     ? '/usr/bin/google-chrome-stable'
            //     : puppeteer.executablePath(),
            headless: "new"
        });
        const page = await browser.newPage();

        await page.goto(`https://sirukla.in`, {
            waitUntil: "networkidle2"
        });

        const pdf = await page.pdf({
            // path: `${req.query?.name ?? `siruk_lain_${Date.now()}`}.pdf`,
            path: "output.pdf",
            format: "A4",
            printBackground: true,
            encoding: "base64"
        });
        // const pdfStream = Buffer.from(pdf, 'binary');
        // res.send(pdfStream)
        // if (req.download);
        res.set({
            // 'Content-Disposition': 'attachment; filename="output.pdf"',
            "Content-Type": "application/pdf",
            "Content-Length": pdf.length
        });
        res.send(pdf);

        await browser.close();
    } catch (error) {
        console.log(error.message);
        res.send({
            status: 422,
            message: `Invalid URL, make sure you include 'http/https' in your link \n error message is: ${error.message}`
        });
    }
});
app.listen(3000, () => {
    console.log("Server started");
});
