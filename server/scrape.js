const puppeteer = require('puppeteer');

function analyzeSentiment(text) {
    const positiveWords = ["happy", "happiness ", "beautiful", "good", "enjoy", "delightful", "positive", "joyful", "wonderful", "exciting", "benefit", "amazing", "fantastic", "splendid", "cheerful", "peace", "excellent", "enchanting", "satisfaction", "blissful", "radiant", "exquisite", "incredible", "glorious", "uplifting", "vibrant", "serene", "magnificent", "grateful", "phenomenal", "remarkable", "outstanding", "lively", "sparkling", "jubilant", "fabulous", "superb", "calm"];
    const negativeWords = ["sad", "bad", "terrible", "negative", "unpleasant", "awful", "disappointing", "distress", "coping", "issue", "horrible", "terrible", "bustling", "bustle ", "overwhelming", "wretched", "disastrous", "repulsive", "detestable", "repugnant", "deplorable", "ghastly", "appalling", "grim", "bleak", "dreary", "downside", "heartbreaking", "distress", "tragic", "unfortunate", "lamentable", "troubling", "harrowing", "grievous", "pessimistic", "chaos"];

    let words = text.split(/(?=[A-Z])|\s+/);
    words = words.map(element => {
        return element.toLowerCase();
    });

    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;

    let count = words.length;

    const positivePercentage = positiveCount / count;
    const negativePercentage = negativeCount / count;

    let limit = 0.03;

    if (positivePercentage > limit || negativePercentage > limit) {
        if (positivePercentage > negativePercentage) {
            return "Positive"
        } else {
            return "Negative"
        }
    } else {
        return "Neutral"
    }
}

module.exports.getData = async function getData() {
    const url = 'https://wsa-test.vercel.app/';
    let objs = []
    try {
        const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome" });
        const page = await browser.newPage();
        await page.goto(url);

        let data = await page.waitForSelector("div > main > div > div > div:nth-child(2)")
        const len = await page.evaluate(() => {
            return document.querySelectorAll(
                "div > main > div > div > div:nth-child(2) > div"
            ).length;
        });

        for (let i = 1; i <= len; i++) {
            let title = await page.waitForSelector(`div > main > div > div > div:nth-child(2) > div:nth-child(${i}) > div > div:nth-child(2) > div:nth-child(1) > a`);
            let title_text = await page.evaluate(el => el.innerText, title);

            let description = await page.waitForSelector(`div > main > div > div > div:nth-child(2) > div:nth-child(${i}) > div > div:nth-child(2) > div:nth-child(2)`);
            let description_text = await page.evaluate(el => el.innerText, description);

            let app = "https://wsa-test.vercel.app"

            let image = await page.waitForSelector(`div > main > div > div > div:nth-child(2) > div:nth-child(${i}) > a > img`);
            let image_text = app.concat(await page.evaluate(el => el.getAttribute('src'), image));

            let href = await page.waitForSelector(`div > main > div > div > div:nth-child(2) > div:nth-child(${i}) > a`);
            let href_text = app.concat(await page.evaluate(el => el.getAttribute('href'), href));

            await href.click();

            let long_description = await page.waitForSelector(`div > div > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2)`);
            let long_description_text = await page.evaluate(el => el.innerHTML, long_description);

            let count = await page.evaluate(() => {
                const textContent = document.body.textContent || document.body.innerText;
                const wordCount = textContent.split(/(?=[A-Z])|\s+/).filter(word => word.length > 0).length;
                return wordCount
            })

            let sentiment = analyzeSentiment(await page.evaluate(() => { return document.body.textContent }))


            await page.goBack();

            let obj = JSON.stringify({
                "title": title_text, "short_description": description_text, "image": image_text, "href": href_text,
                "long_description": long_description_text, "words": count, "sentiment": sentiment
            })
            let jsonobj = JSON.parse(obj)
            objs.push(jsonobj)

        }
        await browser.close();
        return objs
    } catch (error) {
        console.error('Error:', error);
    }
}