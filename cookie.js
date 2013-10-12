//
function createCommonCourse(){
    var CommonCourse = ["EASY"];
    if(getCookie("UNLOCK_NORMAL")){
        CommonCourse.push("NORMAL");
    }
    if(getCookie("UNLOCK_HARD")){
        CommonCourse.push("HARD");
    }
    if(getCookie("UNLOCK_STRAIGHT")){
        CommonCourse.push("STRAIGHT");
    }
    if(getCookie("UNLOCK_KIRE")){
        CommonCourse.push("KIRE");
    }
    return CommonCourse;
}
//
function createExtraCourse(){
    var ExtraCourse = ["KNOCK"];
    if(getCookie("UNLOCK_YUNO")){
        ExtraCourse.push("YUNO");
    }
    if(getCookie("UNLOCK_KNOCK_EX")){
        ExtraCourse.push("KNOCK_EX");
    }
    if(getCookie("UNLOCK_EASY_EX")){
        ExtraCourse.push("EASY_EX");
    }
    return ExtraCourse;
}

//
function getCookie(name){
    var result = new Array();
    var allcookies = document.cookie;
    if( allcookies != '' )    {
        var cookies = allcookies.split( ';' );
        for( var i = 0; i < cookies.length; i++ )        {
            var cookie = cookies[ i ].split( '=' );

            // クッキーの名前をキーとして 配列に追加する
            result[ cookie[ 0 ] ] = decodeURIComponent( cookie[ 1 ] );
        }
    }
    if(result[name] === undefined){
        return 0;
    }
    return parseInt(result[name]);
}

//
function setCookie(name,value){
        document.cookie = name+'=' + encodeURIComponent( value );
}

function unlock(){
    console.log("unlock check");
    //NORMAL解放
    if(getCookie("CLEARLANK_EASY") > 0 && getCookie("UNLOCK_NORMAL") == 0){
        setCookie("UNLOCK_NORMAL",1);
        console.log('UNLOCK_NORMAL');
    }
    //HARD解放
    if(getCookie("CLEARLANK_NORMAL") > 0 && getCookie("UNLOCK_HARD") == 0){
        setCookie("UNLOCK_HARD",1);
        console.log('UNLOCK_HARD');
    }
    //STRAIGHT & KIRE解放
    if(getCookie("CLEARLANK_HARD") > 0 && getCookie("UNLOCK_STRAIGHT") == 0 && getCookie("UNLOCK_KIRE") == 0){
        setCookie("UNLOCK_STRAIGHT",1);
        setCookie("UNLOCK_KIRE",1);
        console.log('UNLOCK_STRAIGHT,KIRE');
    }
    //YUNO解放
    if(getCookie("CLEARLANK_STRAIGHT") > 0 && getCookie("CLEARLANK_KIRE") > 0 && getCookie("UNLOCK_YUNO") == 0){
        setCookie("UNLOCK_YUNO",1);
        console.log('UNLOCK_YUNO');
    }
    /*あとで
    //KNOCK_EX解放
    if(getCookie("CLEARLANK_STRAIGHT") > 0 && getCookie("CLEARLANK_KIRE") > 0 && getCookie("UNLOCK_YUNO") == 0){
        setCookie("UNLOCK_YUNO",1);
        console.log('UNLOCK_YUNO');
    }
    //EASY_EX解放
    if(getCookie("CLEARLANK_STRAIGHT") > 0 && getCookie("CLEARLANK_KIRE") > 0 && getCookie("UNLOCK_YUNO") == 0){
        setCookie("UNLOCK_YUNO",1);
        console.log('UNLOCK_YUNO');
    }
    */
}

