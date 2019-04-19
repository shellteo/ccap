/* indent size: 1 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('comment', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ieoId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    createUserEmail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    createUserName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
    },
    createUserAvatar: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: '',
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'comment',
    timestamps: false,
  });

  Model.associate = function() {

  };

  return Model;
};
