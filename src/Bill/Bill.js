// handlebars context
var context = {
  recharges: []
};

function setupData() {
  // LeanCloud - 查询
  // https://leancloud.cn/docs/leanstorage_guide-js.html#查询
  var query = new AV.Query('Recharge');
  query.equalTo('owner', AV.User.current());
  query.include('owner');
  query.descending('createdAt');
  query.find().then(function (recharges) {
    recharges.forEach(function(recharge) {
      var rechargeIntegral = recharge.get('integral');
      var rechargeDescription = recharge.get('description');
      var rechargeBank = recharge.get('bank');
      var rechargeBankCard = recharge.get('bankCard');
      var releaseTime = (recharge.createdAt.getMonth() + 1) + '/' + recharge.createdAt.getDate() + '/' +  recharge.createdAt.getFullYear();
      var ownerUsername = recharge.get('owner').get('username');
      // handlebars context
      context.recharges.push({
        rechargeIntegral,
        rechargeDescription,
        rechargeBank,
        rechargeBankCard,
        ownerUsername,
        releaseTime
      });
    });

    // use handlebars to update html
    var source = $("#recharges-list").html();
    var template = Handlebars.compile(source);
    var html = template(context);
    $('.recharges-detail').html(html);

  }).catch(function(error) {
    alert(JSON.stringify(error));
  });
};

function logout() {
  AV.User.logOut();
  window.location.href = "../login/login.html";
};

$(function() {
  if (isCurrentUser()) {
    setupData();
  } else {
    window.location.href = "../login/login.html";
  }
});