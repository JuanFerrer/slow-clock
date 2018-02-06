let date: Date;

const clockFaceId = "#clock-face";
const clockHandId = "#clock-hand";

const secsInDay = 86400;

// #region Functions
let resize = () => {
	$(clockFaceId).attr("width", "100%");
	$(clockFaceId).attr("height", "100%");

	$(clockHandId).attr("width", "50%");
	$(clockHandId).attr("height", "50%");
};

let getSecondsFromDate = (d: Date) => {
	let seconds = d.getSeconds();
	seconds += d.getMinutes() * 60;
	seconds += d.getHours() * 60 * 60;
	return seconds;
};

let angleFromSeconds = (s: number) => {
	return (s / secsInDay) * 360;
};

let setHandRotation = (angle: number) => {
	$(clockHandId).css("transform", `rotate(${angle + 180}deg)`)
};

let setHandFromDate = (d: Date) => {
	setHandRotation(angleFromSeconds(getSecondsFromDate(d)));
};

let updateTime = () => {
	date = new Date();
	console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

	setHandFromDate(date);
};

let main = () => {
	resize();
	let date = new Date();
	setHandFromDate(date);

	// Start to update every second
	window.setTimeout(updateTime, 1000 - date.getMilliseconds());
};

// #endregion


// #region Event handlers
window.onresize = resize;

// #endregion

main();
