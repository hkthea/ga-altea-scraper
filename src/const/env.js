const dotenv = require('dotenv');

dotenv.config();

let whitelist_ip=process.env.WHITELIST_IP && process.env.WHITELIST_IP.split('|');

const ENVIRONMENT = {
    port:process.env.PORT,
    altea_username:process.env.ALTEA_USERNAME,
    altea_password:process.env.ALTEA_PASSWORD,
    altea_process_count:process.env.ALTEA_PROCESS_COUNT,
    whitelist:whitelist_ip,
    redis_host:process.env.REDIS_HOST,
    redis_port:process.env.REDIS_PORT,
    redis_user:process.env.REDIS_USER,
    redis_password:process.env.REDIS_PASSWORD,
    rabbit_host:process.env.RABBIT_HOST,
    rabbit_port:process.env.RABBIT_PORT,
    rabbit_username:process.env.RABBIT_USERNAME,
    rabbit_password:process.env.RABBIT_PASSWORD,
    imap_username:process.env.IMAP_USERNAME,
    imap_host:process.env.IMAP_HOST,
    imap_password:process.env.IMAP_PASSWORD,
    imap_port:process.env.IMAP_PORT,
    imap_use_tls:process.env.IMAP_TLS,
    instance_puppet:process.env.INSTACE_PUPPET
}

module.exports = ENVIRONMENT;