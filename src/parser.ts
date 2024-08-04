import axios from "axios";
import * as cheerio from "cheerio";

async function parser() {
    try {
        const response = await axios.get(process.env.PARSE_URL);
        const $ = cheerio.load(response.data);

        return $("#s2").find('.list-item').map((index, elementList) => {
            return {
                name: $(elementList).find('H3').text(),
                img: $(elementList).find('img').attr('data-src'),
                interval: $(elementList).find('time').map((index, elementTime) => {
                        return $(elementTime).attr('datetime')
                    }
                ).get(),
            }
        }).get();
    } catch (error) {
        return ({
            text: "Error fetching and parsing data:", error: error
        });
    }
}

export default parser