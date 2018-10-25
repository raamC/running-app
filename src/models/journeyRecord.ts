import { Journey } from './journey';
import { ElevationStats } from './elevationStats';

export interface JourneyRecord {
    journey: Journey;
    date: Date;
    time: number; // convert time to number of seconds
    distance: number;
    elevationStats: ElevationStats;
  }
