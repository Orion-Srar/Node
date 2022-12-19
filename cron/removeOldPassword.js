const {CronJob} = require('cron');
const dayjs = require('dayjs');
const uts = require('dayjs/plugin/utc');
const OldPassword = require('../DataBase/OldPassword');


dayjs.extend(uts);

module.exports = new CronJob(
    '* */30 * * * *',
    async function () {
        try {
            console.log('Start removing passwords')
            const yearAgo = dayjs().utc().subtract(1, 'year');

            await OldPassword.deleteMany({createdAt: { $lte: yearAgo}});
            console.log('End removing passwords')
        } catch (e) {
            console.log(e);
        }
    },
);