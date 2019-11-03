
function signup() {
  var username = $('#inputUsername').val();
  var password = $('#inputPassword').val();
  var passwordc = $('#inputPasswordc').val();
  var phone = $('#inputPhone').val();
  //var phoneCode = $('#inputPhoneCode').val();
  var email = $('#inputEmail').val();
  // LeanCloud - 注册
  // https://leancloud.cn/docs/leanstorage_guide-js.html#注册

  if(password == passwordc) {
        var user = new AV.User();
        user.setUsername(username);
        user.setPassword(password);
        user.setMobilePhoneNumber(phone)
        user.setEmail(email);
        user.signUp().then(function (loginedUser) {
          window.location.href = "UserInfoAdd.html";
        }, (function (error) {
          alert(JSON.stringify(error));
        }));
   }else {
        alert('两次密码不一致');
  }
};


function clickButton(obj){
  var obj = $(obj);
  obj.attr("disabled","disabled");/*按钮倒计时*/
  var time = 60;
  var phone = $('#inputPhone').val();
  default_signatrue
  AV.Cloud.requestSmsCode('+86'+phone);
  var set=setInterval(function(){
    obj.val(--time+"(s)");
  }, 1000);/*等待时间*/
  setTimeout(function(){
    obj.attr("disabled",false).val("重新获取");/*倒计时*/
    clearInterval(set);
  }, 60000);
}

$(function() {
  $(".fiveui-signup").on('submit', function(e) {
    e.preventDefault();
    signup();
  });
});