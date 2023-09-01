import { parseError } from './parseError.js';

class Logger {
  private appName: string = 'Logger';

  public setAppName(appName: string) {
    this.appName = appName;
  }

  public log(msg: any): void {
    console.log('\x1b[34m%s\x1b[0m', `[${this.appName}] ` + msg);
  }

  public error(msg: any): void {
    console.log('\x1b[31m%s\x1b[0m', `[${this.appName}] ` + parseError(msg));
  }

  public info(msg: any): void {
    console.log('\x1b[33;1m%s\x1b[0m', `[${this.appName}] ` + msg);
  }
}

export const logger = new Logger();
