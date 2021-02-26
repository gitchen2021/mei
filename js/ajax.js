// 参数：
// url：接口地址
// type：请求的方式
// data：请求才需要的方式
// async：设置请求是同步还是异步
// callback回调函数：请求成功时获取数据进行处理
function ajax(option) {
    // 先分析 哪些参数时必填 或者哪些参数时可以写默认值
    // 【1】url 请求的接口地址，必填项
    if (!option.url) {
        // 当url地址不存在的时候 抛出一个错误，告诉用户 url地址必填项
        // 手动抛出错误 
        throw new Error('url的地址为必填项');
    }
    let parame = {
        url: option.url,
        type: option.type || 'get',
        data: option.data || '',
        // 如果没有传递参数的时候 这个属性的属性值为 undefined
        // option.async == undefined 为true说明没有传递参数 给默认值为true
        async: option.async == undefined ? true : option.async,
        callback: option.callback,
        error: option.error
    }
    // 【4】判断请求方式 是否是正确的，只能有get 和post请求
    if (!(parame.type == 'get' || parame.type == 'post')) {
        throw new Error('type的值暂时只支持get和post请求');
    }
    //   console.log(Object.prototype.toString.call(parame.data));//  [object String]
    // 【5】参数可以为对象 也可以为字符串
    if (!(Object.prototype.toString.call(parame.data) == '[object Object]' || Object.prototype.toString.call(parame.data) == '[object String]')) {
        throw new Error('data参数的数据类型只能为对象和字符串');
    }


    // includes() 方法用于判断字符串是否包含指定的子字符串。

    // 如果找到匹配的字符串则返回 true，否则返回 false。

    // 注意： includes() 方法区分大小写。
    // '' ==> false 
    // 【6】如果参数为字符串的时候,判断是否有= 
    if (parame.data && Object.prototype.toString.call(parame.data) == '[object String]' && !parame.data.includes('=')) {
        throw new Error('data的格式不对，字符串的时候必须key=value的格式')
    }

    // 【7】如果参数为对象的时候 {name:'aa',age:18}
    // 需要把对象处理为 'name=aa&age=18'
    if (Object.prototype.toString.call(parame.data) == '[object Object]') {
        let str = '';

        for (let key in parame.data) {
            // console.log(key);      //name  age
            // console.log(parame.data[key]);  //aaa 18
            str += `${key}=${parame.data[key]}&`
        }
        // console.log(str);   name=aaa&age=18&
        // 把最后一个&符号截取，并且在赋值给parame.data
        parame.data = str.substr(0, str.length - 1); //name=aaa&age=18

    }

    // 【8】callback 的数据类型一定要为Function
    if (!(Object.prototype.toString.call(parame.callback) == '[object Function]')) {
        throw new Error('callback的数据类型必须函数');
    }

    // 【9】async参数的判断，值只能为布尔值boolean
    if (!(Object.prototype.toString.call(parame.async) == '[object Boolean]')) {
        throw new Error('async的取值只能为布尔值');
    }

    try {
        // 创建ajax的对象
        let xhr = new XMLHttpRequest();
        if (parame.type == 'get') {
            xhr.open(parame.type, parame.url + '?' + parame.data, parame.async);
            xhr.send();
        } else {
            // 表示post请求
            xhr.open(parame.type, parame.url, parame.async);
            //    // 设置请求头
            xhr.setRequestHeader('Content-Type', 'application/X-www-form-urlencoded');
            xhr.send(parame.data);
        }
        // 获取响应体
        // 根据async 来判断怎么去获取
        // 如果是同步 直接 xhr.responseText
        // 如果是异步就需要 load事件 或者readystatechange
        if (!parame.async) {
            parame.callback(xhr.responseText);
            return
        }
        xhr.onload = function () {
            // 异步请求响应体得获取
            parame.callback(xhr.responseText);
        }
    } catch (err) {
        parame.error(err);
    }
}


function pAjax(p){
  return new Promise((resolve,reject)=>{
      ajax({
          url:p.url,
          type:p.type,
          data:p.data,
          async:p.async,
          callback:function(res){
              resolve(res);
          },
          error:function(err){
              reject(err);
          }
      })
  })
}