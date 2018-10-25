import { ElevationStats } from './elevationStats';

export interface JourneySummary {
    points: Position[];
    distance: number;
    elevation: number[];
    elevationStats: ElevationStats;
  }
