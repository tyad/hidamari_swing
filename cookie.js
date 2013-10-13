//
function createCommonCourse(){
	var CommonCourse = ["EASY"];
	if(getCookie("UNLOCK-NORMAL") == 1){
		CommonCourse.push("NORMAL");
	}
	if(getCookie("UNLOCK-HARD") == 1){
		CommonCourse.push("HARD");
	}
	if(getCookie("UNLOCK-STRAIGHT") == 1){
		CommonCourse.push("STRAIGHT");
	}
	if(getCookie("UNLOCK-KIRE") == 1){
		CommonCourse.push("KIRE");
	}
	return CommonCourse;
}
//
function createExtraCourse(){
	var ExtraCourse = ["KNOCK"];
	if(getCookie("UNLOCK-YUNO")){
		ExtraCourse.push("YUNO");
	}
	if(getCookie("UNLOCK-KNOCK_EX")){
		ExtraCourse.push("KNOCK_EX");
	}
	if(getCookie("UNLOCK-EASY_EX")){
		ExtraCourse.push("EASY_EX");
	}
	return ExtraCourse;
}

//
function isNumber(x){ 
    if( typeof(x) != 'number' && typeof(x) != 'string' )
        return false;
    else 
        return (x == parseFloat(x) && isFinite(x));
}

//
function getCookie(kword){
	kword = kword + "=";
	kdata = "";
	scookie = document.cookie + ";";
	start = scookie.indexOf(kword);
	if (start != -1){
		end = scookie.indexOf(";", start);
		kdata = unescape(scookie.substring(start + kword.length, end));
	}
	if(!isNumber(kdata)){
		console.log("undefined　or NaN : "+kword);
		return 0;
	}
	return parseInt(kdata);
}

//
function setCookie(name,value){
	var expire = new Date();
	expire.setTime( expire.getTime() + 1000 * 3600 * 24 * 365 * 100 );
	document.cookie = name+'=' + encodeURIComponent( value ) + '; expires=' + expire.toUTCString();
}

function unlock(){
	console.log("unlock check");
	//NORMAL解放
	if(getCookie("CLEARLANK-EASY") > 0 && getCookie("UNLOCK-NORMAL") != 1){
		setCookie("UNLOCK-NORMAL",1);
		console.log('UNLOCK-NORMAL');
	}
	//HARD解放
	if(getCookie("CLEARLANK-NORMAL") > 0 && getCookie("UNLOCK-HARD") != 1){
		setCookie("UNLOCK-HARD",1);
		console.log('UNLOCK-HARD');
	}
	//STRAIGHT & KIRE解放
	if(getCookie("CLEARLANK-HARD") > 0 && getCookie("UNLOCK-STRAIGHT") != 1 && getCookie("UNLOCK-KIRE") != 1){
		setCookie("UNLOCK-STRAIGHT",1);
		setCookie("UNLOCK-KIRE",1);
		console.log('UNLOCK-STRAIGHT,KIRE');
	}
	//YUNO解放
	if(getCookie("CLEARLANK-STRAIGHT") > 0 && getCookie("CLEARLANK-KIRE") > 0 && getCookie("UNLOCK-YUNO") != 1){
		setCookie("UNLOCK-YUNO",1);
		console.log('UNLOCK-YUNO');
	}
	/*あとで
	//KNOCK_EX解放
	if(getCookie("CLEARLANK-STRAIGHT") > 0 && getCookie("CLEARLANK-KIRE") > 0 && getCookie("UNLOCK-YUNO") != 1){
		setCookie("UNLOCK-YUNO",1);
		console.log('UNLOCK-YUNO');
	}
	//EASY_EX解放
	if(getCookie("CLEARLANK-STRAIGHT") > 0 && getCookie("CLEARLANK-KIRE") > 0 && getCookie("UNLOCK-YUNO") != 1){
		setCookie("UNLOCK-YUNO",1);
		console.log('UNLOCK-YUNO');
	}
	*/
}

