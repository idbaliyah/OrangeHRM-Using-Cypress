const report = require('multiple-cucumber-html-reporter')
const dayjs = require('dayjs')
const fs = require('fs')

const data = fs.readFileSync('cypress/reports/results.json', { encoding: 'utf8', flag: 'r' })
const runInfo = JSON.parse(data)

const osName = () => {
    switch (runInfo['osName']) {
        case 'darwin':
            return 'osx'
        case 'win32':
            return 'windows'
        case 'ubuntu':
            return 'ubuntu'
        default:
            console.log('Undefined OS')
    }
}

report.generate({
    jsonDir: 'cypress/reports/json',
    reportPath: 'cypress/reports',
    metadata: {
        browser: {
            name: runInfo['browserName'],
            version: runInfo['browserVersion'],
        },
        device: 'Local Test Machine',
        platform: {
            name: osName(),
            version: runInfo['osVersion'],
        },
    },
    customData: {
        title: 'Run Info',
        data: [
            { label: 'Project', value: 'OrangeHRM' },
            { label: 'Release', value: '5.6' },
            { label: 'Test Environment', value: 'Prod' },
            { label: 'Cypress Version', value: runInfo['cypressVersion'] },
            { label: 'Node Version', value: runInfo['nodeVersion'] },
            {
                label: 'Execution Start Time',
                value: dayjs(runInfo['startedTestsAt']).format('YYYY-MM-DD HH:mm:ss.SSS'),
            },
            {
                label: 'Execution End Time',
                value: dayjs(runInfo['endedTestsAt']).format('YYYY-MM-DD HH:mm:ss.SSS'),
            },
        ],
    },
    disableLog: true,
    pageTitle: 'OrangeHRM',
    openReportInBrowser: true,
    displayDuration: true,
})