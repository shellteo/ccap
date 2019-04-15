/* indent size: 1 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('ieo', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    symbol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
    },
    bio: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: '',
    },
    logo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    exchange: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    platform: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    exchangeLink: {
      type: DataTypes.STRING(400),
      allowNull: false,
      defaultValue: '',
    },
    platformLink: {
      type: DataTypes.STRING(400),
      allowNull: false,
      defaultValue: '',
    },
    detailLink: {
      type: DataTypes.STRING(400),
      allowNull: false,
      defaultValue: '',
    },
    website: {
      type: DataTypes.STRING(400),
      allowNull: false,
      defaultValue: '',
    },
    startTime: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    endTime: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'ieo',
    timestamps: false,
  });

  Model.associate = function() {

  };

  return Model;
};
