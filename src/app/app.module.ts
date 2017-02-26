import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsModal } from '../modals/settings/settings';
import { Storage } from '@ionic/storage';

export function provideStorage() {
  return new Storage(['sqlite', 'websql', 'indexeddb'], { name: '__mydb' });
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsModal
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsModal
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: Storage, useFactory: provideStorage }
    ]
})
export class AppModule {}
