const orm = require('./utils').orm()

const MODEL_INIT_LIST = [
  'Locations',
  'Employees',
  'Members',
  'Dispatchers',
  'Receptionists',
  'WareHouseManagers',
  'HumanResources',
  'Transports',
  'WareHouses',
  'Packages',
  'DispatchPairs',
  'Trackings',
  'PackageReceptionists'
]

const MODELS = []

for (const x of MODEL_INIT_LIST) {
  MODELS.push(orm.import('./models/' + x))
}

async function forceSyncModels (MODELS) {
  for (const model of MODELS.reverse()) {
    await model.sync({force: true})
  }
}

async function forceDropModels (MODELS) {
  for (const model of MODELS.reverse()) {
    await model.drop()
  }
}

orm
  .authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.')
    await forceDropModels(MODELS)
    await forceSyncModels(MODELS) // 坑：reverse 是作用在原数组上的，不是搞了个新的返回
    console.log('Sync() succeed.')
    console.log('导入默认城市数据……')
    const Locations = await orm.import('./models/Locations')
    await Locations.create({location: '湖南', father: null})
    await Locations.create({location: '长沙', father: '湖南'})
    await Locations.create({location: '株洲', father: '湖南'})
    await Locations.create({location: '湘潭', father: '湖南'})
    await Locations.create({location: '衡阳', father: '湖南'})
    await Locations.create({location: '邵阳', father: '湖南'})
    await Locations.create({location: '岳阳', father: '湖南'})
    await Locations.create({location: '芙蓉区', father: '长沙'})
    await Locations.create({location: '天心区', father: '长沙'})
    await Locations.create({location: '岳麓区', father: '长沙'})
    await Locations.create({location: '开福区', father: '长沙'})
    await Locations.create({location: '雨花区', father: '长沙'})
    await Locations.create({location: '望城区', father: '长沙'})
    await Locations.create({location: '五一广场', father: '芙蓉区'})
    await Locations.create({location: '长沙生态动物园', father: '天心区'})
    await Locations.create({location: '湖南大学', father: '岳麓区'})
    await Locations.create({location: '橘子洲', father: '岳麓区'})
    await Locations.create({location: '北辰三角洲', father: '开福区'})
    console.log('新建超级管理员账户……')
    const Employees = await orm.import('./models/Employees')
    await Employees.create({
      name:	'admin',
      phone: '13000000000',
      birthday: '2022-06-08',
      salary: '123456789'
    })
      .then(async member => {
        const Members = await orm.import('./models/Members')
        await Members.update({
          email: 'admin@crazydb.com',
          password: 'crazydb_passwordSuffix_RgKR*%fWKi44L3Z56764ef2db5ce55ecd8f001779e295489'
        }, {
          where: {
            uuid: member.uuid
          }
        })
          .then(async () => {
            const HR = await orm.import('./models/HumanResources')
            await HR.create({
              hr_id: member.uuid
            })
            const RC = await orm.import('./models/Receptionists')
            await RC.create({
              receptionist_id: member.uuid
            })
            const TP = await orm.import('./models/Transports')
            await TP.create({
              transport_id: member.uuid
            })
            const WH = await orm.import('./models/WareHouseManagers')
            await WH.create({
              manager_id: member.uuid
            })
            const DP = await orm.import('./models/Dispatchers')
            await DP.create({
              uuid: member.uuid
            })
            console.log('=====================================================')
            console.log('初始化完成，请不要再次执行该函数，否则会清空所有数据并重新建表！')
            console.log('超级管理员：admin@crazy.com，密码：crazydb')
            console.log('超级管理员具有所有权限，一旦完成初始信息录入，建议立即废止账户！')
            process.exit()
          })
      })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
