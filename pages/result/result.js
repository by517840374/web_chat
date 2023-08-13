// pages/result/result.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    updateLoading: false,
    isAllLoaded: false,
    is_end: false
  },
  updatedCount: 0,
  previewSqs(event) {
      // 拿到图片的地址url
      let currentUrl = event.currentTarget.dataset.src;
      var imgList = []; //定义一个放图片的数组
      // 循环模拟数据的数组取其中的图片字段，将其添加到imgList数组中
      for (let i = 0; i < this.data.listData.length; i++) {
          imgList.push(this.data.listData[i].imgUrl);
      }
      // 调用微信小程序预览图片的方法
      wx.previewImage({
          current: currentUrl, // 当前显示图片的http链接
          urls: imgList // 需要预览的图片http链接列表
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  reset(){
    // 待会儿设置下拉刷新
    app.util.request({
      url: '/project/wechat/get_result',
        method: "GET"
      }).then(res => {
        console.log(res.data);
        this.setData({
          listData: res.data
        })
      })
  },
  onLoad(options) {
    this.initData();
  },
  initData(){
    var that = this;
    app.util.request({
      url: '/project/wechat/get_result',
      method: "GET"
    }).then(res => {
      console.log(res.data);
      this.setData({
        listData: res.data
      })
      that.updatedCount += 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },
  fetchData() {
    // if (this.is_end) return;
    this.setData({
      updateLoading: true,
    })
    setTimeout(() => {
      var that = this;
      app.util.request({
        url: '/project/wechat/get_result',
          method: "GET"
      }).then(res => {
        console.log(res.data);
        this.setData({
          listData: that.data.listData.concat(res.data),
          isAllLoaded: res.data.is_end,
          updateLoading:  false,
        })
        that.updatedCount += 1;
      })
    }, 1000)
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
    this.fetchData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.fetchData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})