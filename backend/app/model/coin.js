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
		description_zh: {
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
			type: DataTypes.TEXT,
			allowNull: true
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
		social: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		belong: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		rating: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		detail_link: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		init_price: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		launchpad: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		roi: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		for_sale: {
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
		raised: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		bonuses: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: ''
		},
		bounties: {
			type: DataTypes.STRING(200),
			allowNull: true,
			defaultValue: ''
		},
		distribution: {
			type: DataTypes.STRING(400),
			allowNull: true,
			defaultValue: ''
		},
		createTime: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		isDelete: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 0
		}
	}, {
		tableName: 'coin',
		timestamps: false
	});

	Model.associate = function() {

	}

	return Model;
};
