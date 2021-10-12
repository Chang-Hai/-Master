// pages/cardDetail/cardDetail.js
const app = getApp();
wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    department: '',
    inc: '',
    process: [],
    record: [],
    station: '',
    time: '',
    type: ''
  },
  getCardDetail(id) {
    db.collection('cardDetail').where({
      _id: id
    }).get().then(res => {
      console.log(res, 'getCardDetail')
      const item = res.data[0]
      this.setData({
        department: item.department,
        inc: item.inc,
        process:  item.process,
        record: item.record,
        station: item.station,
        time: item.time,
        type: item.type
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option.id)
    this.getCardDetail(option.id)
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