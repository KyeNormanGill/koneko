module.exports = (sequelize, DataTypes) => {
	return sequelize.define('commands', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'Not setup!'
		},
		mod: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		}
	}, {
		indexes: [
			{ fields: ['name'] }
		]
	});
};
