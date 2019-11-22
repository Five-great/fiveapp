// handlebars context

function setupData() {
  // LeanCloud - 查询
  // https://leancloud.cn/docs/leanstorage_guide-js.html#查询
  var query = new AV.Query('UserInfo');
  query.equalTo('owner', AV.User.current());
  query.include('owner');
  query.find().then(function (userInfos) {
      var integral = userInfos[0]._serverData.integrals;
      var nickname = userInfos[0]._serverData.nickname;
      var context = {
        integral,
        nickname
      };
    // use handlebars to update html
    var source = $("#userInfo").html();
    var template = Handlebars.compile(source);
    var html = template(context);
    $('.userInfo-detail').html(html);
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