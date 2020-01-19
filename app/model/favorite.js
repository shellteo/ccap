/* indent size: 1 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('favorite', {
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
    createUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'favorite',
    timestamps: false,
  });

  Model.associate = function() {

  };

  return Model;
};
