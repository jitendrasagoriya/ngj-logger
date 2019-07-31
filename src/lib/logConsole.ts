import { LogEntry } from './ngj-logger.service';
import { LogPublisher } from './logPublisher';
import { Observable, of } from 'rxjs';

export class LogConsole extends LogPublisher {
    log(entry: LogEntry): Observable<boolean> {
      // Log to console
      console.log(entry.buildLogString());
      return of(true);
    }
    clear(): Observable<boolean> {
      console.clear();
      return of(true);
    }
  }
