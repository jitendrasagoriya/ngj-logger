import { LogWebApi } from './log-web-api';
import { LogLocalStorage } from './log-local-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogPublisherConfig } from './log-publisher-config';
import { LogConsole } from './logConsole';
import { Injectable } from '@angular/core';
import { LogPublisher } from './logPublisher';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

const PUBLISHERS_FILE = 'assets/log-publishers.json';

@Injectable()
export class LogPublishersServiceService {

  constructor(private http: HttpClient) {
    // Build publishers arrays
    this.buildPublishers();
  }
  // Public properties
  publishers: LogPublisher[] = [];
  // Build publishers array
  buildPublishers(): void {
    let logPub: LogPublisher;
    this.getLoggers().subscribe(response => {
      for (const pub of response.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case 'console':
            logPub = new LogConsole();
            break;
          case 'localstorage':
            logPub = new LogLocalStorage();
            break;
          case 'webapi':
            logPub = new LogWebApi(this.http, pub.loggerLocation, pub.token);
            break;
        }
        // Set location of logging
        logPub.location = pub.loggerLocation;
        // Add publisher to array
        this.publishers.push(logPub);
      }
    });
  }

  getLoggers(): Observable<LogPublisherConfig[]> {

    const options = { params: {},
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }) };
    return this.http.get<any>(PUBLISHERS_FILE, options)
      .pipe(
        catchError(this.handleErrors)
      );
  }

  private handleErrors(error: any):
                 Observable<any> {
    const errors: string[] = [];
    let msg = '';

    msg = 'Status: ' + error.status;
    msg += ' - Status Text: ' + error.statusText;
    if (error.json()) {
      msg += ' - Exception Message: ' +
             error.json().exceptionMessage;
    }
    errors.push(msg);

    console.error('An error occurred', errors);

    return Observable.throw(errors);
  }
}
