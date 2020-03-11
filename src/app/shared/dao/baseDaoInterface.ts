export abstract class BaseDaoInterface {
  abstract save(x1x2: [number, number]);
  abstract get(): Promise<[number, number][]>;
}
