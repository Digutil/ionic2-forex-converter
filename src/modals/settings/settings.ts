import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'modal-settings',
  templateUrl: 'settings.html'
})

export class SettingsModal {
  storage: Storage;
  baseCurrency: string;
  nonBaseCurrency: string;
  availableCurrencies: Array<string> = [];

  constructor(public navCtrl: NavController, storage: Storage) {
    this.availableCurrencies = ["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","GBP","HKD","HRK","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD","EUR", "ZAR"].sort();

    this.storage = storage;
    this.storage.ready().then(() => {
      this.storage.get('baseCurrency').then((val) => {
        this.baseCurrency = val;
      });

      this.storage.get('nonBaseCurrency').then((val) => {
        this.nonBaseCurrency = val;
      });
    });

  }

  closeModal() {
    this.navCtrl.pop();
  }

  updateBaseCurrency(value) {
    this.storage.ready().then(() => {
      this.storage.set('baseCurrency', value);
    });
  }

  updateNonBaseCurrency(value) {
    this.storage.ready().then(() => {
      this.storage.set('nonBaseCurrency', value);
    });
  }

}
