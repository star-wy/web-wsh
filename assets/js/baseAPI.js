// 每次使用都会先调用这个函数
// 统一添加前缀

$.ajaxPrefilter(function (options) {
    options.url ='http://www.liulongbin.top:3007'+options.url
   // 统一添加请求头
   
   if (options.url.indexOf('/my/')!=-1){
    options.headers={Authorization: localStorage.getItem('tolen') || ''}
   }
   options.complete=function (res) {
    if (res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
        localStorage.removeItem('tolen')
        location.href='/login.html'
    }

   }
   
    

})


