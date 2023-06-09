var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import chalk from 'chalk';
import ora from 'ora';
import { injectable } from 'inversify';
// TODO: Refactor to use more flexible way to colorize text
export class OutputService {
}
let DefaultOutputService = class DefaultOutputService {
    printGreen(coloredMessage, message) {
        this.hideSpinner();
        console.log(chalk.green(coloredMessage), message);
    }
    printGray(coloredMessage, message) {
        this.hideSpinner();
        console.log(chalk.grey(coloredMessage), message);
    }
    printRed(coloredMessage, message) {
        this.hideSpinner();
        console.log(chalk.red(coloredMessage), message);
    }
    error(message) {
        this.printRed('ERROR', message);
    }
    showSpinner(text) {
        if (this.spinner) {
            this.spinner.stop();
        }
        this.spinner = ora({
            text,
            spinner: 'bouncingBar',
        });
        this.spinner.start();
    }
    hideSpinner() {
        if (this.spinner) {
            this.spinner.stop();
        }
    }
};
DefaultOutputService = __decorate([
    injectable()
], DefaultOutputService);
export { DefaultOutputService };
