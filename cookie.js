var TROPHY_DATA = {
	"TROPHY-EASY-CLEAR":{
		"name":"ほのぼの",
		"text":"ほのぼのコースをクリア"
	},
	"TROPHY-EASY-RANKMAX":{
		"name":"芽生えドライブ",
		"text":"ほのぼのコースで★★★"
	},
	"TROPHY-EASY-ALLJUSTMEET":{
		"name":"カッキーン！",
		"text":"ほのぼのコースで全ての球を真芯ヒットさせた"
	},

	"TROPHY-NORMAL-CLEAR":{
		"name":"わくわく",
		"text":"ほのぼのコースをクリア"
	},
	"TROPHY-NORMAL-RANKMAX":{
		"name":"流星レコード",
		"text":"わくわくコースで★★★"
	},

	"TROPHY-HARD-CLEAR":{
		"name":"どきどき",
		"text":"どきどきコースをクリア"
	},
	"TROPHY-HARD-RANKMAX":{
		"name":"あやふやロケット",
		"text":"どきどきコースで★★★"
	},

	"TROPHY-STRAIGHT-CLEAR":{
		"name":"まっすぐ",
		"text":"まっすぐコースをクリア"
	},
	"TROPHY-STRAIGHT-RANKMAX":{
		"name":"なんかいいキモチ",
		"text":"まっすぐコースで★★★"
	},

	"TROPHY-KIRE-CLEAR":{
		"name":"きれきれ",
		"text":"きれきれコースをクリア"
	},
	"TROPHY-KIRE-RANKMAX":{
		"name":"なればいいカンジ",
		"text":"きれきれコースで★★★"
	},

	"TROPHY-YUNO-CLEAR":{
		"name":"ゆのさま",
		"text":"ゆのさまをクリア"
	},
	"TROPHY-YUNO-RANKMAX":{
		"name":"VIP",
		"text":"ゆのさまで★★★"
	},

	"TROPHY-KNOCK-CLEAR":{
		"name":"おつかれさま",
		"text":"100本ノックをクリア"
	},
	"TROPHY-KNOCK-RANKMAX":{
		"name":"はなまる",
		"text":"100本ノックで★★★"
	},

	"TROPHY-EASY_EX-CLEAR":{
		"name":"あららできちゃった",
		"text":"ほのぼのコース×SPをクリア"
	},
	"TROPHY-EASY_EX-RANKMAX":{
		"name":"あればできちゃうね",
		"text":"ほのぼのコース×SPで★★★"
	},

	"TROPHY-KNOCK_EX-CLEAR":{
		"name":"わっしょい",
		"text":"バンザイノックをクリア"
	},
	"TROPHY-KNOCK_EX-RANKMAX":{
		"name":"わしょしょい",
		"text":"バンザイノックで★★★"
	}
}

var COURSE_DATA = {
	"EASY":{
		"name":"ほのぼのコース"
	},
	"NORMAL":{
		"name":"わくわくコース"
	},
	"HARD":{
		"name":"どきどきコース"
	},
	"STRAIGHT" : {
		"name":"まっすぐコース"
	},
	"KIRE" : {
		"name":"きれきれコース"
	},
	"YUNO" : {
		"name":"ゆのさま"
	},
	"KNOCK" : {
		"name":"100本ノック"
	},
	"EASY_EX" : {
		"name":"ほのぼのコース×SP"
	},
	"KNOCK_EX" : {
		"name":"バンザイノック"
	}
}

//通常コース生成
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
//エクストラコース生成
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

//数字か判定関数（undefinedとNaNを避けるため）
function isNumber(x){ 
    if( typeof(x) != 'number' && typeof(x) != 'string' )
        return false;
    else 
        return (x == parseFloat(x) && isFinite(x));
}

//指定のクッキー取得
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

//指定のクッキーを設定
function setCookie(name,value){
	var expire = new Date();
	expire.setTime( expire.getTime() + 1000 * 3600 * 24 * 365 * 100 );
	document.cookie = name+'=' + encodeURIComponent( value ) + '; expires=' + expire.toUTCString();
}

