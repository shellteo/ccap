/* indent size: 1 */

module.exports = app => {
	const DataTypes = app.Sequelize;

	const Model = app.model.define('stage', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		symbol: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		stage: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		start: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		end: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		bonuses: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		softcap: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		hardcap: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		personalcap: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		}
	}, {
		tableName: 'stage',
		timestamps: false
	});

	Model.associate = function() {

	}

	return Model;
};
