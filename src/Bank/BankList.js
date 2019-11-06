// handlebars context
var context = {
  bankLists: []
};

function setupData() {
  // LeanCloud - 查询
  // https://leancloud.cn/docs/leanstorage_guide-js.html#查询
  var query = new AV.Query('Bank');
  query.equalTo('owner', AV.User.current());
  query.descending('createdAt');
  query.find().then(function (bankLists) {
    bankLists.forEach(function (bankList) {

      var bankListDescription = bankList.get('description');
      var bankListBankUser = bankList.get('bankUser');
      var bankListBankCard = bankList.get('bankCard');
      // var releaseTime = (recharge.createdAt.getMonth() + 1) + '/' + recharge.createdAt.getDate() + '/' +  recharge.createdAt.getFullYear();
      var bankListOpenBank = bankList.get('openBank');
      // handlebars context
      context.bankLists.push({
        bankListDescription,
        bankListBankUser,
        bankListBankCard,
        bankListOpenBank
      });
    });

    // use handlebars to update html
    var source = $("#bankLists-list").html();
    var template = Handlebars.compile(source);
    var html = template(context);
    $('.bankLists-detail').html(html);

  }).catch(function (error) {
    alert(JSON.stringify(error));
  });
};

function logout() {
  AV.User.logOut();
  window.location.href = "../login/login.html";
};

$(function () {
  if (isCurrentUser()) {
    setupData();
  } else {
    window.location.href = "../login/login.html";
  }
});