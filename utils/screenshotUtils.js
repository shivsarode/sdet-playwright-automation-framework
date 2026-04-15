const fs = require('fs');
const path = require('path');

class ScreenshotUtils {

    async takeScreenshot(page, name = 'screenshot') {

        const dir = path.join(process.cwd(), 'reports', 'screenshots');

        // create folder if not exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const filePath = path.join(dir, `${name}_${Date.now()}.png`);

        await page.screenshot({
            path: filePath,
            fullPage: true
        });
    }

}

module.exports = new ScreenshotUtils();