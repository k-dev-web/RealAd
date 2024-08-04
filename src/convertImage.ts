import * as fs from "node:fs";
import axios from "axios";
import puppeteer from "puppeteer";

async function convertAndSaveImage(url, id) {
    try {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        await page.pdf({
            path: `./public/images/${id}.pdf`,
            printBackground: true,
        });

        await browser.close();
        return {url:`images/${id}.pdf`};
    } catch (error) {
        return {text: 'something went wrong', error: error}
    }
}

export default convertAndSaveImage