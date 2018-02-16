let date;
let sunEventsDates = {
    sunrise: new Date(),
    noon: new Date(),
    sunset: new Date()
};
const clockFaceId = "#clock-face";
const clockHandId = "#clock-hand";
const sunriseContainerId = "#sunrise-icon-container";
const sunriseId = "#sunrise-icon";
const noonContainerId = "#noon-icon-container";
const noonId = "#noon-icon";
const sunsetContainerId = "#sunset-icon-container";
const sunsetId = "#sunset-icon";
const infoId = "#info-icon";
let infoTooltip;
const sInDay = 86400;
// #region Functions
/** Resize the clock to fit the screen */
let resize = () => {
    $(clockFaceId).attr("width", "100%");
    $(clockFaceId).attr("height", "100%");
    $(clockHandId).attr("width", "70%");
    $(clockHandId).attr("height", "70%");
    let widthGreaterThanHeight = $(clockFaceId).width() > $(clockFaceId).height();
    let clockFaceSize = (widthGreaterThanHeight ? $(clockFaceId).height() : $(clockFaceId).width());
    let iconSize = clockFaceSize * 0.1;
    $(".icon-container img").attr("width", iconSize);
    $(".icon-container img").attr("height", iconSize);
    $(".icon-container img").css("top", -((clockFaceSize / 2) - clockFaceSize * 0.22));
};
/**
 * Get the amount of seconds that have passed from the beginning of the day to the given date
 * @param d Date
 */
let getSecondsFromDate = (d) => {
    let s = d.getSeconds();
    s += d.getMinutes() * 60;
    s += d.getHours() * 60 * 60;
    return s;
};
/**
 * Get and angle from the specified seconds that have passed
 * @param s Seconds
 */
let angleFromSeconds = (s) => {
    return (s / sInDay) * 360;
};
/**
 * Set the rotation of the element to the specified angle
 * @param e Element
 * @param a Angle
 */
let setElementRotation = (e, a) => {
    // Since all elements point up, we need to turn them upside down first
    $(e).css("transform", `rotate(${a + 180}deg)`);
};
/**
 * Set the rotation of the element from a given date
 * @param e Element
 * @param d Date
 * @param o Opposite
 */
let setRotationFromDate = (e, d, o) => {
    setElementRotation(e, (o ? -1 : 1) * angleFromSeconds(getSecondsFromDate(d)));
};
/**
 * Populate the sunEventsDates object
*/
let populateSunEventsDates = (data) => {
    let parsedData = data.results;
    sunEventsDates.sunrise = new Date(parsedData.sunrise);
    sunEventsDates.noon = new Date(parsedData["solar_noon"]);
    sunEventsDates.sunset = new Date(parsedData.sunset);
};
/** Prepare sunrise and sunset icons */
let setIconsRotation = (xhr) => {
    setRotationFromDate(sunriseContainerId, sunEventsDates.sunrise);
    setRotationFromDate(sunriseId, sunEventsDates.sunrise, true);
    setRotationFromDate(noonContainerId, sunEventsDates.noon);
    setRotationFromDate(noonId, sunEventsDates.noon, true);
    setRotationFromDate(sunsetContainerId, sunEventsDates.sunset);
    setRotationFromDate(sunsetId, sunEventsDates.sunset, true);
    $(".icon-container img").css("visibility", "visible");
};
/** Get sun events and display them on the clock face */
let showSunEvents = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            $.ajax({
                url: `https://api.sunrise-sunset.org/json?lat=${position.coords.latitude}&lng=${position.coords.longitude}&formatted=0`,
                error: (e) => { console.log(e); },
                success: (d) => {
                    if (d.status == "OK") {
                        populateSunEventsDates(d);
                    }
                },
                complete: setIconsRotation,
            });
        }, (e) => {
            console.log(e);
            $(infoId).attr("data-content", "Geolocation disabled");
        });
    }
};
/** Update the time every second */
let updateTime = () => {
    date = new Date();
    //console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    setRotationFromDate(clockHandId, date);
    window.setTimeout(updateTime, 1000);
};
/** Main function */
let main = () => {
    $('[data-toggle="popover"]').popover();
    resize();
    let d = new Date();
    setRotationFromDate(clockHandId, d);
    // TODO: requires fallback if user blocks
    showSunEvents();
    // Start to update every second
    window.setTimeout(updateTime, 1000 - d.getMilliseconds());
};
// #endregion
// #region Event handlers
window.onresize = resize;
// #endregion
main();
