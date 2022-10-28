(function () {
    var topTime = document.querySelector('.topTime');
    var topDay = document.querySelector('.topDay');
    var boCent = document.querySelector('.boCent');
    var boCont = document.querySelector('.boCont');
    var nowDay = document.querySelector('.boTop .lf');
    var shang = document.querySelector('.shang');
    var xia = document.querySelector('.xia');

    moment.locale('zh-cn');
    date = moment()
    function nowTime() {
        topTime.innerHTML = moment().format("LTS");
    }
    topDay.innerHTML = moment().format("LL")
    nowTime();
    setInterval(nowTime, 1000);

    var week = moment.weekdaysMin(true)
    week.forEach(function (index) {
        boCent.innerHTML += '<span>' + index + '</span>'
    })

    function lastMonthDay(data) {
        return data.startOf('month').weekday();
    }
    function nowMonthDay(data) {
        return data.daysInMonth();
    }
    var today = moment();
 
    State(today);
    function State(data) {
        var friMonth = nowMonthDay(data.clone().subtract(1, 'month'));
        var nowLast = nowMonthDay(data);
        var nowFrist = lastMonthDay(data.clone());
        var nextMonth = 0;
        var str = '';
        for (var i = 0; i < 42; i++) {
            if (i < nowFrist) {
                str =
                    '<li class="color">' +
                    '<span>' + friMonth + ' </span>' +
                    '<span>' + getNong(data.year(),data.month(), nowLast) + '</span>' +
                    '</li>' + str;
                friMonth--;
            } else if (i >= (nowLast + nowFrist)) {
                nextMonth++;
                str +=
                    '<li class="color">' +
                    '<span>' + nextMonth + ' </span>' +
                    '<span>' + getNong(data.year(),data.month() + 2 , nextMonth) + '</span>' +
                    '</li>'
            }else{
                var cr = data.date() == i - nowFrist + 1 ? 'active' : '';
              if( data.year() != moment().year() || data.month() != moment().month()){
                var cr = ""
              }
                str += 
                '<li class = " ' + cr +  '">' +
                    '<span>' + (i - nowFrist + 1) + ' </span>' +
                    '<span>' + getNong(data.year(),data.month() + 1,(i - nowFrist + 1)) + '</span>' +
                    '</li>'
            }
        }
        boCont.innerHTML = str;
        nowDay.innerHTML = data.format('YYYY年MMM')
    }
shang.onclick = function(){
    State(today.subtract(1,"month"))
}
xia.onclick = function(){
    State(today.add(1,"month"))
}

console.log(window.calendar.solar2lunar(2020,4,5))
function getNong(year, month, date){
    var dayCn = window.calendar.solar2lunar(year,month,date);
    var result = '';
    if(dayCn.IDaycn){
        result = dayCn.IMonthCn;
    }else if(dayCn.Term){
        result = dayCn.Term;
    }else if(dayCn.festival){
        result = dayCn.festival;
    }else if(dayCn.lunarFestival){
        result = dayCn.lunarFestival;
    }else{
        result = dayCn.IDayCn;
    }
    return result;
}
}())
