const merge = require('lodash.merge');
const debug = require('debug')('jest-puppeteer-react');

async function render(reactNode, options) {
    const { currentTestName } = expect.getState();
    debug('rendering for testname ' + currentTestName);
    const config = global._jest_puppeteer_react_default_config;
    const opts = merge({}, config.renderOptions, options);
    const host = config.useDocker ? config.dockerHost : 'localhost';

    const url = `http://${host}:${config.port}?test=${encodeURIComponent(
        currentTestName
    )}`;

    const timeoutConfig = {};
    if (opts.timeout) {
        timeoutConfig.timeout = opts.timeout;
    }

    debug('page.goto ' + url);
    await page.goto(url, timeoutConfig);

    if (opts.viewport) {
        debug('setting a viewport from options');
        await page.setViewport(opts.viewport);
    }

    return page;
}

module.exports = render;
