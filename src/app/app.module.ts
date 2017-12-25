import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/index';
import { MatSelectModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GanttChart } from 'angular-gantt-chart';
import { SystemService } from './core/system.service'
import { RequestInterceptor } from './core/request.interceptor';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './core/side-menu/side-menu.component';
import { HeaderComponent } from './core/header/header.component';
import { MainComponent } from './core/main/main.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    HeaderComponent,
    MainComponent,
    FilterPanelComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    GanttChart,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    SystemService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
