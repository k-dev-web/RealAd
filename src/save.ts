import * as fs from "node:fs";
import convertAndSaveImage from "./convertImage";

async function saveData(data) {
    try {
        const newData = data.map(async (item, index) => {
            const newImageUrl = await convertAndSaveImage(item.img, index);
            return {
                id: index,
                name: item.name,
                defaultImgUrl: item.img,
                interval: {
                    start: item.interval[0],
                    end: item.interval[1]
                },
                currentImgUrl: newImageUrl.error ? undefined : newImageUrl.url
            }
        })
        Promise.all(newData).then(data => {
            fs.writeFile(
                'public/data/parse.json',
                JSON.stringify(data), 'utf8',
                ( err) => {
                    if (err) {
                        return {text: 'something went wrong in save full data', error: err}
                    }
                    else return true
                });
        })
    } catch (error) {
    }
}

export default saveData