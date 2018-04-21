var prodDbKeys = require('./prod_db_keys');

const environments = {
    local: {
        mysql: {
          host: 'rm-3ns8608177d6kt702qo.mysql.rds.aliyuncs.com',
          username: 'changdong',
          password: 'ckdehd123!',
          database: 'uberpool',
          logging: console.log
        },
        apikey: '9Y3-7bE-Ud3-7Ja',
        jwt_secret: "9Y3-7bE-Ud3-7Ja"
    },
    production: {
        mysql: {
        host: prodDbKeys.host,
        username: prodDbKeys.username,
        password: prodDbKeys.password,
        database: prodDbKeys.database,
        logging: console.log
        },
        apikey: prodDbKeys.apikey,
        jwt_secret: prodDbKeys.jwt_secret
    }
}

const nodeEnv = process.env.NODE_ENV || 'local';
module.exports = environments[nodeEnv];
