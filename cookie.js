//
function createCommonCourse(){
    var CommonCourse = ["EASY"];
    if(getCookie("UNLOCK-NORMAL")){
        CommonCourse.push("NORMAL");
    }
    if(getCookie("UNLOCK-HARD")){
        CommonCourse.push("HARD");
    }
    if(getCookie("UNLOCK-STRAIGHT")){
        CommonCourse.push("STRAIGHT");
    }
    if(getCookie("UNLOCK-KIRE")){
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
    return result[name];
}

//
function setCookie(name,value){
        document.cookie = name+'=' + encodeURIComponent( value );
}

function cookieUpdate(GameMode, Point){

}