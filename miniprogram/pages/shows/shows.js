// pages/shows/shows.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: [
      {
        id:1,
        inc: '字节跳动',
        kexin: 3,
        class: '本科211',
        price: 30,
        city: '北京',
        type:'前端开发'
      },
      {
        id:2,
        inc: '百度',
        price: 30,
        city: '北京',
        kexin: 2,
        class: '硕士211',
        type:'后端开发'
      },
      {
        id:3,
        inc: '腾讯',
        price: 30,
        city: '北京',
        kexin: 4,
        class: '本科985',
        type:'运营'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})