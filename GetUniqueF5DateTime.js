/**
 * Object for retreiving unique date/time stamps formatted
 * in our standard field 5 syntax.
 *
 * @author Dave Snigier (UMass) dsnigier@gmail.com
 * 
 *
 * # Example
 *
 *     var time = new GetUniqueF5DateTime();
 *     
 *     printf(time.tellTheTime()); // 03/26/2013 02:51:24 PM
 *     printf(time.tellTheTime()); // 03/26/2013 02:51:25 PM
 *     
 *     time.showMicroseconds = true;
 *     
 *     printf(time.tellTheTime()); // 03/26/2013 02:51:26.890 PM
 *     printf(time.tellTheTime()); // 03/26/2013 02:51:26.891 PM
 *
 * @class GetUniqueF5DateTime
 * @constructor
 *
 * @cfg {Boolean} showMicroseconds - Should microseconds be used in the output. Default is: false.
*/
function GetUniqueF5DateTime(showMicroseconds) {
	this.lastRun = "";
	this.showMicroseconds = showMicroseconds || false;
	var time = "";
	var that = this;

	/**
	 * return a unique timestamp in the correct format.
	 * @member GetUniqueF5DateTime
	 * @method tellTheTime
	 * @return {String} A unique date/time
	*/
	this.tellTheTime = function() {
		time = itsTime();
		while (time === that.lastRun) {
			time = itsTime();
		}
		that.lastRun = time;
		return time;
	};

	/**
	 * @private
	 * @member GetUniqueF5DateTime
	 * @method itsTime
	 * @return {string} date/time stamp in correct F5 formatting
	*/
	var itsTime = function () {
		var objDate = new Date();
		var hour = objDate.getHours();
		var amPm = "AM";


		// 24 to 12 hour conversion
		if (hour === 12) {
			amPm = "PM";
		}
		if (hour > 12) {
			hour = hour - 12;
			amPm = "PM";
		}
		if (hour < 10) {
			hour = "0"+hour;
		}
		if (hour === 0) {
			hour = "12";
			amPm = "AM";
		}
		var minutes = objDate.getMinutes();
		if(minutes < 10) {
			minutes = "0"+minutes;
		}
		var runTimeSec = objDate.getSeconds();
		if (runTimeSec < 10) {
			runTimeSec = "0"+runTimeSec;
		}

		// date
		var month = objDate.getMonth()+1;
		if(month < 10) {
			month = "0"+month;
		}
		var day = objDate.getDate();
		if(day < 10) {
			day = "0"+day;
		}
		var year = objDate.getFullYear();
		if(year < 10) {
			year = "0"+year;
		}

		// microseconds if needed
		var micros = "";
		if (that.showMicroseconds) {
			micros = "." + objDate.getMilliseconds();
		}

		return month+"/"+day+"/"+year+" "+hour+":"+minutes+":"+runTimeSec+micros+" "+amPm;
	};
}