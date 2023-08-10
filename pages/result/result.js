// pages/result/result.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [{
        imgUrl: "https://s1.ax1x.com/2022/04/13/LKIJmj.jpg"
    }, {
        imgUrl: "https://s1.ax1x.com/2022/04/13/LKIJmj.jpg"
    }, {
        imgUrl: "https://s1.ax1x.com/2022/04/13/LKIqAI.jpg"
    }],
  },
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
  onLoad(options) {
    app.util.request({
        url: '/auth/get_img',
        method: "GET"
      }).then(res => {
        console.log(res.data);
        this.setData({
          listData: res.data
        })
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