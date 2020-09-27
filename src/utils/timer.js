const data = function (timestamp,num){//num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳 
    timestamp = timestamp+'';
    timestamp = timestamp.length===10?timestamp*1000:timestamp;
    var date = new Date(timestamp);
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;  
    second = second < 10 ? ('0' + second) : second; 
    if(num===0){
        return y + '-' + m + '-' + d;  
    }else{
        return y + '-' + m + '-' + d +' '+ h +':'+ minute +':' + second;  
    }
}
export default data