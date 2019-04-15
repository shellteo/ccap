const EggSequelizeAuto = require('egg-sequelize-auto');
const auto = new EggSequelizeAuto('ieo', 'root', 'root', {
  host: '',
  dialect: 'mysql',
  port: '3306',
  dialectOptions: {
    multipleStatements: true,
  },
  additional: {
    timestamps: false,
  },
});
auto.run(function(err) {
  if (err) throw err;
  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});