//
function cookieUpdate(course_e, Point, ball_number){
    console.log(course_e);
    console.log(Point.num);
    //◆ほのぼの
    if(course_e === "EASY"){
        var clearlank = getCookie("CLEARLANK_EASY");
        console.log(clearlank);
        if(Point.num >= 500 && clearlank < 3){//☆☆☆ 500
            setCookie("CLEARLANK_EASY",3);
        }else if(Point.num >= 400 && clearlank < 2){//☆☆ 400
            setCookie("CLEARLANK_EASY",2);
        }else if(Point.num >= 250 && clearlank < 1){//☆ 250
            setCookie("CLEARLANK_EASY",1);
        }
        //★全真芯
        if(Point.super_hit == ball_number){
        
        }
    }
    //◆わくわく
    else if(course_e === "NORMAL"){
        var clearlank = getCookie("CLEARLANK_NORMAL");
        if(Point.num >= 1000 && clearlank < 3){//☆☆☆ 1000
            setCookie("CLEARLANK_NORMAL",3);
        }else if(Point.num >= 800 && clearlank < 2){//☆☆ 800
            setCookie("CLEARLANK_NORMAL",2);
        }else if(Point.num >= 500 && clearlank < 1){//☆ 500
            setCookie("CLEARLANK_NORMAL",1);
        }
    }
    //◆どきどき
    else if(course_e === "HARD"){
        var clearlank = getCookie("CLEARLANK_HARD");
        if(Point.num >= 1000 && clearlank < 3){//☆☆☆ 1000
            setCookie("CLEARLANK_HARD",3);
        }else if(Point.num >= 800 && clearlank < 2){//☆☆ 800
            setCookie("CLEARLANK_HARD",2);
        }else if(Point.num >= 500 && clearlank < 1){//☆ 500
            setCookie("CLEARLANK_HARD",1);
        }
    }
    //◆まっすぐ
    else if(course_e === "STRAIGHT"){
        var clearlank = getCookie("CLEARLANK_STRAIGHT");
        if(Point.num >= 1000 && clearlank < 3){//☆☆☆ 1000
            setCookie("CLEARLANK_STRAIGHT",3);
        }else if(Point.num >= 800 && clearlank < 2){//☆☆ 800
            setCookie("CLEARLANK_STRAIGHT",2);
        }else if(Point.num >= 500 && clearlank < 1){//☆ 500
            setCookie("CLEARLANK_STRAIGHT",1);
        }
    }
    //◆きれきれ
    else if(course_e === "KIRE"){
        var clearlank = getCookie("CLEARLANK_KIRE");
        if(Point.num >= 1000 && clearlank < 3){//☆☆☆ 1000
            setCookie("CLEARLANK_KIRE",3);
        }else if(Point.num >= 800 && clearlank < 2){//☆☆ 800
            setCookie("CLEARLANK_KIRE",2);
        }else if(Point.num >= 500 && clearlank < 1){//☆ 500
            setCookie("CLEARLANK_KIRE",1);
        }
        //★空振りしない
        if(Point.miss == 0){
        
        }
    }
    //◆ゆのさま
    else if(course_e === "YUNO"){
        var clearlank = getCookie("CLEARLANK_YUNO");
        if(Point.num >= 800 && clearlank < 3){//☆☆☆ 800
            setCookie("CLEARLANK_YUNO",3);
        }else if(Point.num >= 600 && clearlank < 2){//☆☆ 600
            setCookie("CLEARLANK_YUNO",2);
        }else if(Point.num >= 400 && clearlank < 1){//☆ 400
            setCookie("CLEARLANK_YUNO",1);
        }
        //★真芯で返す
        //★空振りしない
    }
    //◆100本ノック
    else if(course_e === "KNOCK"){
        var clearlank = getCookie("CLEARLANK_KNOCK");
        if(Point.num >= 8000 && clearlank < 3){//☆☆☆ 8000
            setCookie("CLEARLANK_KNOCK",3);
        }else if(Point.num >= 5000 && clearlank < 2){//☆☆ 5000
            setCookie("CLEARLANK_KNOCK",2);
        }else if(Point.num >= 3000 && clearlank < 1){//☆ 3000
            setCookie("CLEARLANK_KNOCK",1);
        }
        //★真芯20
        //★真芯10
        //★真芯5
    }
    //◆バンザイノック
    else if(course_e === "KNOCK_EX"){
        var clearlank = getCookie("CLEARLANK_KNOCK_EX");
        if(Point.num >= 10000 && clearlank < 3){//☆☆☆ 10000
            setCookie("CLEARLANK_KNOCK",3);
        }else if(Point.num >= 8000 && clearlank < 2){//☆☆ 8000
            setCookie("CLEARLANK_KNOCK",2);
        }else if(Point.num >= 5000 && clearlank < 1){//☆ 5000
            setCookie("CLEARLANK_KNOCK",1);
        }
        //★真芯50
        //★真芯40
        //★真芯30
    }
    //◆ほのぼの☆☆☆
    else if(course_e === "EASY_EX"){
        var clearlank = getCookie("CLEARLANK_EASY_EX");
        if(Point.num >= 500 && clearlank < 3){//☆☆☆ 500
            setCookie("CLEARLANK_EASY_EX",3);
        }else if(Point.num >= 400 && clearlank < 2){//☆☆ 400
            setCookie("CLEARLANK_EASY_EX",2);
        }else if(Point.num >= 250 && clearlank < 1){//☆ 250
            setCookie("CLEARLANK_EASY_EX",1);
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