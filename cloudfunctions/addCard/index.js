// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let compete = false
  console.log(event, 'card event')
  let inc = event.inc
  let station = event.station
  let department = event.department
  let type = event.type
  db.collection('cardDetail').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      inc: inc,
      station: station,
      department: department,
      type: type,
      createTime: db.serverDate()
    }
  })
  .then(res => {
    db.collection('cardList').add({
      data: {
        cardId: res._id
      }
    }).then({
      compete = true
    }).catch(error => {
      console.log(error)
    })
  }).catch( error => {
    console.log(error)
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    compete
  }
}