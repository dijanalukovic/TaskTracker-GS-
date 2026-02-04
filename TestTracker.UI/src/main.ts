import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

console.log('Starting Angular application...');

bootstrapApplication(App, appConfig)
  .then(() => {
    console.log('Angular application started successfully');
  })
  .catch((err) => {
    console.error('Error starting Angular application:', err);
  });
