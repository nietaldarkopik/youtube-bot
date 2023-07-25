
const puppeteer = require('puppeteer');
const pte = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AnonymizeUAPlugin = require('puppeteer-extra-plugin-anonymize-ua');
const PUPPETEER_EXECUTABLE_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const { readFileSync } = require('fs');
let profile_id = 'Profile 3';
let profiles = [
    'Tuyul 5',
    'Tuyul 6',
    'Tuyul 7',
    'Tuyul 8',
];

const DEFAULT_ARGS = [
    '--disable-background-networking',
    '--enable-features=NetworkService,NetworkServiceInProcess',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-extensions-with-background-pages',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-extensions',
    // BlinkGenPropertyTrees disabled due to crbug.com/937609
    '--disable-features=TranslateUI,BlinkGenPropertyTrees',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-popup-blocking',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-sync',
    '--force-color-profile=srgb',
    '--metrics-recording-only',
    '--no-first-run',
    '--enable-automation',
    '--password-store=basic',
    '--use-mock-keychain',
];

const extensionPath = 'C:\\wamp\\nodejs\\youtube\\Chrome_ext\\';

const extscrx = [
    extensionPath + 'crx/Free-Proxy-VPN-VeePNFree-VPN-Online-for-Chrome.crx',
    extensionPath + 'crx/Free-VPN.crx',
    extensionPath + 'crx/Free-VPN-Online-ZenMateProxy-VPN-untuk-Chrome.crx',
    extensionPath + 'crx/Hoxx-VPN-Proxy.crx',
    extensionPath + 'crx/IP-Unblock-by-1clickVPN.crx',
    extensionPath + 'crx/NordVPNVPN-Proxy-for-Privacy-and-Security.crx',
    extensionPath + 'crx/Proxy-VPN-dan-pemblokir-iklan-gratisPlanet-VPN.crx',
    extensionPath + 'crx/Safum-free-VPN.crx',
    extensionPath + 'crx/Urban-VPN-Proxy.crx',
    extensionPath + 'crx/VPN-FreeBetternet-Unlimited-VPN-Proxy.crx',
    extensionPath + 'crx/VPN-Free-UnlimitedVPNLY.crx',
    extensionPath + 'crx/Blaze-Hoxx-VPN-proxy.crx',
    extensionPath + 'crx/Browsec-VPNFree-VPN-for-Chrome.crx'
];

const exts = [
    extensionPath + 'files/Blaze-Hoxx-VPN-proxy'
    //extensionPath + 'files/Browsec-VPNFree-VPN-for-Chrome',
    //extensionPath + 'files/Free-Avira-Phantom-VPN-–-Unblock-Websites',
    //extensionPath + 'files/Free-Proxy-VPN-VeePNFree-VPN-Online-for-Chrome',
    //extensionPath + 'files/Free-VPN',
    //extensionPath + 'files/Free-VPN-Online-ZenMateProxy-VPN-untuk-Chrome',
    //extensionPath + 'files/Hoxx-VPN-Proxy',
    //extensionPath + 'files/IP-Unblock-by-1clickVPN'
];

/* const extensionPath = 'C:\\wamp\\nodejs\\youtube\\Chrome_ext\\';
exts.forEach(function(v,i){
    const crxBuffer = readFileSync(extensionPath+v);
    //const browserWithExtension = addExtra(puppeteer);
    pte.use(require('chrome-extensions')(crxBuffer));
});
 */
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function openMultipleBrowsers() {
    const numBrowsers = profiles.length; // Set the number of browsers you want to open

    try {

        pte.use(StealthPlugin());
        pte.use(AnonymizeUAPlugin());
        //let str_exts = exts.map(extension => `--load-extension=${extension} `);
        let str_exts = exts.join();
        console.log(str_exts);

        const browsers = await Promise.all(
            //await profiles.map(async (v) => await pte.launch({
            //await profiles.forEach(async v => await pte.launch({
            Array.from(profiles, async (v) => await pte.launch({
                    executablePath: PUPPETEER_EXECUTABLE_PATH,
                    headless: false,
                    //userDataDir: 'C:\\Users\\ExistCode.co.id\\AppData\\Local\\Google\\Chrome\\User Data',
                    //userDataDir: 'C:\\wamp\\nodejs\\youtube\\User_Data',
                    args: [
                        '--user-data-dir=C:\\wamp\\nodejs\\youtube\\User_Data',
                        //'--user-data-dir=C:\\Users\\ExistCode.co.id\\AppData\\Local\\Google\\Chrome\\User Data',
                        '--profile-directory=Tuyul 10', //' + v + '"',
                        '--no-sandbox',
                        //'--disable-setuid-sandbox',
                        //'--disable-web-security',
                        //'--disable-features=IsolateOrigins',
                        //'--disable-site-isolation-trials'
                        '--disable-extensions-except=' +str_exts,
                        '--load-extension=' +str_exts,
                    ],
                    ignoreDefaultArgs: ["--enable-automation", '--disable-extensions', '--disable-site-isolation-trials', '--disable-blink-features'],
                    defaultViewport: null,
                    devtools: false,
                    ignoreHTTPSErrors: true,
                    //ignoreDefaultArgs: ['--disable-extensions']
                })
                /* .then(async browser => {
                    const page = await browser.newPage();
                    await page.goto('https://www.google.com');
                }) */
            )
        );
        console.log(browsers);
        const pages = [];
        
        for (const browser of browsers) {
            //const page = await browser.newPage();
            const page = await browser.pages();
            pages.push(page);

            await page[0].goto('https://www.google.com'); // Replace with the URL you want to visit

            // You can perform various actions on each page here, independently.

            // Optional: You can also set different user agents or other configurations for each browser.
        }
        /* 
        */
        // Optionally, you can wait for some time and then close the browsers and pages.
        // This example waits for 10 seconds before closing the browsers.

        //await new Promise((resolve) => setTimeout(resolve, 10000));

        // Close all pages and browsers.
        /* for (const page of pages) {
            await page.close();
        }

        for (const browser of browsers) {
            await browser.close();
        } */
    } catch (error) {
        console.error('Error opening multiple browsers:', error.message);
    }
}

openMultipleBrowsers();