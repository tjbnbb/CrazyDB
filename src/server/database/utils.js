const utils = {
  orm: function () {
    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('crazydb', 'root', 'zzmzzm521', {
      host: '127.0.0.1',
      port: '3306',
      dialect: 'mysql',
      dialectOptions: {connectTimeout: 5000} // mysqldb connector option
    })
    return sequelize
  },
  getCascadedLocation: async function (location) {
    const orm = utils.orm()
    const Locations = orm.import('./models/Locations')
    const cascadedLocation = []
    while (location != null) {
      console.log(location)
      cascadedLocation.push(location)
      await Locations.findOne({
        where: {
          location: location
        },
        attributes: ['father']
      })
        .then(project => {
          location = project.get().father
        })
    }
    return cascadedLocation.reverse()
  }
}

module.exports = utils
