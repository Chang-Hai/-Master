const app = getApp();
wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command
const mook = [
  {
    head: {
      inc: '字节跳动',
      updata: '2021.9.10'
    },
    body: {
      department: '商业架构部门',
      station: '前端开发工程师',
      type: '校招',
      process: [
        '简历筛选',
        '一面面试',
        '二面面试'
      ]
    },
    footer: {
      test: 'footer'
    },
    id: 1,
    opacity:1,
    scrollLeft:0
  },
  {
    head: {
      inc: '蚂蚁金服',
      updata: '2021.9.15'
    },
    body: {
      department: '中台管理',
      station: '前端开发工程师',
      type: '校招',
      process: [
        // '简历筛选',
        // '一面面试',
        // '二面面试'
        // 1,2,3
      ]
    },
    footer: {
      test: 'footer'
    },
    id: 2,
    opacity:1,
    scrollLeft:0,
  },
  {
    head: {
      inc: '蚂蚁金服',
      updata: '2021.9.15'
    },
    body: {
      department: '中台管理',
      station: '前端开发工程师',
      type: '校招',
      process: [
        '简历筛选',
        '一面面试',
        '二面面试'
      ]
    },
    footer: {
      test: 'footer'
    },
    id: 3,
    opacity:1,
    scrollLeft:0
  },
  {
    head: {
      inc: '蚂蚁金服',
      updata: '2021.9.15'
    },
    body: {
      department: '中台管理',
      station: '前端开发工程师',
      type: '校招',
      process: [
        '简历筛选',
        '一面面试',
        '二面面试'
      ]
    },
    footer: {
      test: 'footer'
    },
    id: 4,
    opacity:1,
    scrollLeft:0
  }
]
 Page({
 
   /**
    * 页面的初始数据
    */
   data: {
    tableData: mook,
    button: null,
    ismove: false,
    startX: 0,
    animationData: {},
    animation: {},
    addVisible: false,
    TabCur: 0,
    scrollLeft:0,
    modalName: null,
    islogin: false,
    addInc: undefined,
    addStation: undefined,
    addDepartment: undefined,
    addType: undefined,
    addChanel: undefined,
    addForm: {},
    radio: [
      {
        name: '校招',
        id:0
      },
      {
        name: '实习',
        id:1
      },
      {
        name: '校招',
        id: 2
      }
    ],
    tabs: [
      {
        name: '流程中',
        id: 0
      },
      {
        name: '已通过',
        id: 1
      },
      {
        name: '未通过',
        id: 2
      }
    ]
   },
   scroll(e) {
     let left = e.detail.scrollLeft
     let opacity=(100-left)/100
     let index = e.target.dataset.index
     const id = this.data.tableData[index].id
    let temp = this.data.tableData
    temp[index].opacity = opacity
    temp[index].scrollLeft = left
    this.setData({
      tableData:temp
    })
    const that = this
    if(left>40) {
      wx.showModal({
        title: '要删除这条流程吗？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.deleteCard(id)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
          temp[index].scrollLeft = 0
          that.setData({
            tableData:temp
          })
        }
      })
      
      console.log('down')
    }
  },
   toDetail(e) {
   
    const item = e.currentTarget.dataset.item
    console.log(item.id, 'toDetail')
    if(!this.data.$state.id) {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      try {
        wx.navigateTo({
          url: `../cardDetail/cardDetail?id=${item.id}`
        })
      } catch (error) {
        console.log(error)
      }
    }
    // wx.navigateTo({
    //   url: '../cardDetail/index',
    //   // success: function(res) {
    //   //   res.eventChannel.emit('putCardId', { data: item.id })
    //   // }
    // })
    // try {
    //   if(this.islogin) {
    //     console.log('islogin true')
    //     wx.navigateTo({
    //       url: '../cardDetail/cardDetail',
    //     })
    //   } else {
    //     console.log('跳转到登录授权页')
    //     wx.navigateTo({
    //       url: '../login/login',
    //     })
    //   }
    // } catch (error) {
    //   console.error(error)
    // }
  },
  checkLogin() {
    var that = this;
    //查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户授权了");
          this.islogin = true
        } else {
          //用户没有授权
          console.log("用户没有授权");
          this.islogin = false
        }
      }
    })
  },
  selectedRadio(e){
    console.log(e.detail.value, 'selectedRadio')
    this.addType = e.detail.value
  },
  hideModal(e) {
    console.log('hidemodal down')
    this.closeSubmitCard()
    this.setData({
      modalName: null
    })
  },
  showModal(e) {
    if(!this.data.$state.id) {
      console.log('请先登录')
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    }
  },
  tabSelect(e) {
    console.log(e, 'tabselect')
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  handleInputChange(e) {
    if(e.target.dataset.modal === 'inc') {
      console.log('inc')
      this.addInc = e.detail.value
    } else if (e.target.dataset.modal === 'station') {
      console.log('station')
      this.addStation = e.detail.value
    } else if (e.target.dataset.modal === 'department') {
      console.log('department')
      this.addDepartment = e.detail.value
    } else if (e.target.dataset.modal ==='chanel') {
      console.log('chanel')
      this.addChanel = e.detail.value
    }
  },
  onButton() {
    // this.button = {
    // 	display:block
    // },
    console.log('button down')
    this.addVisible = true
  },
  closeAdd() {
    this.addVisible = false
    console.log('close ADD down')
  },
  submitCard () {
    console.log('inc', this.addInc, 'station', this.addStation, 'department', this.addDepartment, 'addType', this.addType)
    if(!this.addInc) {
      wx.showToast({
        title: '请填写公司',
        icon: 'error',
        duration: 2000
      }) 
    } else if (!this.addStation) {
      wx.showToast({
        title: '请输入职位',
        icon: 'error',
        duration: 2000
      }) 
    } else if(!this.addDepartment) {
      wx.showToast({
        title: '请输入部门',
        icon: 'error',
        duration: 2000
      }) 
    } else if(this.addType === undefined || this.addType === '') {
      wx.showToast({
        title: '请选择类型',
        icon: 'error',
        duration: 2000
      }) 
    } else if(this.addChanel === undefined || this.addChanel === ''){
      wx.showToast({
        title: '请输入渠道',
        icon: 'error',
        duration: 2000
      })
    }else {
      wx.showLoading({
        title: '添加中',
      })
      let time = new Date()
      wx.cloud.callFunction({
        name: 'addCard',
        data: {
          inc: this.addInc,
          type: this.addType,
          department: this.addDepartment,
          station: this.addStation,
          chanel: this.addChanel,
          time: time.toLocaleDateString()
        }
      }).then(res => {
        const temp = {
          inc: this.addInc,
          type: this.addType,
          department: this.addDepartment,
          station: this.addStation,
          chanel: this.addChanel,
          time: time.toLocaleDateString()
        }
        this.putCard(temp)
      })
    }
  },
  deleteCard (data) {
    console.log(data, 'deleteCard')
    db.collection('cardDetail').doc(data).remove({
      success: function(res) {
        console.log(res.data, '删除成功')
      }
    })
    console.log(this.data.$state.id, 'id')
    db.collection('cardList').where({
      _openid: this.data.$state.id
    }).get().then(res => {
      const souce = res.data[0].card
      for(let i = 0; i < souce.length; i++) {
        if(souce[i].id == data) {
          souce.splice(i,1)
        }
      }
      db.collection('cardList').where({
        _openid: this.data.$state.id
      }).update({
        data: {
          card: souce
        }
      }).then(res => {
        console.log(res, '更新成功')
      }).catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error, 'error')
    })
    this.getCardList()
    
  },
  putCard (data) {
    const that = this
    db.collection('cardDetail').add({
      data: {
        inc: data.inc,
        station: data.station,
        type: data.type,
        department: data.department,
        state: 0,
        chanel: data.chanel,
        process: [ '一面'],
        record: [],
        time: data.time
      }
    })
    .then(res => {
      const currentData = {
        inc: data.inc,
        station: data.station,
        type: data.type,
        department: data.department,
        state: 0,
        process: ['一面'],
        id: res._id,
        lastTime: data.time
      }
      console.log(res, 'put Card')
      db.collection('cardList').where({
        _openid: "oWKed5HVmLGYeOrgnX_c7EDsFGjA"
      }).update({
        data: {
          card: _.push(currentData)
        }
      }).then(res => {
        wx.hideLoading({
          success: (res) => {},
        })
        console.log(res, 'addCardList')
        if(res.errMsg == "collection.update:ok") {
          this.hideModal()
          wx.showToast({
            title: '添加成功',
          })
          that.getCardList()
        }
      }).catch(error => {
        console.log(error)
      })
    })
    .catch(console.error)
  },
  getCardList () {
    db.collection('cardList').where({
      _openid: "oWKed5HVmLGYeOrgnX_c7EDsFGjA"
    }).get().then(res => {
      this.setData({
        tableData: res.data[0].card
      })
      console.log(res.data[0].card, 'getCardList')
    })
  },
  closeSubmitCard () {
    console.log('close down')
    this.addInc = ''
    this.addType = ''
    this.addStation = ''
    this.addDepartment = ''
    this.setData({
      addInc: '',
      addType: '',
      addStation: '',
      addDepartment: ''
    })
    console.log(this.addType, this.addInc, this.addStation, this.addDepartment)
  },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
    let { user } = app.store.getState();
    user.name = "张三";
    app.store.setState({
      user,
    });
     console.log(this.data.$state, 'msg')
     console.log(this.data.$state.id, 'id')
   },
 
   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {
     this.getCardList()
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