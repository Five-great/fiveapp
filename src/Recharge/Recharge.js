var Recharge = AV.Object.extend('Recharge');

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
    alert("积分充值成功");
    window.location.href = "../UserCenter/UserCenter.html";
  }, function(error) {
    alert(JSON.stringify(error));
  });
};
var timeFlag = null;
$(function() {
  if (isCurrentUser()) {
    $(".new-Recharge").on('submit', function(e) {
      e.preventDefault();
      if (timeFlag === null) {
        timeFlag = setTimeout(() => timeFlag = null, 6000);
        releaseNewRecharge();
      }

    });
  } else {
    window.location.href = "../login/login.html";
  }
});

var banList = ["中国工商银行", "招商银行", "中国农业银行", "中国建设银行", "中国银行", "中国民生银行", "中国光大银行", "中信银行", "交通银行", "兴业银行", "上海浦东发展银行", "中国人民银行", "国家开发银行", "中国邮政储蓄银行", "中国农业发展银行"];

$(function () {
  var Browser = document.getElementById("browsers");
  banList.forEach(value => {
    var op = document.createElement('option');
    op.value = value;
    Browser.appendChild(op);
  });
});

$(function () {
  var Browser = document.getElementById("browsers2");
  banList.forEach(value => {
    var op = document.createElement('option');
    op.value = value;
    Browser.appendChild(op);
  });
});