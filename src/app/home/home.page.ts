import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {

  constructor(private iab: InAppBrowser) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  openBrowser() {
    const browser = this.iab.create('https://ionicframework.com/');
    browser.show();
  }
}
