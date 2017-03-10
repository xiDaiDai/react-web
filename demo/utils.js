import FastClick from 'fastclick'; //引入快速点击
/*
 * 配置对象
 * @type {Object}
 */
var config = {
   baseHash: '#!',
   pageSize: 10,
   alertTime: '2000', //alert消失的时间
 }
 /**
  * 字符串帮助类
  */
class strUtil {
 /*
  * 判断字符串是否为空
  * @param str 传入的字符串
  * @returns {Boolean}
  */
 static isEmpty = (str) => {
   if (str == null || typeof(str) == 'undefined' || (str == '' && typeof(str) !=
       'number')) {
     return true;
   } else {
     return false;
   }
 }

 /**
  * 是否包含str
  * @param  {[type]} str1 [description]
  * @param  {[type]} str1 [description]
  * @return {[type]}     [description]
  */
 static hasStr = (str1, str2) => {
   let index = str1.indexOf(str2);
   if (index > -1) {
     return true;
   } else {
     return false;
   }
 }

 /*
  * 忽略大小写判断字符串是否相同
  * @param str1
  * @param str2
  * @returns {Boolean}
  */
 static isEqualsIgnorecase = (str1, str2) => {
   if (str1.toUpperCase() == str2.toUpperCase()) {
     return true;
   } else {
     return false;
   }
 }

 /**
  * 判断是否是数字
  * @param value
  * @returns {Boolean}
  */
 static isNum = (str) => {
   if (!isNaN(str)) {
     return true;
   } else {
     return false;
   }
 }

 /**
  * 判断是否是中文
  * @param str
  * @returns {Boolean}
  */
 static isChina = (str) => {
   var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
   if (reg.test(str)) {
     return false;
   }
   return true;
 }

 /**
  * 字符串反转
  * @param str
  * @returns {str}
  */
 static reverse = (str) => {
   return str.split("").reverse().join("");
 }

 /**
  * 测试是否是整数
  * @param str
  * @returns {str}
  */
 static isInt = (str) => {
   if (str == "NaN")
     return false;
   return str == parseInt(str).toString();
 }

 /**
  * 数组是否包含元素
  */
 static arrayIndexOf = (arr = [], str) => {
   let index = arr.indexOf(str)
   if (index > -1) {
     return true;
   } else {
     return false;
   }
 }

 /**
  * 除去左边空白
  * @param str
  * @returns {str}
  */
 static lTrim = (str) => {
   return str.replace(/(^\s*)/g, "");
 }


 /**
  * 除去右边空白
  * @param str
  * @returns {str}
  */
 static rTrim = (str) => {
   return str.replace(/(\s*$)/g, "");
 }


 /**
  * 除去两边空白
  * @param str
  * @returns {str}
  */
 static trim = (str) => {
   return str.replace(/(^\s*)|(\s*$)/g, "");
 }

 /**
  * Json转换成字符串
  * @param json
  * @returns {str}
  */
 static json2str = (str) => {
   if (!strUtil.isEmpty(str)) return JSON.parse(str);
 }

 /**
  * 字符串转换成Json
  * @param str
  * @returns {json}
  */
 static str2json = (str) => {
   return JSON.stringify(str);
 }

 /**
  * 截取小数点,四舍五入
  */
 static toFixed(str, number) {
   return parseFloat(str).toFixed(number);
 }

 /**
  * 截取小数点,不进行四舍五入
  */
 static toDecimal(str, number) {
   let a = '1';
   for (let i = 0; i < number; i++) {
     a += '0';
   }
   let s = Math.floor(parseFloat(str) * a) / a;
   return s;
 }


 /**
  * 字符串-获取以ASCII编码字节数 英文占1字节 中文占2字节
  * @param str
  * @returns {json}
  */
 static lenASCII = (str) => {
   return str.replace(/[^\x00-\xff]/g, 'xx').length; //将所有非\x00-\xff字符换为xx两个字符,再计算字符串
 }

