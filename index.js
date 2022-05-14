const express = require("express");
const axios = require("axios");
const flatted = require("flatted");
const cheerio = require('cheerio')

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/info/", async (req, res) => {
    const url = req.query.url;

    const report = await getInfo(url);

    res.send({report});
});

/**
 * Returns report of weather of one city for a monthly
 *
 * @param {URL} url The url for data extraction.
 * @return {JSON} sorted weather data.
 */
const getInfo = async (url) => {
    const report = [{}];
    const form = await axios.get(url);

    const $ = cheerio.load(
        form.data.toString()
    );

    // const firstHeader = $('div.half-day-card-content');
    // let details = $('.panel-item span')
    const details = $('.panel-item')

    // console.log($('.panel-item'));
    // console.log($('.panel-item  span'));
    // console.log(details.children());
    // console.log(details.children().first());
    // console.log(details[0].children[0].data);
    const desc = $(".phrase").text();
    const listItems = $(".panel-item");

    report[0].Day = {}
    report[0].Night = {}

    for (let info of details) {


        let label = info?.children[0]?.data
        let value = info?.children[1]?.children[0]?.data

        if(!report[0].Day.maxUvIndex) {
            switch (label) {
                case "Max UV Index" :
                    report[0].Day.maxUvIndex = value
                    break
                case "Wind":
                    report[0].Day.wind = value
                    break
                case "Wind Gusts":
                    report[0].Day.windGusts = value
                    break
                case "Probability of Precipitation":
                    report[0].Day.probabilityOfPrecipitation = value
                    break
                case "Probability of Thunderstorms":
                    report[0].Day.probabilityOfThunderstorms = value
                    break
                case "Precipitation":
                    report[0].Day.precipitation = value
                    break
                case "Rain":
                    report[0].Day.rain = value
                    break
                case "Hours of Precipitation":
                    report[0].Day.hoursOfPrecipitation = value
                    break
                case "Hours of Rain":
                    report[0].Day.hoursOfRain = value
                    break
                case "Cloud Cover":
                    report[0].Day.cloudCover = value
                    break
            }
        } else {
            switch (label) {
                case "Max UV Index" :
                    report[0].Night.maxUvIndex = value
                    break
                case "Wind":
                    report[0].Night.wind = value
                    break
                case "Wind Gusts":
                    report[0].Night.windGusts = value
                    break
                case "Probability of Precipitation":
                    report[0].Night.probabilityOfPrecipitation = value
                    break
                case "Probability of Thunderstorms":
                    report[0].Night.probabilityOfThunderstorms = value
                    break
                case "Precipitation":
                    report[0].Night.precipitation = value
                    break
                case "Rain":
                    report[0].Night.rain = value
                    break
                case "Hours of Precipitation":
                    report[0].Night.hoursOfPrecipitation = value
                    break
                case "Hours of Rain":
                    report[0].Night.hoursOfRain = value
                    break
                case "Cloud Cover":
                    report[0].Night.cloudCover = value
                    break
            }
        }
    }

    // report.description = desc
    // report.description =
    // report.description = $('.phrase').text()
    // return $('.panel-item').text()
    return report
};

app.listen(port, () => {
    -
        console.log(`App listening on port ${port}`);
});
