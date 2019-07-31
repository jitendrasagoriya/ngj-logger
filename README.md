# NgjLogger

* This is a simple configurable libery uresd for logging for angular application.
* Simple to use.Simple to confiure.
* You can log in three different type.(console, local storage,Web api).
* It is developed using Angular >=8.0.0 and its newly introduced ng g library schematics.

## Installation
npm i ngj-logger

## How to use
First you have to configure Log. For that you have to add `log-publishers.json' in your `assets` folder.

    [
        {
          "loggerName": "console",
          "loggerLocation": "",
          "token": "",
          "isActive": true
        },    
        
        Below is optional. If you want to write your log on server you need to create 
        account in logging DashBoard.
        https://jitendrasagoriya.github.io/sign-up
        {
          "loggerName": "webapi",
          "loggerLocation": "https://jitendrasagoriya.github.io/",
          "token": "<Your Token>",
          "isActive": true
        }
    ]

Add  NgjLoggerService,LogPublishersServiceService in app.module.ts

            import { LogPublishersServiceService } from 'ngj-logger';
            import { NgjLoggerService } from 'ngj-logger';
            
            .
            .
            .
            
            providers: [
            ....,
            NgjLoggerService,
            LogPublishersServiceService
            ]

Add in constructor of component where you want to use.

          constructor(....,
              private logger: NgjLoggerService)
              
Use.
    
           this.logger.info('Your Message') / this.logger.info('Your Message', optional any[]) 
           like : this.logger.info('Your Message',['India','UK','USA','France','etc']) 
           Or 
           this.logger.debug('Your Message') / this.logger.debug('Your Message', optional any[])
           like : this.logger.debug('Your Message',['India','UK','USA','France','etc'])  
           Or 
           this.logger.error('Your Message') / this.logger.Error('Your Message', optional any[])
           like : this.error.info('Your Message',['India','UK','USA','France','etc'])  
 
## Running unit tests

Run `ng test ngj-logger` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
