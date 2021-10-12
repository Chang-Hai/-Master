// pages/login/login.js
let App = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: true
  },
  toLogin() {
    wx.getSetting({
     success(res) {
      if (!res.authSetting['scope.record']) {
        wx.authorize({
          scope: 'scope.record',
          success () {
          }
        })
      }
     }
    })
  },
  ischuzhe (OPENID) {
    console.log('down')
     db.collection('user').where({
        _openid: OPENID
      }).get().then(res => {
        console.log(res, 'zhuce')
        if(res.data.length === 0) {
          this.createCardList()
        }
      })
  },
  addOpenId (id) {
  db.collection('user').add({
    data: {
      cardList: id
    }
  }).then(res => {
    console.log(res, 'addOpenId')
  })
  },
  createCardList () {
    db.collection('cardList').add({
      data: {}
    }).then(res => {
      console.log(res, 'cardList')
      this.addOpenId(res._id)
    })
  },
  bindGetUserInfo(res) {
        wx.cloud.callFunction({
          name: 'getUser',
          complete: res => {
            this.ischuzhe(res.result.OPENID)
            console.log('getUser',res)
            App.store.setState({
              id:  res.result.OPENID
              })
          }
        })
        if (res.detail.userInfo) {
          const that = this;
          console.log("用户的信息如下：");   
          console.log(res.detail.userInfo);
            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
          that.setData({
            isHide: false
          });
          setTimeout( () => {
            wx.navigateBack({
              delta: 0,
              success: (res) => {},
              fail: (res) => {},
              complete: (res) => {},
            })
          },0)
        }  else {
         //用户按了拒绝按钮
          wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
            showCancel: false,
            confirmText: '返回授权',
            success: function(res) {
            // 用户没有授权成功，不需要改变 isHide 的值
              if (res.confirm) {
                console.log('用户点击了“返回授权”');
              }
            }
        })
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({})
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