 /**
  * 格式化百分比
  * @param str
  * @returns {str}
  */
 static formatPercent = (str) => {
   let reg = /\%/g;
   str = str.toString().replace(reg, '');
   return str;
 }

 /**
  * 格式化千分位
  * @param str
  * @returns {str}
  */
 static formatKilo = (str) => {
   str = str.toString();
   if (/[^0-9\.]/.test(str)) return "invalid value";
   str = str.replace(/^(\d*)$/, "$1.");
   str = str.replace(/(\d*\.\d\d)\d*/, "$1");
   str = str.replace(".", ",");
   var re = /(\d)(\d{3},)/;
   while (re.test(str))
     str = str.replace(re, "$1,$2");
   str = str.replace(/.(\d*)$/, ".$1");
   str = str.substr(str.length - 1, 1) == '.' ? str.substring(0, str.length -
     1) : str;
   if (!(/\./.test(str))) {
     str += '.00';
   }
   return str.replace(/^\./, "0.");
 }


 //获取唯一机器码
 static getGuid = () => {
   return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0,
       v = c == 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
   });
 }


 /**
  * 格式化字符串
  * @param  {[type]} str [description]
  *
  * @param  {[type]} type[格式化的类型 name telephone identity]
  * @param  {[type]} punctuation [用来格式化的符号]
  * @return {[type]} [description]
  */
 static formatStr = (str, type = 'name', punctuation = '*') => {
   str = str.split('');
   var newStr = [];
   for (var i = 0; i < str.length; i++) {
     if (type == 'name') {
       if (i == 0) {
         newStr.push(str[i]);
       } else {
         newStr.push(punctuation);
       }
     } else if (type == 'telephone') {
       if (i > 2 && i < 7) {
         newStr.push(punctuation);
       } else {
         newStr.push(str[i]);
       }
     } else if (type == 'identity') {
       if (i > 5 && i < 14) {
         newStr.push(punctuation);
       } else {
         newStr.push(str[i]);
       }
     }

   }
   return newStr.join('');
 }

 //清除Html标签文本
 static clearHtml = (str) => {
   var reg = /<[^<>]+>/g;
   return str.replace(reg, '');
 }


 /*
  * author toni
  * 金钱取万,如果小于万就返回对应金额加上元,大于万就四舍五入到万加上万
  */
 static formatMiriade = (money) => {
   var money = parseFloat(money);
   var str;
   if (money >= 10000) {
     str = (money / 10000).toFixed() + '万';
   } else {
     str = money + '元';
   }
   return str;
 }

 /**
  * 累投金额格式化,取出亿和万
  */
 static formatMoney = (str) => {
   let reg = /\,/g;
   let number = parseFloat(str.replace(reg, ''));
   let Num = new Object();
   Num.hundredMillion = Math.floor(number / 100000000); //获取亿
   Num.kiloMillion = Math.floor(number % 100000000 / 10000); //获取万
   return Num;
 }

 /**
  * 平台人数格式化,取出万和单个
  */
 static formatPerson = (str) => {
   let reg = /\,/g;
   let number = parseFloat(str.toString().replace(reg, ''));
   let Num = new Object();
   Num.million = Math.floor(number / 10000); //获取万
   Num.single = Math.floor(number % 10000); //获取单个
   return Num;
 }

 /**
  *格式化数据
  */
 static formatData = (obj,prop) => {
   let s='';
   try{
     s=obj[prop];
   }catch(error){
     s='';
   }
   return s;
 }

}

/**
 * 时间帮助类
 */
class dateUtil {
 /**
  * 获取当前时间
  * @return {[type]} [description]
  */
 static getTime = (time) => {
   if (strUtil.isEmpty(time)) {
     return new Date();
   } else {
     time = time.replace(/-/g, "/");
     time = time.replace(/\.\d/g, "");
     return new Date(time);
   }

 }

