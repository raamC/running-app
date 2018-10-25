import { ElevationStats } from './elevationStats';

export interface JourneySummary {
    points: Position[];
    distance: number;
    elevation: number[];
    elevationStats: ElevationStats;
  }

export class JourneySummary implements JourneySummary {
  public points: Position[];
  public distance: number;
  public elevation: number[];
  public elevationStats: ElevationStats;

  constructor(points: Position[], distance: number, elevation: number[]) {
    this.points = points;
    this.distance = distance;
    this.elevation = elevation;
    this.elevationStats = {up: 0, down: 0}; // hard-coded for now
    }

    // TODO create method to find elevation stats from elevation data
}
