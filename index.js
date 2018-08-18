const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const options = new chrome.Options();
options.addArguments("--incognito");

const uid = process.env.UID;
const psw = process.env.PSW;

(async function example() {
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    try {
        // 登入
        await driver.get('https://accounts.google.com/');
        //await driver.get('https://firebase.google.com/');
        //await driver.findElement(By.linkText('登入')).click();
        //await driver.wait(until.urlContains('accounts.google.com'), 5000);
        await driver.findElement(By.id('identifierId')).sendKeys(uid);
        
        await driver.sleep(10000);
        await driver.findElement(By.id("identifierNext")).click();


        //await driver.findElement(By.name('identifier')).sendKeys(uid, Key.RETURN);
        await driver.wait(until.elementLocated(By.name('password')), 50000);
        await driver.findElement(By.name('password')).sendKeys(psw, Key.RETURN);
        await driver.wait(until.titleIs('Firebase'), 10000);
        // 登入完成
        await driver.wait(() => {}, 10000)
    }
    catch(error) {
        console.error(error.message);
    }
    finally {
        await driver.quit();
    }
})();
