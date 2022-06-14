const crypto = require('crypto')

module.exports = {
  MD5_SUFFIX: {
    OUTER: 'crazydb_passwordSuffix_RgKR*%fWKi44L3Z5',
    INNER: 'crazydb_passwordSuffix_R^P@Bl*kQ2b*2Kpm'
  },
  md5: (pwd) => {
    let md5 = crypto.createHash('md5')
    return md5.update(pwd).digest('hex')
  },
  secretKey: 'crazydb_secretKey_b6vj$tV<yw2T!4dD'
}
