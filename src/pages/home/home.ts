import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { ModalController, NavController } from 'ionic-angular';

import { conversionInterface } from '../../interfaces/interfaces';
import { SettingsModal } from '../../modals/settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  storage: Storage;
  forex: Array<Object>;
  baseCurrency: string;
  nonBaseCurrency: string;
  noCurrencySet: boolean = false;
  currencyConversions: Array<conversionInterface> = [];

  constructor(public navCtrl: NavController, storage: Storage, public http: Http, public modalCtrl: ModalController) {
    this.storage = storage;
    this.loadConversions();
  }

  openCurrencySettingsModal() {
    let settingsModal = this.modalCtrl.create(SettingsModal);
    settingsModal.present();

    settingsModal.onDidDismiss(() => {
      this.loadConversions();
    });
  }

  loadConversions() {
    this.currencyConversions = [];
    this.storage.ready().then(() => {
      this.storage.get('forex').then((forex) => {
        this.storage.get('baseCurrency').then((baseCurrency) => {
          this.storage.get('nonBaseCurrency').then((nonBaseCurrency) => {
            this.forex = forex;
            this.baseCurrency = baseCurrency;
            this.nonBaseCurrency = nonBaseCurrency;

            if(this.forex === null || this.baseCurrency === null || this.nonBaseCurrency === null) {
              this.noCurrencySet = true;
            } else {
              let nonBaseValue: number = this.forex[this.nonBaseCurrency];
              let intervals: Array<number> = [1,5,10,20,30,50,75,100];

              for(let i = 0; i < intervals.length; i++) {
                let conversion = {
                  base: intervals[i].toFixed(2),
                  nonBase: (intervals[i] * nonBaseValue).toFixed(2)
                };
                this.currencyConversions.push(conversion);
              }
            }
          });
        });
      });
    });
  }

  refreshForex() {
    this.storage.ready().then(() => {
      this.storage.get('baseCurrency').then((baseCurrency) => {
        this.http.get('http://api.fixer.io/latest?base='+baseCurrency).subscribe(res => {
          this.storage.set('forex', res.json().rates);
          this.loadConversions();
        });
      });
    });
  }

}
