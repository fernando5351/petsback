require('dotenv').config();

const config = {
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    database: {
        name: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        URI: process.env.DATABASE_URI,
        URI_TEST: process.env.DATABASE_URI_TEST,
    },
    mail: {
        mail: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD
    },
    jwt: {
        secrete: process.env.JWT_SECRET,
        recovery: process.env.JWT_RECOVERY_PASSWORD
    }
}

module.exports = config;