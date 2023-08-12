//login.js
//获取应用实例
var app = getApp();
const innerAduioContext = wx.createInnerAudioContext()
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    audio_text: "",
    winH: 20,
    audio_path: "https://s3.adtensor.com/tmp/87c74e428fd144ca9d3e8a8cb9a88d21.mp3",
    breathNum : 1.0,
    animationType:""
  },

  
  clickBtn:function(){
    console.log("aaa")
    this.setData({animationType: "animated " + "water-wave"})
  },
  setTextBreathing: function(cls,e) {
    //使用记录呼吸效果
    var transparency = 10;
    var reduce = true;  //记录当前做透明度增加或降低操作
    setInterval(function(){
      if (reduce === true){
        transparency -= 1;
        if (transparency === 0){
            reduce = false;
        }
      } else if (reduce === false){
          transparency += 1;
        if (transparency === 10){
            reduce = true;
        }
      }
      cls._defaultComponent.setData({
        breathNum:transparency/10
      })
      //通过setData的方式，设置breathNum的值
    },200)
  },
  audio_init(){
    //文字逐个显示
    var that = this
    var story = "华人牌2060款手机傻妞为您服务，11111请输入开机密码";
    console.log(story);
    var i= 0;
    var time = setInterval(function(){
        var text = story.substring(0, i);
        var s = story[i];
        const reg = new RegExp("1", "g");
        text = text.replace(reg, "");
        i++;
        if(s != "1"){
          that.setData({
              audio_text: text
          });
        }
        if (text.length == story.length) {
            console.log("定时器结束！");
            clearInterval(time);
        }
    },200)
  },
  audio_play(){
    innerAduioContext.src = this.data.audio_path;
    // 设置自动播放
    innerAduioContext.autoplay = true,
    innerAduioContext.loop = false,
    innerAduioContext.volume = 0.5,
    innerAduioContext.play()
  },
  goToIndex: function() {
    wx.switchTab({
      url: '/pages/login/login',
    });
  },
  onLoad: function() {
    var that = this
    that.setTextBreathing(wx.createSelectorQuery(".get-record"),that)
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    });
  },
  onShow: function() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
  },
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
    that.audio_init();
    // that.audio_play();
  }
});