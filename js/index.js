let date;
const clockFaceId = "#clock-face";
const clockHandId = "#clock-hand";
const sInDay = 86400;
// #region Functions
let resize = () => {
    $(clockFaceId).attr("width", "100%");
    $(clockFaceId).attr("height", "100%");
    $(clockHandId).attr("width", "70%");
    $(clockHandId).attr("height", "70%");
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
 * Set the rotation of the hand to the specified angle
 * @param a Angle
 */
let setHandRotation = (a) => {
    $(clockHandId).css("transform", `rotate(${a + 180}deg)`);
};
/**
 * Set the rotation of the hand from a given date
 * @param d Date
 */
let setHandFromDate = (d) => {
    setHandRotation(angleFromSeconds(getSecondsFromDate(d)));
};
/**
 * Update the time every second
*/
let updateTime = () => {
    date = new Date();
    console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    setHandFromDate(date);
    window.setTimeout(updateTime, 1000);
};
/**
 * Main function
*/
let main = () => {
    resize();
    let d = new Date();
    setHandFromDate(d);
    // Start to update every second
    window.setTimeout(updateTime, 1000 - d.getMilliseconds());
};
// #endregion
// #region Event handlers
window.onresize = resize;
// #endregion
main();
