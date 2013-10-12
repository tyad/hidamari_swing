//
function createCommonCourse(){
    var CommonCourse = ["EASY"];
    if(getCookie("UNLOCKNORMAL")){
        CommonCourse.push("NORMAL");
    }
    if(getCookie("UNLOCKHARD")){
        CommonCourse.push("HARD");
    }
    if(getCookie("UNLOCKSTRAIGHT")){
        CommonCourse.push("STRAIGHT");
    }
    if(getCookie("UNLOCKKIRE")){
        CommonCourse.push("KIRE");
    }
    return CommonCourse;
}
//
function createExtraCourse(){
    var ExtraCourse = ["KNOCK"];
    if(getCookie("UNLOCKYUNO")){
        ExtraCourse.push("YUNO");
    }
    if(getCookie("UNLOCKKNOCKEX")){
        ExtraCourse.push("KNOCKEX");
    }
    if(getCookie("UNLOCKEASYEX")){
        ExtraCourse.push("EASYEX");
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
    if(getCookie("CLEARLANKEASY") > 0 && getCookie("UNLOCKNORMAL") == 0){
        setCookie("UNLOCKNORMAL",1);
        console.log('UNLOCKNORMAL');
    }
    //HARD解放
    if(getCookie("CLEARLANKNORMAL") > 0 && getCookie("UNLOCKHARD") == 0){
        setCookie("UNLOCKHARD",1);
        console.log('UNLOCKHARD');
    }
    //STRAIGHT & KIRE解放
    if(getCookie("CLEARLANKHARD") > 0 && getCookie("UNLOCKSTRAIGHT") == 0 && getCookie("UNLOCKKIRE") == 0){
        setCookie("UNLOCKSTRAIGHT",1);
        setCookie("UNLOCKKIRE",1);
        console.log('UNLOCKSTRAIGHT,KIRE');
    }
    //YUNO解放
    if(getCookie("CLEARLANKSTRAIGHT") > 0 && getCookie("CLEARLANKKIRE") > 0 && getCookie("UNLOCKYUNO") == 0){
        setCookie("UNLOCKYUNO",1);
        console.log('UNLOCKYUNO');
    }
    /*あとで
    //KNOCKEX解放
    if(getCookie("CLEARLANKSTRAIGHT") > 0 && getCookie("CLEARLANKKIRE") > 0 && getCookie("UNLOCKYUNO") == 0){
        setCookie("UNLOCKYUNO",1);
        console.log('UNLOCKYUNO');
    }
    //EASYEX解放
    if(getCookie("CLEARLANKSTRAIGHT") > 0 && getCookie("CLEARLANKKIRE") > 0 && getCookie("UNLOCKYUNO") == 0){
        setCookie("UNLOCKYUNO",1);
        console.log('UNLOCKYUNO');
    }
    */
}

//
function cookieUpdate(coursee, Point, ballnumber){
    console.log(coursee);
    console.log(Point.num);
    //◆ほのぼの
    if(coursee === "EASY"){
        var clearlank = getCookie("CLEARLANKEASY");
        console.log(clearlank);
        if(Point.num >= 500 && clearlank < 3){//☆☆☆ 500
            setCookie("CLEARLANKEASY",3);
        }else if(Point.num >= 400 && clearlank < 2){//☆☆ 400
            setCookie("CLEARLANKEASY",2);
        }else if(Point.num >= 250 && clearlank < 1){//☆ 250
            setCookie("CLEARLANKEASY",1);
        }
        //★全真芯
        if(Point.superhit == ballnumber){
        
        }
    }
    //◆わくわく
    else if(coursee === "NORMAL"){
        var clearlank = getCookie("CLEARLANKNORMAL");
        if(Point.num >= 1000 && clearlank < 3){//☆☆☆ 1000
            setCookie("CLEARLANKNORMAL",3);
        }else if(Point.num >= 800 && clearlank < 2){//☆☆ 800
            setCookie("CLEARLANKNORMAL",2);
        }else if(Point.num >= 500 && clearlank < 1){//☆ 500
            setCookie("CLEARLANKNORMAL",1);
        }
    }
    //◆どきどき
    else if(coursee === "HARD"){
        var clearlank = getCookie("CLEARLANKHARD");
        if(Point.num >= 1000 && clearlank < 3){//☆☆☆ 1000
            setCookie("CLEARLANKHARD",3);
        }else if(Point.num >= 800 && clearlank < 2){//☆☆ 800
            setCookie("CLEARLANKHARD",2);
        }else if(Point.num >= 500 && clearlank < 1){//☆ 500
            setCookie("CLEARLANKHARD",1);
        }
    }
    //◆まっすぐ
    else if(coursee === "STRAIGHT"){
        var clearlank = getCookie("CLEARLANKSTRAIGHT");
        if(Point.num >= 1000 && clearlank < 3){//☆☆☆ 1000
            setCookie("CLEARLANKSTRAIGHT",3);
        }else if(Point.num >= 800 && clearlank < 2){//☆☆ 800
            setCookie("CLEARLANKSTRAIGHT",2);
        }else if(Point.num >= 500 && clearlank < 1){//☆ 500
            setCookie("CLEARLANKSTRAIGHT",1);
        }
    }
    //◆きれきれ
    else if(coursee === "KIRE"){
        var clearlank = getCookie("CLEARLANKKIRE");
        if(Point.num >= 1000 && clearlank < 3){//☆☆☆ 1000
            setCookie("CLEARLANKKIRE",3);
        }else if(Point.num >= 800 && clearlank < 2){//☆☆ 800
            setCookie("CLEARLANKKIRE",2);
        }else if(Point.num >= 500 && clearlank < 1){//☆ 500
            setCookie("CLEARLANKKIRE",1);
        }
        //★空振りしない
        if(Point.miss == 0){
        
        }
    }
    //◆ゆのさま
    else if(coursee === "YUNO"){
        var clearlank = getCookie("CLEARLANKYUNO");
        if(Point.num >= 800 && clearlank < 3){//☆☆☆ 800
            setCookie("CLEARLANKYUNO",3);
        }else if(Point.num >= 600 && clearlank < 2){//☆☆ 600
            setCookie("CLEARLANKYUNO",2);
        }else if(Point.num >= 400 && clearlank < 1){//☆ 400
            setCookie("CLEARLANKYUNO",1);
        }
        //★真芯で返す
        //★空振りしない
    }
    //◆100本ノック
    else if(coursee === "KNOCK"){
        var clearlank = getCookie("CLEARLANKKNOCK");
        if(Point.num >= 8000 && clearlank < 3){//☆☆☆ 8000
            setCookie("CLEARLANKKNOCK",3);
        }else if(Point.num >= 5000 && clearlank < 2){//☆☆ 5000
            setCookie("CLEARLANKKNOCK",2);
        }else if(Point.num >= 3000 && clearlank < 1){//☆ 3000
            setCookie("CLEARLANKKNOCK",1);
        }
        //★真芯20
        //★真芯10
        //★真芯5
    }
    //◆バンザイノック
    else if(coursee === "KNOCKEX"){
        var clearlank = getCookie("CLEARLANKKNOCKEX");
        if(Point.num >= 10000 && clearlank < 3){//☆☆☆ 10000
            setCookie("CLEARLANKKNOCK",3);
        }else if(Point.num >= 8000 && clearlank < 2){//☆☆ 8000
            setCookie("CLEARLANKKNOCK",2);
        }else if(Point.num >= 5000 && clearlank < 1){//☆ 5000
            setCookie("CLEARLANKKNOCK",1);
        }
        //★真芯50
        //★真芯40
        //★真芯30
    }
    //◆ほのぼの☆☆☆
    else if(coursee === "EASYEX"){
        var clearlank = getCookie("CLEARLANKEASYEX");
        if(Point.num >= 500 && clearlank < 3){//☆☆☆ 500
            setCookie("CLEARLANKEASYEX",3);
        }else if(Point.num >= 400 && clearlank < 2){//☆☆ 400
            setCookie("CLEARLANKEASYEX",2);
        }else if(Point.num >= 250 && clearlank < 1){//☆ 250
            setCookie("CLEARLANKEASYEX",1);
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