//アンロック判定関数
function unlock(){
	console.log("unlock check");
	//NORMAL解放
	if(getCookie("CLEARLANK-EASY") > 0 && getCookie("UNLOCK-NORMAL") != 1){

		setCookie("UNLOCK-NORMAL",1);
		popUp("UNLOCK","NORMAL");
	}
	//HARD解放
	if(getCookie("CLEARLANK-NORMAL") > 0 && getCookie("UNLOCK-HARD") != 1){
		setCookie("UNLOCK-HARD",1);
		popUp("UNLOCK","HARD");
	}
	//STRAIGHT & KIRE解放
	if(getCookie("CLEARLANK-HARD") > 0 && getCookie("UNLOCK-STRAIGHT") != 1 && getCookie("UNLOCK-KIRE") != 1){
		setCookie("UNLOCK-STRAIGHT",1);
		setCookie("UNLOCK-KIRE",1);
		popUp("UNLOCK","STRAIGHT");
		popUp("UNLOCK","KIRE");
	}
	//YUNO解放
	if(getCookie("CLEARLANK-STRAIGHT") > 0 && getCookie("CLEARLANK-KIRE") > 0 && getCookie("UNLOCK-YUNO") != 1){
		setCookie("UNLOCK-YUNO",1);
		popUp("UNLOCK","YUNO");
	}
	/*命名規則に従って変えてください
	//KNOCK_EX解放
	if(getCookie("なんちゃらJUSTMEET") > 0 && getCookie("UNLOCK-KNOCK_EX") != 1){
		setCookie("UNLOCK-KNOCK_EX",1);
		console.log('UNLOCK-KNOCK_EX');//ポップアップ表示と置き換えてね
	}
	*/
	//EASY_EX解放
	if(getCookie("CLEARLANK-EASY") == 3 && getCookie("UNLOCK-EASY_EX") != 1){
		setCookie("UNLOCK-EASY_EX",1);
		popUp("UNLOCK","EASY_EX");
	}
}

