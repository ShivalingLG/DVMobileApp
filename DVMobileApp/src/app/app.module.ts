import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SummaryPage } from '../pages/summary/summary';
import { ArchivePage } from '../pages/archive/archive';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { VachanasAPI, TodaysVachana } from '../../src/providers/Vachanas';
//import { LocalNotifications } from 'ionic-native/local-notifications';


@NgModule({
    declarations: [
        MyApp,
        SummaryPage,
        ArchivePage,
        HomePage,
        TabsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        SummaryPage,
        ArchivePage,
        HomePage,
        TabsPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, VachanasAPI, TodaysVachana]
    //providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Vachanas, LocalNotifications]
})
export class AppModule { }
