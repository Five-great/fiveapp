var UserInfo = AV.Object.extend('UserInfo');

function releaseNewUserInfoAdd() {
  var qqNumber = "985540932" || $('#inputQQNumber').val();
  var address = "四川成都" || $('#inputAddress').val();

  // LeanCloud - 当前用户
  // https://leancloud.cn/docs/leanstorage_guide-js.html#当前用户
  var currentUser = AV.User.current();

  // LeanCloud - 对象
  // https://leancloud.cn/docs/leanstorage_guide-js.html#数据类型
  var userInfo = new UserInfo();
  userInfo.set('username', currentUser._serverData.username);
  userInfo.set('nickname', currentUser._serverData.username);
  userInfo.set('integrals', 0);
  userInfo.set('mobilePhone', currentUser._serverData.mobilePhoneNumber);
  userInfo.set('email', currentUser._serverData.email);
  userInfo.set('qqNumber', qqNumber);
  userInfo.set('owner', currentUser);
  userInfo.set('address', address);
  userInfo.save().then(function() {
    alert('恭喜注册成功\n邮箱验证后即可登陆');
    window.location.href = "../login/login.html";
  }, function(error) {
    alert(JSON.stringify(error));
  });
};

$(function() {
  if (isCurrentUser()) {
    //$(".new-product").on('submit', function(e) {
      //e.preventDefault();
      releaseNewUserInfoAdd();
    //});
  } else {
    window.location.href = "../login/login.html";
  }
});