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
    /*if(ほのぼの){
        ☆ 250
        ☆☆ 400
        ☆☆☆ 500
        ★全真芯

        ◆わくわく(基本ノルマ
        ほのぼのクリアで解放
        ☆ 500
        ☆☆ 800
        ☆☆☆ 1000

        ◆どきどき
        わくわくクリアで解放
        ☆ノルマわくわく同様

        ◆まっすぐ
        どきどきクリアで解放
        ☆ノルマわくわく同様

         ◆きれきれ
        どきどきクリアで解放
        ☆ノルマわくわく同様
        ★空振りしない

        ◆ゆのさま
        まっすぐ、きれきれクリアで解放
        ☆ 400
        ☆☆ 600
        ☆☆☆ 800
        ★真芯で返す
        ★空振りしない

        ◆100本ノック
        ☆ 3000
        ☆☆ 5000
        ☆☆☆ 8000
        ★真芯5
        ★真芯10
        ★真芯20

        ◆バンザイノック
        100本ノックで真芯5達成
        ☆ 5000
        ☆☆ 8000
        ☆☆☆ 10000
        ★真芯30
        ★真芯40
        ★真芯50

        ◆ほのぼの☆☆☆
        ほのぼのモード☆☆☆クリアで解放
        ☆250
        ☆☆400
        ☆☆☆500

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
    }
}