const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const {
  addCucumberPreprocessorPlugin,
  afterRunHandler,
} = require('@badeball/cypress-cucumber-preprocessor')
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild')
const fs = require('fs')

const setupNodeEvents = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config, {
    omitAfterRunHandler: true,
  })

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    }),
  )

  on('after:run', async (results) => {
    if (results) {
      await afterRunHandler(config)
      fs.writeFileSync(
        'cypress/reports/results.json',
        JSON.stringify(
          {
            browserName: results.browserName,
            browserVersion: results.browserVersion,
            osName: results.osName,
            osVersion: results.osVersion,
            nodeVersion: results.config.resolvedNodeVersion,
            cypressVersion: results.cypressVersion,
            startedTestsAt: results.startedTestsAt,
            endedTestsAt: results.endedTestsAt,
          },
          null,
          '\t',
        ),
      )
    }
  })
  return config
}

module.exports = defineConfig({
  e2e: {
    baseUrl: "urlSite",
    specPattern: "**/*.feature",
    watchForFileChanges: false,
    video: false,
    setupNodeEvents,
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,//timeout ms
    retries: 10, //configure the retry attempts for all tests run in both cypress run and cypress open
    env: {
      "xpath": true
    }
  },
})