//
function cookieUpdate(course_e, Point, ball_number){
	console.log(course_e);
	console.log(Point.num);
	//◆ほのぼの
	if(course_e === "EASY"){
		var clearlank = getCookie("CLEARLANK-EASY");
		console.log(clearlank);
		if(Point.num >= 500 && clearlank < 3){//☆☆☆ 500
			setCookie("CLEARLANK-EASY",3);
		}else if(Point.num >= 400 && clearlank < 2){//☆☆ 400
			setCookie("CLEARLANK-EASY",2);
		}else if(Point.num >= 250 && clearlank < 1){//☆ 250
			setCookie("CLEARLANK-EASY",1);
		}
		//★全真芯
		if(Point.super_hit == ball_number){
		
		}
	}
	//◆わくわく
	else if(course_e === "NORMAL"){
		var clearlank = getCookie("CLEARLANK-NORMAL");
		if(Point.num >= 1000 && clearlank < 3){//☆☆☆ 1000
			setCookie("CLEARLANK-NORMAL",3);
		}else if(Point.num >= 800 && clearlank < 2){//☆☆ 800
			setCookie("CLEARLANK-NORMAL",2);
		}else if(Point.num >= 500 && clearlank < 1){//☆ 500
			setCookie("CLEARLANK-NORMAL",1);
		}
	}
	//◆どきどき
	else if(course_e === "HARD"){
		var clearlank = getCookie("CLEARLANK-HARD");
		if(Point.num >= 1000 && clearlank < 3){//☆☆☆ 1000
			setCookie("CLEARLANK-HARD",3);
		}else if(Point.num >= 800 && clearlank < 2){//☆☆ 800
			setCookie("CLEARLANK-HARD",2);
		}else if(Point.num >= 500 && clearlank < 1){//☆ 500
			setCookie("CLEARLANK-HARD",1);
		}
	}
	//◆まっすぐ
	else if(course_e === "STRAIGHT"){
		var clearlank = getCookie("CLEARLANK-STRAIGHT");
		if(Point.num >= 1000 && clearlank < 3){//☆☆☆ 1000
			setCookie("CLEARLANK-STRAIGHT",3);
		}else if(Point.num >= 800 && clearlank < 2){//☆☆ 800
			setCookie("CLEARLANK-STRAIGHT",2);
		}else if(Point.num >= 500 && clearlank < 1){//☆ 500
			setCookie("CLEARLANK-STRAIGHT",1);
		}
	}
	//◆きれきれ
	else if(course_e === "KIRE"){
		var clearlank = getCookie("CLEARLANK-KIRE");
		if(Point.num >= 1000 && clearlank < 3){//☆☆☆ 1000
			setCookie("CLEARLANK-KIRE",3);
		}else if(Point.num >= 800 && clearlank < 2){//☆☆ 800
			setCookie("CLEARLANK-KIRE",2);
		}else if(Point.num >= 500 && clearlank < 1){//☆ 500
			setCookie("CLEARLANK-KIRE",1);
		}
		//★空振りしない
		if(Point.miss == 0){
		
		}
	}
	//◆ゆのさま
	else if(course_e === "YUNO"){
		var clearlank = getCookie("CLEARLANK-YUNO");
		if(Point.num >= 800 && clearlank < 3){//☆☆☆ 800
			setCookie("CLEARLANK-YUNO",3);
		}else if(Point.num >= 600 && clearlank < 2){//☆☆ 600
			setCookie("CLEARLANK-YUNO",2);
		}else if(Point.num >= 400 && clearlank < 1){//☆ 400
			setCookie("CLEARLANK-YUNO",1);
		}
		//★真芯で返す
		//★空振りしない
	}
	//◆100本ノック
	else if(course_e === "KNOCK"){
		var clearlank = getCookie("CLEARLANK-KNOCK");
		if(Point.num >= 8000 && clearlank < 3){//☆☆☆ 8000
			setCookie("CLEARLANK-KNOCK",3);
		}else if(Point.num >= 5000 && clearlank < 2){//☆☆ 5000
			setCookie("CLEARLANK-KNOCK",2);
		}else if(Point.num >= 3000 && clearlank < 1){//☆ 3000
			setCookie("CLEARLANK-KNOCK",1);
		}
		//★真芯20
		//★真芯10
		//★真芯5
	}
	//◆バンザイノック
	else if(course_e === "KNOCK_EX"){
		var clearlank = getCookie("CLEARLANK-KNOCK_EX");
		if(Point.num >= 10000 && clearlank < 3){//☆☆☆ 10000
			setCookie("CLEARLANK-KNOCK",3);
		}else if(Point.num >= 8000 && clearlank < 2){//☆☆ 8000
			setCookie("CLEARLANK-KNOCK",2);
		}else if(Point.num >= 5000 && clearlank < 1){//☆ 5000
			setCookie("CLEARLANK-KNOCK",1);
		}
		//★真芯50
		//★真芯40
		//★真芯30
	}
	//◆ほのぼの☆☆☆
	else if(course_e === "EASY_EX"){
		var clearlank = getCookie("CLEARLANK-EASY_EX");
		if(Point.num >= 500 && clearlank < 3){//☆☆☆ 500
			setCookie("CLEARLANK-EASY_EX",3);
		}else if(Point.num >= 400 && clearlank < 2){//☆☆ 400
			setCookie("CLEARLANK-EASY_EX",2);
		}else if(Point.num >= 250 && clearlank < 1){//☆ 250
			setCookie("CLEARLANK-EASY_EX",1);
		}
	}
		/*
		◆累計
		★初真芯
		★真芯10
		★真芯100
		★真芯1000

		★累計10000m
		★累計100000m

		★空振り100

		◆特殊
		★合計365m
		★合計3桁ゾロ目
		*/
	//アンロック判定
	unlock();
}