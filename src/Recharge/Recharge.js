var Recharge = AV.Object.extend('Recharge');
console.log(Recharge);

function releaseNewRecharge() {
  var integral =parseFloat($('#integral').val());
  var bank = $('#bank').val();
  var bankCard = $('#bankCard').val();
  var description = $('#inputDescription').val();

  // LeanCloud - 当前用户
  // https://leancloud.cn/docs/leanstorage_guide-js.html#当前用户
  var currentUser = AV.User.current();
  // LeanCloud - 文件
  // https://leancloud.cn/docs/leanstorage_guide-js.html#文件


  // LeanCloud - 对象
  // https://leancloud.cn/docs/leanstorage_guide-js.html#数据类型
  var recharge = new Recharge();
  recharge.set('integral', integral);
  recharge.set('bank', bank );
  recharge.set('bankCard', bankCard );
  recharge.set('description', description);
  recharge.set('owner', currentUser);
  recharge.save().then(function() {
    window.location.href = "../UserCenter/UserCenter.html";
  }, function(error) {
    alert(JSON.stringify(error));
  });
};

$(function() {
  if (isCurrentUser()) {
    $(".new-Recharge").on('submit', function(e) {
      e.preventDefault();
      releaseNewRecharge();
    });
  } else {
    window.location.href = "../login/login.html";
  }
});