const {CronJob} = require('cron');
const dayjs = require('dayjs');
const uts = require('dayjs/plugin/utc');
const OAuth = require('../DataBase/OAuth');


dayjs.extend(uts);

module.exports = new CronJob(
    '* * 2 * * *',
    async function () {
        try {
            console.log('Start removing token')
            const monthAgo = dayjs().utc().subtract(1, 'month');

            await OAuth.deleteMany({createdAt: { $lte: monthAgo}});
            console.log('End removing token')
        } catch (e) {
            console.log(e);
        }
    },
);