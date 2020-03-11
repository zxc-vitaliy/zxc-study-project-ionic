import { DatabaseService } from '../dao/database.service';

export abstract class Logger {
  abstract async log(x1x2: [number, number]);

  abstract async getLogs(): Promise<[number, number][]>;
}

export class LocalStorageLogger implements Logger {
  async getLogs(): Promise<[number, number][]> {
    return JSON.parse(localStorage.getItem('results'))
        .filter(item => !(item[0] === null || item[1] === null));
  }

  log(x1x2: [number, number]) {
    let results = JSON.parse(localStorage.getItem('results'));
    if (!results) {
      results = [];
    }
    results.push(x1x2);
    localStorage.setItem('results', JSON.stringify(results));
  }
}

export class SqlLiteLogger implements Logger {
  constructor(private data: DatabaseService) {
  }

  async getLogs(): Promise<[number, number][]> {
    return this.data.get();
  }

  async log(x1x2: [number, number]) {
    this.data.save(x1x2);
  }
}
