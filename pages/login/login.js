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
    control_info: "",
    lora_info: "",
    model_name: "",
    winH: 200,
    audio_text: "",
    conArray: [
      {
        "id": "0",
        "text": "openpose"
      },
      {
        "id": "1",
        "text": "canny"
      },
      {
        "id": "2",
        "text": "control_v11f1p_sd15_depth"
      },
      {
        "id": "3",
        "text": "control_v11p_sd15s2_lineart_anime"
      },
      {
        "id": "4",
        "text": "control_v11p_sd15_softedge"
      },
      {
        "id": "5",
        "text": "control_v11p_sd15_canny"
      },
      {
        "id": "6",
        "text": "control_v11p_sd15_openpose"
      },
    ],
    loraArray: [
      {
          "id": "01",
          "text": "停车A区"
      }, 
      {
          "id": "02",
          "text": "停车B区"
      }
    ],
    modelArray: [
      {
        "id": "01",
        "text": "stable-diffusion-v1-5"
      },
      {
        "id": "02",
        "text": "chilloutmix-Ni"
      },
      {
        "id": "03",
        "text": "deliberate"
      },
      {
        "id": "04",
        "text": "dreamlike-photoreal-2.0"
      },
      {
        "id": "05",
        "text": "elldrethSLucidMix_v10"
      },
      {
        "id": "06",
        "text": "protogenX34OfficialR_1"
      },
      {
        "id": "07",
        "text": "sd_v2.0"
      },
    ],
    currentSelectTripType: '1:1',
  },
  selected_1: function (e) {
    console.log(e);
    this.setData({
      currentSelectTripType: e.currentTarget.dataset.id
    })
  },
  selected_2: function(e) {
    this.setData({
      currentSelectTripType: e.currentTarget.dataset.id
    })
  },
  selected_3: function(e) {
    this.setData({
      currentSelectTripType: e.currentTarget.dataset.id
    })
  },
  selected_4: function(e) {
    this.setData({
      currentSelectTripType: e.currentTarget.dataset.id
    })
  },
  selected_5: function(e) {
    this.setData({
      currentSelectTripType: e.currentTarget.dataset.id
    })
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
    form_data["lora_info"] = this.data.lora_info;
    form_data["control_info"] = this.data.control_info;
    form_data["model_name"] = this.data.model_name;
    form_data["proportion"] = this.data.currentSelectTripType;
    console.log(form_data);
    // send data to server
    app.util.request({
        url: '/project/wechat/send_sd_message',
        method: "POST",
        data: form_data
    }).then(res => {
      console.log(res);
      if(res.code == 200){
        console.log(res.data);
      }else{
        console.log(res.msg);
      }
    })
  },
  getDate:function(e){
      console.log(e)
      if(e.detail.text == "Controlnet"){
        this.setData({
          "control_info": e.detail.text
        })
      }else if(e.detail.text == "Lora"){
        this.setData({
          "lora_info": e.detail.text
        })
      }else{
        this.setData({
          "model_info": e.detail.text
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
  login(){
    wx.login({
      success(res){
        if(res.code){
          console.log(res);
          app.util.request({
              url: '/project/wechat/onlogin',
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
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    if (wx.getUserProfile) {
      that.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
      console.log(2, this);
      var that = this;
      wx.checkSession({
        success(){
          console.log("登录中。。。");
        },
        fail(){
          that.login();
          console.log("掉线了哟")
        }
      })      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
      console.log(1, this);
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