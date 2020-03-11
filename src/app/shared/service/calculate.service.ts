import { Injectable } from '@angular/core';
import { Logger } from './logger.service';

@Injectable()
export class CalculateService {

  private static getDiscriminant(a, b, c) {
    return b * b - 4 * a * c;
  }

  calculate(a: number, b: number, c: number): [number, number] {
    a = a ? a : 1;
    b = b ? b : 1;
    c = c ? c : 1;

    const discriminant = CalculateService.getDiscriminant(a, b, c);

    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    return [x1, x2];
  }
}

@Injectable()
export class LoggedCalculateService extends CalculateService {
  constructor(private logger: Logger) {
    super();
  }

  calculate(a: number, b: number, c: number): [number, number] {
    const x1x2 = super.calculate(a, b, c);
    this.logger.log(x1x2);
    return x1x2;
  }
}