//クッキー更新
function cookieUpdate(course_e, Point, ball_number){
	console.log(course_e);//for debug
	console.log(Point.num);//for debug
	//◆ほのぼの
	if(course_e === "EASY"){
		var clearlank = getCookie("CLEARLANK-EASY");
		console.log(clearlank);
		if(Point.num >= 500 && clearlank < 3){//☆☆☆ 500
			setCookie("CLEARLANK-EASY",3);
			if(getCookie("TROPHY-EASY-RANKMAX") == 0){
				setCookie("TROPHY-EASY-RANKMAX",1);
				popUp("TROPHY","TROPHY-EASY-RANKMAX");
			}
		}else if(Point.num >= 400 && clearlank < 2){//☆☆ 400
			setCookie("CLEARLANK-EASY",2);
		}else if(Point.num >= 250 && clearlank < 1){//☆ 250
			setCookie("CLEARLANK-EASY",1);
		}

		//クリアトロフィー
		if(getCookie("TROPHY-EASY-CLEAR") == 0 && Point.num >= 250){
			setCookie("TROPHY-EASY-CLEAR",1);
			popUp("TROPHY","TROPHY-EASY-CLEAR");
		}

		//★全真芯
		if(Point.justmeet == ball_number && getCookie("TROPHY-EASY-ALLJUSTMEET") == 0){
			setCookie("TROPHY-EASY-ALLJUSTMEET",1);
			popUp("TROPHY","TROPHY-EASY-ALLJUSTMEET");
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

		//クリアトロフィー
		if(getCookie("TROPHY-NORMAL-CLEAR") == 0 && Point.num >= 500){
			setCookie("TROPHY-NORMAL-CLEAR",1);
			popUp("TROPHY","TROPHY-NORMAL-CLEAR");
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

		//クリアトロフィー
		if(getCookie("TROPHY-HARD-CLEAR") == 0 && Point.num >= 500){
			setCookie("TROPHY-HARD-CLEAR",1);
			popUp("TROPHY","TROPHY-HARD-CLEAR");
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

		//クリアトロフィー
		if(getCookie("TROPHY-STRAIGHT-CLEAR") == 0 && Point.num >= 500){
			setCookie("TROPHY-STRAIGHT-CLEAR",1);
			popUp("TROPHY","TROPHY-STRAIGHT-CLEAR");
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

		//クリアトロフィー
		if(getCookie("TROPHY-KIRE-CLEAR") == 0 && Point.num >= 500){
			setCookie("TROPHY-KIRE-CLEAR",1);
			popUp("TROPHY","TROPHY-KIRE-CLEAR");
		}

		/*お好きにどうぞ
		//★空振りしない
		if(Point.miss == 0){
		
		}
		*/
	}
	//◆ゆのさま
	else if(course_e === "YUNO"){
		var clearlank = getCookie("CLEARLANK-YUNO");
		if(Point.num >= 900 && clearlank < 3){//☆☆☆ 800
			setCookie("CLEARLANK-YUNO",3);
		}else if(Point.num >= 700 && clearlank < 2){//☆☆ 600
			setCookie("CLEARLANK-YUNO",2);
		}else if(Point.num >= 400 && clearlank < 1){//☆ 400
			setCookie("CLEARLANK-YUNO",1);
		}

		//クリアトロフィー
		if(getCookie("TROPHY-YUNO-CLEAR") == 0 && Point.num >= 400){
			setCookie("TROPHY-YUNO-CLEAR",1);
			popUp("TROPHY","TROPHY-YUNO-CLEAR");
		}

		/*お好きにどうぞ
		//★真芯で返す
		//★空振りしない
		*/
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

		//クリアトロフィー
		if(getCookie("TROPHY-KNOCK-CLEAR") == 0 && Point.num >= 3000){
			setCookie("TROPHY-KNOCK-CLEAR",1);
			popUp("TROPHY","TROPHY-KNOCK-CLEAR");
		}

		/*お好きにどうぞ
		if(Point.num >= 8000 && clearlank < 3){//★真芯20
			setCookie("なんちゃらJUSTMEET",3);
		}else if(Point.num >= 5000 && clearlank < 2){//★真芯10
			setCookie("なんちゃらJUSTMEET",2);
		}else if(Point.num >= 3000 && clearlank < 1){//★真芯5
			setCookie("なんちゃらJUSTMEET",1);
		}
		*/
	}
	//◆バンザイノック
	else if(course_e === "KNOCK_EX"){
		var clearlank = getCookie("CLEARLANK-KNOCK_EX");
		if(Point.num >= 10000 && clearlank < 3){//☆☆☆ 10000
			setCookie("CLEARLANK-KNOCK_EX",3);
		}else if(Point.num >= 8000 && clearlank < 2){//☆☆ 8000
			setCookie("CLEARLANK-KNOCK_EX",2);
		}else if(Point.num >= 5000 && clearlank < 1){//☆ 5000
			setCookie("CLEARLANK-KNOCK_EX",1);
		}
		//クリアトロフィー
		if(getCookie("TROPHY-KNOCK_EX-CLEAR") == 0 && Point.num >= 5000){
			setCookie("TROPHY-KNOCK_EX-CLEAR",1);
			popUp("TROPHY","TROPHY-KNOCK_EX-CLEAR");
		}

		/*お好きにどうぞ
		if(Point.num >= 8000 && clearlank < 3){//★真芯50
			setCookie("なんちゃらJUSTMEET",3);
		}else if(Point.num >= 5000 && clearlank < 2){//★真芯40
			setCookie("なんちゃらJUSTMEET",2);
		}else if(Point.num >= 3000 && clearlank < 1){//★真芯30
			setCookie("なんちゃらJUSTMEET",1);
		}
		*/
	}
	//◆ほのぼのSP
	else if(course_e === "EASY_EX"){
		var clearlank = getCookie("CLEARLANK-EASY_EX");
		if(Point.num >= 500 && clearlank < 3){//☆☆☆ 500
			setCookie("CLEARLANK-EASY_EX",3);
		}else if(Point.num >= 400 && clearlank < 2){//☆☆ 400
			setCookie("CLEARLANK-EASY_EX",2);
		}else if(Point.num >= 250 && clearlank < 1){//☆ 250
			setCookie("CLEARLANK-EASY_EX",1);
		}
		//クリアトロフィー
		if(getCookie("TROPHY-EASY_EX-CLEAR") == 0 && Point.num >= 250){
			setCookie("TROPHY-EASY_EX-CLEAR",1);
			popUp("TROPHY","TROPHY-EASY_EX-CLEAR");
		}

	}
		/*お好きにどうぞ
		◆累計(「TOTAL-なんちゃら」　とかがいいかもね)
		★初真芯
		★真芯10
		★真芯100
		★真芯1000

		★累計10000m
		★累計100000m

		★空振り100

		◆特殊（「SPECIAL-なんちゃら」　とか？）
		★合計365m
		★合計3桁ゾロ目
		*/

	//アンロック判定
	unlock();
}

function popUp(type,data_name){

	var popup_count = 0;
	for(var i = 0;;i++){
		if($(".pop"+i).length === 0){
			popup_count = i;
			break;
		}
	}
	//画面のscaleの値
	var matrix_value = new WebKitCSSMatrix($('#enchant-stage').find('div').css('-webkit-transform')).a;
	//すこしずらしたかったら
	//matrix_value = (matrix_value+0.1) * 10;
	//とかにして調節してね
	matrix_value = (matrix_value) * 10;
	matrix_value = Math.round(matrix_value) / 10;

	//実際サイズの高さ分ずらす
	var css_top = (popup_count * ($('.popup').outerHeight() + 2))*matrix_value + (2 * matrix_value);
	var css_left = 270 * matrix_value;
	if(type == "TROPHY"){
		$('body').append("<div class=\"popup pop" + popup_count + "\">★実績解除：" + TROPHY_DATA[data_name]['name'] + "</div>");
	}else if(type == "UNLOCK"){
		$('body').append("<div class=\"popup pop" + popup_count + "\">[!] " + COURSE_DATA[data_name]['name'] + "解禁！</div>");
	}

	var scale = $('#enchant-stage').find('div').css('-webkit-transform');

	$('.pop' + popup_count).css({
		'display':'block',
		'-webkit-transform-origin':'0px 0px',
		'-webkit-transform':scale,
		'top':css_top,
		'left':css_left
	});

	setTimeout( function() {
		$('.pop' + popup_count).animate(
			{'opacity':'0.9'},
			'fast'
		);
	}, $(".popup").length * 50);

	setTimeout( function() {
		$('.pop' + popup_count).animate({opacity:0,},
			{duration:'fast',complete:
			function(){
				$('.pop' + popup_count).remove();
			},
		});
	}, 4000);

}