// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()
  console.log(OPENID, APPID, UNIONID, 'get')
  return {
    OPENID,
    APPID,
    UNIONID,
  }
}