let env = process.env.NODE_ENV || 'dev';

if (env === 'prod' || env === 'dev') {
  let config = require('./config.json');
  let envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  })
  console.log(envConfig);

}