/* indent size: 1 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
    },
    bio: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: '',
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    lastLoginTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    lastLoginIP: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    emailStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0',
    },
    mobile: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
    },
    mobileStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0',
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0',
    },
  }, {
    tableName: 'user',
    timestamps: false,
  });

  Model.associate = function() {

  };

  return Model;
};
