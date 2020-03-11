import { Injectable } from '@angular/core';
import { BaseDaoInterface } from './baseDaoInterface';
import { Platform } from '@ionic/angular';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements BaseDaoInterface {

  private db: SQLiteObject;

  constructor(platform: Platform, sqlite: SQLite) {
    platform.ready().then(() => {
      console.log('platform ready');

      const that = this;
      try {
        sqlite.create({
              name: 'data.db',
              location: 'default'
            })
            .then((db) => {
              console.log('HRLOWE');
              that.db = db;
              db.executeSql('create table if not exists results(x1 INTEGER, x2 INTEGER)', [])
                  .then(() => console.log('Executed SQL'))
                  .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
      } catch (e) {
        console.log('Не работает кордова))(!"');
      }
    });
  }

  async get(): Promise<[number, number][]> {
    if (this.db) {
      try {
        const queryResult = await this.db.executeSql(`SELECT * FROM results`, []);
        console.log('Executed SQL', queryResult);
        const result = [];
        for (let i = 0; i < queryResult.rows.length; i++) {
          result.push([
            queryResult.rows.item(i).x1,
            queryResult.rows.item(i).x2
          ]);
        }
        return result;
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('getlogs: db is null');
    }

    return [[0, 0]];
  }

  save(x1x2: [number, number]) {
    if (isNaN(x1x2[0]) || isNaN(x1x2[1])) {
      console.log('x1x2 is nan', x1x2);
      return;
    }

    if (this.db) {
      this.db.executeSql('INSERT INTO results VALUES(?,?)', [x1x2[0], x1x2[1]])
          .then(() => console.log('Executed SQL Insert into'))
          .catch((e) => console.log(e));
    } else {
      console.log('log: db is null');
    }
  }
}
