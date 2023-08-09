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

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
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

      wx.checkSession({
        success(){
          console.log("登录中。。。")
        },
        fail(){
          console.log("掉线了哟")
        }
      })

      const accountInfo = wx.getAccountInfoSync();
      console.log(accountInfo.miniProgram.appId);
      console.log(accountInfo.plugin.appId);
      console.log(accountInfo.plugin.version);

      

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