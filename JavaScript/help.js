"use strict";

class Utils {
    /**
     *
     * @param {Number} border 随机数的范围，默认为10
     * @param {Boolean} float  随机数是否取整，默认为true
     * @returns {Number} 随机数的结果
     */
    random(border = 10, float = false) {
        let randomNum = Math.random() * border;
        // Math.trunc 返回整数部分
        return float ? randomNum : Math.trunc(randomNum);
    }

    /**
     * 判断一个变量的数据类型
     * @param {} item 传入的任意变量
     * @returns {string} 返回变量的数据类型
     */
    judgeType(item){
      let type = typeof item;

      //判断元素是否为数组
      if(type === 'object'){

        if(Array.isArray(item)){
          type = 'array';
        }else if(item == undefined){
          type = 'null';
        }else{
          const temp = item.toString();
          if(temp[0] === '/'){
            type = 'regexp';
          }
        }
        
      }

      return type;
    }


    /**
     * 判断数组的元素的数据类型
     * @param {Array} arr 传入的数组
     * @returns {Array} 返回与参数数组元素的数据类型，仅限一维数组的，不计算数组里的数组
     */
    judgeElementType(arr = []){

      try{
        if(!Array.isArray(arr)){
          throw 'judgeElementType()，传入的参数不能是非数组'
        }

        let typeArray = [];

        for(let item of arr){

          let type = this.judgeType(item)
          
          typeArray.push(type)

        }

        return typeArray;

      }catch(err){
        console.error(err)
      }
      
    }

    /**
     * 数组去重
     * @param {Array} arr  传入的数组
     * @returns {Array} 去除重复的元素的新数组
     */
    removeRepetition(arr = []){

      try{

        if(!Array.isArray(arr)){
          throw '传入的参数不能是非数组'
        }

        let removeRepetitionArr = Array.from(new Set(arr));

        return removeRepetitionArr;

      }catch(err){
        console.error(err)
      }
      
    }

    /**
     * 检查手机号码
     * @param {String | Number} phoneNumber 手机号码
     * @returns {Boolean} 如果是手机号码，返回true，否则返回false
     */
    checkPhoneNumber(phoneNumber){
      try{
        const type = this.judgeType(phoneNumber)
        if(type !== 'number' && type !== 'string'){
          throw '参数类型错误，必须为数值或字符串类型'
        }
        
        phoneNumber = type === 'number' ? phoneNumber.toString() : phoneNumber;

        if(/^1[3456789]\d{9}$/.test(phoneNumber)){
          return true;
        }else{
          return false;
        }

      }catch(err){
        console.error(err)
      }
    }

    /**
     * 检查邮箱
     * @param {String} email 邮箱
     * @returns {Boolean} 如果是邮箱，返回true，否则返回false
     */
    checkEmail(email){

      try{

        if(this.judgeType(email) !== 'string'){
          throw '参数类型错误，必须为字符串'
        }
        if(/^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\.){1,4}[a-z]{2,4}$/.test(email)){
          return true
        }else{
          return false
        }

      }catch(err){
        console.error(err)
      }
      
    }

    /**
     * 获取当前时间的年份、月份、日期、小时、分钟和秒数
     * @returns 返回包含当前时间的年份、月份、日期、小时、分钟和秒数的对象
     */
    getCurrentTime(){
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
     * 判断数值是整数或浮点数
     * @param {Number} number 数值
     * @returns {String} 若参数是整数则返回int，否则返回float
     */
    judegNumberType(number){
      try{
        if(this.judgeType(number) !== 'number'){
          throw '参数必须为数值'
        }

        return number.toString().includes('.') ? 'float' : 'int';


      }catch(err){
        console.error(err)
      }
    }

    /**
     * 中间加密的手机号码
     * @param {Number} phonestr 手机号码
     * @returns {String} 加密的手机号码
     */
    phoneEncryption(phone){

      try{
        if(this.judgeType(phone) !== 'number'){
          throw '手机号码不正确，必须为11位的整数'
        }
        if(this.judegNumberType(phone) === 'float'){
          throw '手机号码不正确，必须为11位的整数'
        }
        let phonestr = phone + '';

        if(phonestr.length !== 11){
          throw '手机号码不正确，必须为11位的整数'
        }else{
          phonestr = phonestr.substring(0,3)+" **** "+phonestr.substring(7,11);
        }

        return phonestr;

      }catch(err){
        console.error(err)
      }
    
    
    }

    /**
     * 
     * @param {String} password 8~16位密码
     * @returns {Boolean} 匹配成功返回true，否则返回false
     */
    checkPassword(password){
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

      return reg.test(password)
    }

    /**
     * @param {String} identity 身份证
     * @returns {Boolean} 匹配成功返回true，否则返回false
     */
    checkIdentity(identity){
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

      return reg.test(identity)

    }

    /**
     * @param {String} qq qq号码
     * @returns {Boolean} 匹配成功返回true，否则返回false
     */
    checkQQ(qq){
      
      const reg = /[1-9][0-9]{4,}/;

      return reg.test(qq);

    }

    /**
     *  
     * @param {String} userAgent 获取平台设备
     * @returns {Object} 返回平台对象
     */
    checkPlatformEquipment(userAgent){
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
    prefix_zero(num) {
      return num >= 10 ? num : "0" + num;
    }

    
    /**
     * 
     * @param {Object} xss 
     */
    defenseXSS(xss) {
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
}


module.exports = {
  Utils
}





