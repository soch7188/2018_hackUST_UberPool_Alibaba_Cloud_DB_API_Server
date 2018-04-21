const Sequelize = require('sequelize');
const config = require('../../configs')

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password, {
			// For Korean support
			charset: 'utf8',
			collate: 'utf8_general_ci',

        timezone: '+08:00', //here you can pass timezone

      logging: config.mysql.logging,
      host: config.mysql.host,
      dialect: 'mysql',

      define: {
          // don't add the timestamp attributes (updatedAt, createdAt)
          timestamps: true,

          // don't delete database entries but set the newly added attribute deletedAt
          // to the current date (when deletion was done). paranoid will only work if
          // timestamps are enabled
          paranoid: false,

          // don't use camelcase for automatically added attributes but underscore style
          // so updatedAt will be updated_at
          underscored: false,

          // disable the modification of tablenames; By default, sequelize will automatically
          // transform all passed model names (first parameter of define) into plural.
          // if you don't want that, set the following
          freezeTableName: false,
      }
    }
);

const Ride = sequelize.define('ride', {
    ride_id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    ride_time: Sequelize.INTEGER,

    ride_passenger_number: Sequelize.INTEGER,
    ride_passenger_1: Sequelize.INTEGER,
    ride_passenger_2: Sequelize.INTEGER,
    ride_passenger_3: Sequelize.INTEGER,
    ride_passenger_4: Sequelize.INTEGER,
    ride_passenger_5: Sequelize.INTEGER,
    ride_passenger_6: Sequelize.INTEGER,
    ride_passenger_7: Sequelize.INTEGER,

    est_fare: Sequelize.INTEGER,
    est_time: Sequelize.INTEGER,

    from: Sequelize.STRING,
    to: Sequelize.STRING,
});

const User = sequelize.define('user', {
    user_id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    firebase_id: Sequelize.STRING,
	name: Sequelize.STRING,
	phone: Sequelize.STRING,
	gender: Sequelize.STRING,
});

const UserTakeRide = sequelize.define('user_take_ride', {
    take_id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    user_id: Sequelize.INTEGER,
    ride_id: Sequelize.INTEGER,
});

module.exports = {
    sequelize,
    User,
    Ride,
    UserTakeRide
};
