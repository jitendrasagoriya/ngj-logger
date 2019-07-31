import { LogPublishersServiceService } from './log-publishers-service.service';
import { Injectable } from '@angular/core';
import { LogPublisher } from './logPublisher';

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

export class WebLog {
  logTime: string;
  logDate: string;
  log: string;
  level: string;
}
export class LogEntry {
  message: string ;
  level: LogLevel;
  extraInfo: any[];
  logWithDate = true;

  private formatParams(params: any[]): string {
    let ret: string = params.join(',');
    // Is there at least one object in the array?
    if (params.some(p => typeof p === 'object')) {
      ret = '';
      // Build comma-delimited string
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }
    return ret;
  }


  private convertToLog(): WebLog {
    const webLog = new WebLog();
    const now = new Date();
    webLog.level = this.level.toString();
    webLog.logDate = now.toLocaleDateString();
    webLog.logTime = now.toLocaleTimeString();
    webLog.log = this.buildWebLogString();
    return webLog;
  }

  public buildLogString(): string {
    let result = '';
    result += '[' + LogLevel[this.level].toUpperCase() + ']';
    result += ' ';
    const now = new Date();
    result += now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    result += ' ';
    result += this.message;
    result += ' ';
    result += this.formatParams(this.extraInfo);
    return result;
  }

  public buildWebLogString(): string {
    let result = '';
    result += this.message;
    result += ' ';
    result += this.formatParams(this.extraInfo);
    return result;
  }

}
@Injectable({
  providedIn: 'root'
})
export class NgjLoggerService {
  level: LogLevel = LogLevel.All;
  logWithDate: true;
  publishers: LogPublisher[];

  constructor(private publishersService:
    LogPublishersServiceService) {
      // Set publishers
      this.publishers =
        this.publishersService.publishers;
    }


  private shouldLog(level: LogLevel): boolean {
    let ret = false;
    if ((level >= this.level &&
         level !== LogLevel.Off) ||
         this.level === LogLevel.All) {
      ret = true;
    }
    return ret;
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry();
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      for (const logger of this.publishers) {
        logger.log(entry)
          .subscribe(response =>
                     console.log(response));
      }
    }
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug,
                    optionalParams);
  }
  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info,
                    optionalParams);
  }
  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn,
                    optionalParams);
  }
  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error,
                    optionalParams);
  }
  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal,
                    optionalParams);
  }
  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All,
                    optionalParams);
  }
}
