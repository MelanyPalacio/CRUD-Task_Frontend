import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'tasks', component: TaskListComponent },
      { path: 'tasks/new', component: TaskFormComponent },
      { path: 'tasks/edit/:id', component: TaskFormComponent },
      { path: '', redirectTo: '/tasks', pathMatch: 'full' }
    ]),
    provideHttpClient(withFetch()),
  ]
};
