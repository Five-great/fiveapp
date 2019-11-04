// handlebars context
var context = {
  userLists: []
};

function setupData() {
  // LeanCloud - 查询
  // https://leancloud.cn/docs/leanstorage_guide-js.html#查询
  var query = new AV.Query('UserInfo');
  //query.include('owner');
  query.descending('createdAt');
  query.find().then(function (userLists) {
    userLists.forEach(function(userList) {
      var userEmail = userList.get('email');
      var userName = userList.get('nickname');
      var userAddress = userList.get('address');
      var userIntegral = userList.get('integrals');
      var userTime = userList.createdAt.getFullYear()+' 年 '+(userList.createdAt.getMonth() + 1) + ' 月 ' + userList.createdAt.getDate() + '日' ;

      // handlebars context
      context.userLists.push({
        userEmail,
        userName,
        userAddress,
        userAddress,
        userTime,
        userIntegral
      });
    });

    // use handlebars to update html
    var source = $("#userLists-list").html();
    var template = Handlebars.compile(source);
    var html = template(context);
    $('.userLists-detail').html(html);

  }).catch(function(error) {
    alert(JSON.stringify(error));
  });
}

setupData();


//getAPI();

function getAPI() {
  var url = 'http://api.avatardata.cn/ActNews/LookUp?key=c3801764691441b79e45a9a621637a00';

  $.ajax({
      url: url,    //请求的url地址
     dataType: "application/json;charset=utf-8",
     async:true,//请求是否异步，默认为异步，这也是ajax重要特性
     data: {},
     type:"GET",   //请求方式
     beforeSend:function(){
         //请求前的处理
     },
      success:function(req){
           //请求成功时处理
        console.log(req)
      },
       complete:function(){
          //请求完成的处理
     },
     error:function(){
      //请求出错处理
        }
    });

}