 /**
  * 获取年份 如2015
  * @return {[type]} [description]
  */
 static getFullYear = (time) => {
   return dateUtil.getTime(time).getFullYear();
 }

 /**
  * 获取年份 如115
  * @return {[type]} [description]
  */
 static getYear = (time) => {
   return dateUtil.getTime(time).getYear();
 }

 /**
  * 获取月份 返回0-11 0表示一月 11表示十二月
  */
 static getMonth = (time) => {
   return dateUtil.getTime(time).getMonth();
 }

 /**
  * 获取星期几  返回的是0-6的数字，0 表示星期天
  * @return {[type]} [description]
  */
 static getWeek = (time) => {
   return dateUtil.getTime(time).getDay();
 }

 /**
  * 获取当天日期
  * @return {[type]} [description]
  */
 static getDate = (time) => {
   return dateUtil.getTime(time).getDate();
 }

 /**
  * 获取小时数
  */
 static getHours = (time) => {
   return dateUtil.getTime(time).getHours();
 }

 /**
  * 获取分钟数
  */
 static getMinutes = (time) => {
   return dateUtil.getTime(time).getMinutes();
 }

 /**
  * 获取秒数
  */
 static getSeconds = (time) => {
   return dateUtil.getTime(time).getSeconds(); //获取秒数
 }

 /**
  * 获取当前日期：
  * formatStr：可选，格式字符串，默认格式：yyyy-MM-dd hh:mm:ss
  * 约定如下格式：
  * （1）YYYY/yyyy/YY/yy 表示年份
  * （2）MM/M 月份
  * （3）W/w 星期
  * （4）dd/DD/d/D 日期
  * （5）hh/HH/h/H 时间
  * （6）mm/m 分钟
  * （7）ss/SS/s/S 秒
  * （8）iii 毫秒
  */

 static formatDate = (formatStr, time) => {
   var str = formatStr;
   if (!formatStr) {
     str = "yyyy-MM-dd hh:mm:ss"; //默认格式
   }
   var Week = ['日', '一', '二', '三', '四', '五', '六'];
   str = str.replace(/yyyy|YYYY/, dateUtil.getFullYear(time));
   str = str.replace(/yy|YY/, (dateUtil.getYear(time) % 100) > 9 ? (dateUtil
     .getYear(time) % 100).toString() : '0' + (dateUtil.getYear(time) % 100));
   str = str.replace(/MM/, dateUtil.getMonth(time) >= 9 ? (parseInt(dateUtil
     .getMonth(time)) + 1).toString() : '0' + (parseInt(dateUtil.getMonth(
     time)) + 1));
   str = str.replace(/M/g, (parseInt(dateUtil.getMonth(time)) + 1));
   str = str.replace(/w|W/g, Week[dateUtil.getWeek(time)]);
   str = str.replace(/dd|DD/, dateUtil.getDate(time) > 9 ? dateUtil.getDate(
     time).toString() : '0' + dateUtil.getDate(time));
   str = str.replace(/d|D/g, dateUtil.getDate(time));
   str = str.replace(/hh|HH/, dateUtil.getHours(time) > 9 ? dateUtil.getHours(
     time).toString() : '0' + dateUtil.getHours(time));
   str = str.replace(/h|H/g, dateUtil.getHours(time));
   str = str.replace(/mm/, dateUtil.getMinutes(time) > 9 ? dateUtil.getMinutes(
     time).toString() : '0' + dateUtil.getMinutes(time));
   str = str.replace(/m/g, dateUtil.getMinutes(time));
   str = str.replace(/ss|SS/, dateUtil.getSeconds(time) > 9 ? dateUtil.getSeconds(
     time).toString() : '0' + dateUtil.getSeconds(time));
   str = str.replace(/s|S/g, dateUtil.getSeconds(time));
   str = str.replace(/iii/g, dateUtil.millSecond < 10 ? '00' + dateUtil.millSecond :
     (dateUtil.millSecond < 100 ? '0' + dateUtil.millSecond : dateUtil.millSecond)
   );
   return str;
 }

