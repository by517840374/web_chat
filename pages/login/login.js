// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    chaX: 0,// 转换值X
    chaY: 0,// 转换值Y
    touch: false, // 触摸标记
    posX:100, // 初始位置
    posY:20, // 初始位置
    text: "Controlnet",
    control_id: 0,
    lora_id: 0,
    selectArray: [
      {
          "id": "01",
          "text": "停车A区"
      }, 
      {
          "id": "02",
          "text": "停车B区"
      }
  ]
  },
  upSelfSliderChange(event) {
    var that = this;
    var value = event.detail.value;
    // that.setData({
    //   upSelfSliderDefault: value
    // });
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const form_data = e.detail.value;
    form_data["lora_id"] = this.data.lora_id;
    form_data["controlent_id"] = this.data.control_id;
    console.log(form_data);
    // send data to server
    app.util.request({
        url: '/auth/test',
        method: "POST",
        data: form_data
    }).then(res => {
      console.log(res.data);
    })
  },
  getDate:function(e){
      console.log(e)
      if(e.detail.text == "Controlnet"){
        this.setData({
          "control_id": e.detail.id
        })
      }else{
        this.setData({
          "lora_id": e.detail.id
        })
      }
  },
  // 开始触摸
  touchStart: function (e) {
      console.log("== touchStart ==");// 拖动开始
      // e.touches[0] 内容就是触摸点的坐标值
      var tranX = e.touches[0].pageX-this.data.posX;
      var tranY = e.touches[0].pageY-this.data.posY;
      console.log("start tranX: " + tranX);
      console.log("start tranY: " + tranY);
      // 存储chaX和chaY 并设置 touch: true
      this.setData({
          touch:true, 
          chaX:tranX,
          chaY:tranY
      });
  },
  // 触摸移动
  touchMove: function (e) {
      if (!this.data.touch) return;
      // e.touches[0] 内容就是触摸点的坐标值
      var new_posX = e.touches[0].pageX-this.data.chaX;
      var new_posY = e.touches[0].pageY-this.data.chaY;
      console.log(" move new_posX: " + new_posX);
      console.log(" move nwe_posY: " + new_posY);
      this.setData({
          posX:new_posX,
          posY:new_posY
      });
  },
  // 触摸结束
  touchEnd: function (e) {
      console.log("== touchEnd ==")
      if (!this.data.touch) return;
      this.setData({
          touch:false,
          chaX:0,
          chaY:0
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  login(){
    wx.login({
      success(res){
        if(res.code){
          console.log(res);
          app.util.request({
              url: '/auth/onlogin',
              method: "POST",
              data: {
                code: res.code
              }
          }).then(res => {
            console.log(res.data);
          })
        }else{
          console.log("登录失败" + res.errMsg)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
      
      wx.checkSession({
        success(){
          console.log("登录中。。。")
        },
        fail(){
          login();
          console.log("掉线了哟")
        }
      })      

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  
  getChooseAvatar(e){
    console.log(e);
    this.setData({
      avatarUrl: e.detail.avatarUrl,
    })
  },
  userInfoLogin(e) {
    this.setData({
      nickName: e.detail.value.nickname
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }

})