var Bank = AV.Object.extend('Bank');

function releaseNewBank() {
  var bankUser = $('#bankUser').val();
  var bankCard = $('#bankCard').val();
  var openBank = $('#openBank').val();
  var description = $('#inputDescription').val();

  // LeanCloud - 当前用户
  // https://leancloud.cn/docs/leanstorage_guide-js.html#当前用户
  var currentUser = AV.User.current();
  // LeanCloud - 文件
  // https://leancloud.cn/docs/leanstorage_guide-js.html#文件


  // LeanCloud - 对象
  // https://leancloud.cn/docs/leanstorage_guide-js.html#数据类型
  var rank = new Bank();
  rank.set('bankUser', bankUser);
  rank.set('bankCard', bankCard);
  rank.set('openBank', openBank);
  rank.set('description', description);
  rank.set('owner', currentUser);
  rank.save().then(function () {
    window.location.href = "../UserCenter/UserCenter.html";
  }, function (error) {
    alert(JSON.stringify(error));
  });
};

$(function () {
  if (isCurrentUser()) {
    $(".new-Rank").on('submit', function (e) {
      e.preventDefault();
      releaseNewBank();
    });
  } else {
    window.location.href = "../login/login.html";
  }
});

//https://v4rel.h5sys.cn/api/10198237/five
var banList = ["中国工商银行", "招商银行", "中国农业银行", "中国建设银行", "中国银行", "中国民生银行", "中国光大银行", "中信银行", "交通银行", "兴业银行", "上海浦东发展银行", "中国人民银行", "国家开发银行", "中国邮政储蓄银行", "中国农业发展银行"];

$(function () {
  var Browser = document.getElementById("browsers");
  banList.forEach(value1 => {
    var op = document.createElement('option');
    op.value = value1;
    Browser.appendChild(op);
  });
});