 /**
  * 判断闰年 ：一般规律为：四年一闰，百年不闰，四百年再闰。
  */
 static isLeapYear = (str) => {
   return (str % 4 == 0 && ((str != 0) || (str % 400 == 0)));
 }
}

/**
 * navigator帮助类
 */
class navigatorUtil {
 /**
  * 头部信息
  * @type {[type]}
  */
 static userAgent = navigator.userAgent;

 /**
  * 是否为ipad
  */
 static isIPad = () => {
   return (navigatorUtil.userAgent.indexOf("iPad") > -1);
 }

 /**
  * 是否为iphone
  * @param  {[type]}  userAgent [description]
  * @return {Boolean}           [description]
  */
 static isIPhone = () => {
   return (navigatorUtil.userAgent.indexOf("iPhone") > -1);
 }

 /**
  * 是否为ios系统
  * @param  {[type]}  userAgent [description]
  * @return {Boolean}           [description]
  */

 static isIOS = () => {
   return navigatorUtil.isIPad(navigatorUtil.userAgent) || navigatorUtil.isIPhone(
     navigatorUtil.userAgent);
 }

 /**
  * 是否为Android系统
  * @param  {[type]}  userAgent [description]
  * @return {Boolean}           [description]
  */
 static isAndroid = () => {
   return (navigatorUtil.userAgent.indexOf("Android") > -1) ||
     (navigatorUtil.userAgent.indexOf("Linux") > -1);
 }

 /**
  * 判断是否为微信
  */
 static isWeixin = () => {
   return (navigatorUtil.userAgent.indexOf("MicroMessenger") > -1);
 }
}

/**
 * 数据帮助类
 */
