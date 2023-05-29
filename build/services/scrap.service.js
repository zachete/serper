import _ from 'lodash';
import { OutputService } from './output.service.js';
import { prepareUrl } from '../utils/prepare-url.js';
export class ScrapService {
    constructor(browser) {
        this.scrapExcludes = [];
        this.hostname = null;
        this.browser = browser;
        this.outputService = new OutputService();
    }
    async run({ url: rawUrl, selector, next }) {
        const url = prepareUrl(rawUrl);
        if (!this.hostname) {
            const urlObj = new URL(url);
            this.hostname = urlObj.hostname;
        }
        if (this.scrapExcludes.includes(url)) {
            return;
        }
        this.scrapExcludes.push(url);
        const page = await this.browser.newPage();
        await page.goto(url);
        await page.waitForSelector('body > div');
        const links = await page.$$eval('a', (items) => {
            return items.map((item) => item.href);
        });
        const hasSelector = await page.$$eval(selector, (items) => items.length);
        if (hasSelector) {
            this.outputService.printGreen('FOUNDED', url);
        }
        else {
            this.outputService.printGray('CHECKED', url);
        }
        const uniqueLinks = _.uniq(links);
        const processedLinks = this.filterLinks(uniqueLinks);
        processedLinks.map((item) => {
            next(item);
        });
    }
    filterLinks(links) {
        return links.filter((item) => {
            if (!item) {
                return;
            }
            if (item.startsWith('tel:') || item.startsWith('mailto:')) {
                return;
            }
            const hostname = new URL(item).hostname;
            if (hostname && hostname !== this.hostname) {
                return;
            }
            return true;
        });
    }
}