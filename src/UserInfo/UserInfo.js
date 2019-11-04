var objectId;
var integral;
var nickname ;
var username ;
var email;
var mobilePhone ;
var address ;
var addressArea;
var qqNumber ;
var nickname2 ;
function setupData() {
  // LeanCloud - 查询
  // https://leancloud.cn/docs/leanstorage_guide-js.html#查询
  var query = new AV.Query('UserInfo');
  query.equalTo('owner', AV.User.current());
  query.include('owner');
  query.find().then(function (userInfos) {
    integral = userInfos[0]._serverData.integrals;
    nickname = userInfos[0]._serverData.nickname;
    username = userInfos[0]._serverData.username;
    email = userInfos[0]._serverData.email;
    mobilePhone = userInfos[0]._serverData.mobilePhone ;
    address = userInfos[0]._serverData.address;
    addressArea = userInfos[0]._serverData.addressArea;
    qqNumber = userInfos[0]._serverData.qqNumber ;
    nickname2 = nickname;
    objectId = userInfos[0].id;
    var context = {
      address,
      addressArea,
      qqNumber,
      mobilePhone,
      email,
      integral,
      nickname2,
      nickname,
      username
    };
    // use handlebars to update html
    var source = $("#userInfo").html();
    var template = Handlebars.compile(source);
    var html = template(context);
    $('.userInfo-detail').html(html);
    getCity();
  });

};

function upNowData(upAddress,nowData) {
 var todo = AV.Object.createWithoutData('UserInfo', objectId);
  todo.set(upAddress,nowData);
  todo.save();
}
function upData() {
 // var query = new AV.Query('UserInfo');
  var nowNickName = $('#inputNickname').val() ;
  var nowEmail = $('#inputEmail').val();
  var nowQQNumber = $('#inputQQNumber').val();
  var nowMobilePhone = $('#inputMobilePhone').val();
  var nowAddress = $('#inputAddress').val();
  var nowAddressArea = $('#AddressArea').val();
  try{
    nowNickName == nickname ? 0 :upNowData('nickname',nowNickName) ;
    nowEmail == email? 0 : AV.User.current().setEmail(nowEmail);
    nowEmail == email? 0 : upNowData('email',nowEmail);
    nowQQNumber == qqNumber ? 0 :upNowData('qqNumber',nowQQNumber) ;
    nowMobilePhone == mobilePhone ? 0 : AV.User.current().setMobilePhoneNumber(nowMobilePhone);
    nowMobilePhone == mobilePhone ? 0 :upNowData('mobilePhone',nowMobilePhone ) ;
    nowAddress == address ? 0 :upNowData('address',nowAddress ) ;
    nowAddressArea == addressArea ? 0 : upNowData('addressArea', nowAddressArea);
    AV.User.current().save();
    alert('修改数据成功');
    setupData();
   }catch (e) {
    alert(e);
  }


}

function getCity() {
  var $target = $('#AddressArea');
  console.log($target);
  $target.citySelect();
  $target.on('click', function (event) {
    event.stopPropagation();
    $target.citySelect('open');

  });
  $('#CityClose').on('click', function () {
    $target.citySelect('close');
  });

  $target.on('done.ydui.cityselect', function (ret) {
    $(this).val(ret.provance + ' ' + ret.city + ' ' + ret.area);
  });
}

function clickButton() {
  if (isCurrentUser()) {
        upData();
  } else {
    window.location.href = "../login/login.html";
  }
}

$(function() {
  if (isCurrentUser()) {
    setupData();
  } else {
    window.location.href = "../login/login.html";
  }
});