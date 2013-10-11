//
/*
function writeRecords(){
    document.cookie = 'UNLOCK_NORMAL=' + encodeURIComponent( data );
}
*/



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

    return result[name];
}

//
function setCookie(name,value){
        document.cookie = name+'=' + encodeURIComponent( value );
}