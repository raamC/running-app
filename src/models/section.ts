export interface Section {
    start: Position;
    end: Position;
    isSnapped: boolean;
  }

export class Section implements Section {
  public start: Position;
  public end: Position;
  public isSnapped: boolean;

  constructor(start: Position, end: Position, isSnapped: boolean) {
    this.start = start;
    this.end = end;
    this.isSnapped = isSnapped;
    }
}
