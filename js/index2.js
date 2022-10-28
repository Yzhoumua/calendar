(function () {
    var topTime = document.querySelector('.topTime');
    var topDay = document.querySelector('.topDay');
    var boCent = document.querySelector('.boCent');
    var boCont = document.querySelector('.boCont');
    var nowMonth = document.querySelector('.boTop .lf');
    var shang = document.querySelector('.shang');
    var xia = document.querySelector('.xia');

    moment.locale('zh-cn');
    function nowTime() {
        topTime.innerHTML = moment().format('LTS');
    }
    topDay.innerHTML = moment().format("YYYY年MMMDD日")  + nongBian(moment().year(),moment().month() + 1,moment().date());
    nowTime();
    setInterval(nowTime, 1000);
    //遍历星期
    var nowWeek = moment.weekdaysMin(true);
    nowWeek.forEach(function (index) {
        boCent.innerHTML += '<span>' + index + '</span>';
    })

    function nowMonthDay(data) {
        return data.daysInMonth();
    }
    function upMonthDay(data) {
        return data.startOf('month').weekday();
    }
    // 遍历日历
    var today = moment();
    State(today);
    function State(data) {
        var upMonDay = nowMonthDay(data.clone().subtract(1,'month'))
        var nowMonDaycont = nowMonthDay(data);
        var nowFristWeekDay = upMonthDay(data.clone());
        var lastMonDay = 0;
        var str = ''
        
        for (var i = 0; i < 42; i++) {
            if (i < nowFristWeekDay) {
            
                str = 
                    '<li class="color">' +
                        '<span> ' + upMonDay + '</span>' +
                        '<span> ' + nongBian(data.year(),data.month(), upMonDay) + '</span>' +
                    '</li>' + str;
                    upMonDay --;
            }else if(i >= (nowMonDaycont + nowFristWeekDay)){
                lastMonDay++;
                str +=
                    '<li class="color">' +
                        '<span> ' + lastMonDay + '</span>' +
                        '<span>' + nongBian(data.year(),data.month() + 2,lastMonDay) +'</span>' +
                    '</li>';
            }else{
                var cr = data.date() == (i - nowFristWeekDay + 1) ? "active" : "";
                if(moment().year() != data.year() || moment().month() != data.month()){
                    cr = '';
                }
                
                str +=
                    '<li class = "'  + cr + '">' +
                        '<span> ' + (i - nowFristWeekDay + 1) + '</span>' +
                        '<span>' +  nongBian(data.year(),data.month() + 1,i - nowFristWeekDay + 1) +'</span>' +
                    '</li>';
            }
        }
        boCont.innerHTML = str;
        nowMonth.innerHTML = data.format('YYYY年MMM')
    }
    shang.onclick = function(){
        State(today.subtract(1,'month'));
    }
    xia.onclick = function(){
        State(today.add(1,'month'))
    }
    // 农历遍历
    function nongBian(year,month,day){
        var result = '';
        var dayCn = window.calendar.solar2lunar(year,month,day);
        if(dayCn.IDayCn == '初一'){
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