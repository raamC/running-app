import { DetailedSection } from './detailedSection';

export interface DetailedJourney {
    detailedSections: DetailedSection[];
  }

export class DetailedJourney implements DetailedJourney {
  public detailedSections: DetailedSection[];

  constructor(detailedSections: DetailedSection[]) {
    this.detailedSections = detailedSections;
    }
}
