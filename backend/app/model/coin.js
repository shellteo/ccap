/* indent size: 1 */

module.exports = app => {
	const DataTypes = app.Sequelize;

	const Model = app.model.define('coin', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		logo: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ''
		},
		symbol: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		coin_name: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		shortname: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		slug: {
			type: DataTypes.STRING(400),
			allowNull: true,
			defaultValue: ''
		},
		display_symbol: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		display: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		release_date: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		ico_price: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		today_open: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: '0.000000000000000000'
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		start: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		end: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		is_promoted: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		message: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		website: {
			type: DataTypes.STRING(400),
			allowNull: true,
			defaultValue: ''
		},
		whitepaper: {
			type: DataTypes.STRING(400),
			allowNull: true,
			defaultValue: ''
		},
		total_supply: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		supply: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		platform: {
			type: DataTypes.STRING(400),
			allowNull: true,
			defaultValue: ''
		},
		how_to_buy_url: {
			type: DataTypes.STRING(400),
			allowNull: true,
			defaultValue: ''
		},
		trading_since: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		stages_start: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		stages_end: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		belong: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		rating: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		createTime: {
			type: DataTypes.BIGINT,
			allowNull: false
		}
	}, {
		tableName: 'coin',
		timestamps: false
	});

	Model.associate = function() {

	}

	return Model;
};