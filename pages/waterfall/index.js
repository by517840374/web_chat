const randomNumer = function(min, range) {
  return Math.floor(min + Math.random() * range);
}
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    updateLoading: false,
    isAllLoaded: false,
    is_end: false
  },
  updatedCount: 0,
  page: 1,

  previewSqs(event) {
    // 拿到图片的地址url
    let currentUrl = event.currentTarget.dataset.src;
    var imgList = []; //定义一个放图片的数组
    // 循环模拟数据的数组取其中的图片字段，将其添加到imgList数组中
    for (let i = 0; i < this.data.products.length; i++) {
        imgList.push(this.data.products[i].imgUrl);
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
  onLoad: function (options) {
    this.initData();
  },
  initData(){
    var that = this;
    app.util.request({
      url: '/project/mj/create?page=' + that.page,
        method: "GET",
      }).then(res => {
        var list = res.data.list;
        var mockList = [];
        for(var i=0;i<list.length;++i){
          var url = list[i]["url"];
          if(url){
            url = url.replace("minio-local://", "https://s3.adtensor.com");
            console.log(url);
            mockList.push({"imgUrl": url})
          }
        }
        that.setData({
          products: that.data.products.concat(mockList),
          is_end: res.data.is_end
        });
        that.updatedCount += 1;
        that.page += 1;
      })
  },

  getWaterFall() {
    this.fetchData()
  },

  fetchData() {
    if (this.is_end) return;
    this.setData({
      updateLoading: true,
    })
    setTimeout(() => {
      var that = this;
      app.util.request({
        url: '/project/mj/create?page=' + that.page,
          method: "GET"
      }).then(res => {
        var list = res.data.list;
        var mockList = [];
        for(var i=0;i<list.length;++i){
          var url = list[i]["url"];
          if(url){
            url = url.replace("minio-local://", "https://s3.adtensor.com");
            mockList.push({"imgUrl": url})
          }
        }
        that.setData({
          isAllLoaded: res.data.is_end,
          updateLoading:  false,
          products: that.data.products.concat(mockList),
        });
        that.updatedCount += 1;
        that.page += 1;
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onTap() {
    wx.showModal({
      title: 'Title',
      content: 'content',
      success({ confirm, cancel }) {
        if (confirm) {
          console.log('success');
        }

        if(cancel) {
          console.log('cancel');
        }
        
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.fetchData();
  },

  handleScrollLower() {
    if(this.data.updateLoading || this.data.isAllLoaded) return;
    this.fetchData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})