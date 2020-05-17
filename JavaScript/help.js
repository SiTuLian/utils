"use strict";

/**
 *
 * @param {Number} border 随机数的范围，默认为10
 * @param {Boolean} float  随机数是否取整，默认为true
 * @returns {Number} 随机数的结果
 */
export function random(border = 10, float = false) {
  let randomNum = Math.random() * border;
  // Math.trunc 返回整数部分
  return float ? randomNum : Math.trunc(randomNum);
}

/**
 * 数组去重
 * @param {Array} arr  传入的数组
 * @returns {Array} 去除重复的元素的新数组
 */
export function removeRepetition(arr = []){

  let removeRepetitionArr = Array.from(new Set(arr));
  return removeRepetitionArr;
}

/**
 * 检查手机号码
 * @param {String | Number} phoneNumber 手机号码
 * @returns {Boolean} 如果是手机号码，返回true，否则返回false
 */
export function checkPhoneNumber(phoneNumber){
  phoneNumber = type === 'number' ? phoneNumber.toString() : phoneNumber;

  if(/^1[3456789]\d{9}$/.test(phoneNumber)){
    return true;
  }else{
    return false;
  }
}

/**
 * 检查邮箱
 * @param {String} email 邮箱
 * @returns {Boolean} 如果是邮箱，返回true，否则返回false
 */
export function checkEmail(email){

  if(/^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\.){1,4}[a-z]{2,4}$/.test(email)){
    return true
  }else{
    return false
  }
  
}

/**
 * 获取当前时间的年份、月份、日期、小时、分钟和秒数
 * @returns 返回包含当前时间的年份、月份、日期、小时、分钟和秒数的对象
 */
export function getCurrentTime(){
  const time = {};
  const date = new Date();

  time.year = date.getFullYear();
  time.month = date.getMonth() + 1;
  time.day = date.getDate();

  switch(date.getDay()){
    case 0:
      time.week = '星期日';
      break;
    case 1:
      time.week = '星期一';
      break;
    case 2:
      time.week = '星期二';
      break;
    case 3:
      time.week = '星期三';
      break;
    case 4:
      time.week = '星期四';
      break;
    case 5:
      time.week = '星期五';
      break;
    case 6:
      time.week = '星期六';
      break;
  }

  time.Hours = date.getHours();
  time.Minutes = date.getMinutes();
  time.Seconds = date.getSeconds();

  return time;
}

/**
 * 中间加密的手机号码
 * @param {Number} phonestr 手机号码
 * @returns {String} 加密的手机号码
 */
export function phoneEncryption(phone){

  let phonestr = phone + '';

  if(phonestr.length !== 11){
    throw '手机号码不正确，必须为11位的整数'
  }else{
    phonestr = phonestr.substring(0,3)+" **** "+phonestr.substring(7,11);
  }

  return phonestr;

}

/**
 * 
 * @param {String} password 8~16位密码
 * @returns {Boolean} 匹配成功返回true，否则返回false
 */
export function checkPassword(password){
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

  return reg.test(password)
}

/**
 * @param {String} identity 身份证
 * @returns {Boolean} 匹配成功返回true，否则返回false
 */
export function checkIdentity(identity){
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

  return reg.test(identity)

}

/**
 * @param {String} qq qq号码
 * @returns {Boolean} 匹配成功返回true，否则返回false
 */
export function checkQQ(qq){
  
  const reg = /[1-9][0-9]{4,}/;

  return reg.test(qq);

}

/**
 *  
 * @param {String} userAgent 获取平台设备
 * @returns {Object} 返回平台对象
 */
export function checkPlatformEquipment(userAgent){
  //navigator.userAgent
  const isWechat = /micromessenger/i.test(userAgent),
  isWeibo = /weibo/i.test(userAgent),
  isQQ = /qq\//i.test(userAgent),
  isIOS = /(iphone|ipod|ipad|ios)/i.test(userAgent),
  isAndroid = /android/i.test(userAgent);

  return {
    isWechat,
    isWeibo,
    isQQ,
    isIOS,
    isAndroid
  }
}

/**
 * 
 * @param {Number} num 数值
 * @returns {String} 加0的字符串数值
 */
export function prefix_zero(num) {
  return num >= 10 ? num : "0" + num;
}


/**
 * 
 * @param {Object} xss 
 */
export function defenseXSS(xss) {
  let e = {
      '"': '&quot;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
  }
  return xss.replace(/["<>&]/g, m => {
      return e[m]
  })
}

//转码
export function encodeUnicode(str) {
  var res = [];
  for ( let i=0; i<str.length; i++ ) {
  res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
    }
    return "\\u" + res.join("\\u");
}

// 解码
export function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}

//微信云开发，服务端时间啊时间格式化
export function format(dateSeparator = '-', timeSeparator = ':'){
  let fmt = `yyyy${dateSeparator}MM${dateSeparator}dd hh${timeSeparator}mm${timeSeparator}ss`;
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, date.getFullYear());
  }

  for(let k in o){
    if(new RegExp('(' + k + ')').test(fmt)){
      fmt = fmt.replace(RegExp.$1, o[k].toString().length === 1 ? '0' + o[k] : o[k]);
    }
  }

  return fmt;
}

// 函数防抖  触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
export function debounce(fn, wait) {
  let timer = null;
  return function() {
       
    if (timer){
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

//函数节流 连续触发事件但是在 n 秒中只执行一次函数
export function throttle(fn, wait){
  let canRun = true;
  return function() {
    if(!canRun){
      return ;
    }
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, wait)
  }
}

//设置CSS变量
export function setCSS(key, val){
  document.documentElement.style.setProperty(key, val);
}

//获取CSS变量
export function getCSS(key){
  let styles = getComputedStyle(document.documentElement);
  let value = String(styles.getPropertyValue(key)).trim();
  return value
}
