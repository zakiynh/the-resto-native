const Redis = require("ioredis");
const redis = new Redis({
  host: "redis-15354.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 15354,
  password: process.env.PASSWORD,
});

module.exports = redis;