class dataUtil {
 /**
  * [获取数据方法]
  * @param  {[type]} url         [访问接口地址]
  * @param  {[type]} method      [get post]
  * @param  {[type]} param       [传递过去的参数 字符串格式 如 "clientType='M'&userName='小钱'"]
  * @param  {[type]} successCall [成功回调函数]
  * @param  {[type]} errorCall   [错误回调函数]
  * @return {[type]}             [description]
  */
 static getData = (info, url, method = 'post', param, successCall=()=>{}, errorCall=()=>{}) => {
     let obj={ clientType: 'M'};
     let param2 = Object.assign(obj,param);
     var setting = {
         url: config.baseUrl + url, //默认ajax请求地址
         type: method, //请求的方式
         data: param2, //发给服务器的数据
     };
     //请求成功执行方法
     setting.success = (res,xhr)=>{
       dataUtil.successCall(res,xhr,info,successCall);
     }
     //请求失败执行方法
     setting.error = (xhr)=>{
       dataUtil.errorCall(xhr,info,errorCall);
     }
     return dataUtil.ajax(setting);
 }
 /**
  * 发送ajax请求和服务器交互
  * @param {object} mySetting 配置ajax的配置
  */
 static ajax = (mySetting)=>{
   var setting = {
       url: window.location.pathname, //默认ajax请求地址
       async: true, //true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
       type: 'GET', //请求的方式
       data: {}, //发给服务器的数据
       dataType: 'json',
       success: function (text) { }, //请求成功执行方法
       error: function () { }, //错误回调
   };


   var aData = []; //存储数据
   var sData = ''; //拼接数据
   Object.assign(setting,mySetting);//属性覆盖
   for (var attr in setting.data) {
       aData.push(attr + '=' + filter(setting.data[attr]));
   }
   sData = aData.join('&');
   setting.type = setting.type.toUpperCase();

   var xhr = new XMLHttpRequest();
   try {
       if (setting.type == 'GET') { //get方式请求
           sData = setting.url + '?' + sData;
           xhr.open(setting.type, sData + '&' + new Date().getTime(), setting.async);
           xhr.send();
       } else { //post方式请求
           xhr.open(setting.type, setting.url, setting.async);
           xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
           xhr.send(sData);
       }
   } catch (e) {
       return httpEnd();
   }

   if (setting.async) {
       xhr.addEventListener('readystatechange', httpEnd, false);
   } else {
       httpEnd();
   }

   function httpEnd() {
       if (xhr.readyState == 4) {
           var head = xhr.getAllResponseHeaders();
           var response = xhr.responseText;
           //将服务器返回的数据，转换成json

           if (/application\/json/.test(head) || setting.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
               response = JSON.parse(response);
           }
           if (xhr.status == 200) {
              setting.success(response,xhr);
           } else {
               setting.error(xhr);
           }
       }
   }
   xhr.end = function () {
       xhr.removeEventListener('readystatechange', httpEnd, false);
   }

   function filter(str) { //特殊字符转义
       str += ''; //隐式转换
       str = str.replace(/%/g, '%25');
       str = str.replace(/\+/g, '%2B');
       str = str.replace(/ /g, '%20');
       str = str.replace(/\//g, '%2F');
       str = str.replace(/\?/g, '%3F');
       str = str.replace(/&/g, '%26');
       str = str.replace(/\=/g, '%3D');
       str = str.replace(/#/g, '%23');
       return str;
   }
   return xhr;
 }
 //成功回调
 static successCall = (res,xhr,info,successCall) => {
   info.state.loadAnimation = false;//loading状态
   //返回code正确的情况
   if(strUtil.formatData(res,'code')=='0'||strUtil.formatData(res,'data')!=''){
     successCall(res,xhr);
   }else{
     info.state.alertShow = true;//提示框状态
     info.state.alertMsg = strUtil.formatData(res,'reason');//提示框文字
   }
   info.setState(info.state);

 }
 //失败回调
 static errorCall = (xhr,info,errorCall) => {
   if (xhr.status == 404) {
       info.state.alertMsg = '接口不存在';
   } else {
       info.state.alertMsg = '接口请求失败';
   }
   info.state.loadAnimation = false;//loading状态
   info.state.alertShow = true;//提示框状态
   info.setState(info.state);
 }
}



/**
 * 业务帮助类
 */
class bussinessUtil {
 /**
  * 适配屏幕方法
  * @return {[type]} [description]
  */
 static configScreen = () => {
   let width = document.body.clientWidth;
   let point = width / 18.75; //按照375屏幕为基础
   //当屏幕为ipad时候
   if (width == 768) {
     point = 32;
   }
   document.querySelectorAll("html")[0].style.fontSize = point + "px";
   //图片懒加载
   let offset=-80;
   let store=[];//懒加载图片集合
   //获取懒加载图片集合
   let lazy = document.querySelectorAll('.lazy');
   for(let i =0;i<lazy.length;i++){
     store.push(lazy[i]);
   }
   loadImg();
   if ('addEventListener' in document) {
     document.addEventListener('DOMContentLoaded', function() {
       FastClick.attach(document.body);
     }, false);
     window.addEventListener('scroll',()=>{loadImg()},false);
   }
   function loadImg() {
      for (var i=store.length-1;i>=0;i--) {
            let className = store[i].getAttribute('class');
            store[i].setAttribute('class', className+' animation-opacity');
            var coords=store[i].getBoundingClientRect();
            if(coords.top>=0&&coords.left>=0&&coords.top<=((window.innerHeight||document.documentElement.clientHeight)+parseInt(offset)))
            {
                var src = store[i].getAttribute('data-src');
                store[i].setAttribute('src',src);
                // store[i].style.background='url('+src+') 50% no-repeat';
                store.splice(i,1);
            }
      }
   }
 }

 //设置标题
 static setTitle = (str) => {
    document.title = str;
    var i = document.createElement('iframe');
    i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
      setTimeout(function(){
        i.remove();
      }, 9)
    }
    document.body.appendChild(i);
  }

}



export {config,strUtil,dateUtil,
  navigatorUtil,dataUtil,bussinessUtil}
