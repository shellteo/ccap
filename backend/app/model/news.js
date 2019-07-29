/* indent size: 1 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('news', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    symbol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    media: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    publishTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    mediaLogo: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
    },
    link: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: '',
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'news',
    timestamps: false,
  });

  Model.associate = function() {

  };

  return Model;
};
