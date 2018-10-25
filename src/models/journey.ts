import { Section } from './section';

export interface Journey {
    sections: Section[];
  }

export class Journey implements Journey {
  public sections: Section[];
  
  constructor(sections: Section[]) {
    this.sections = sections;
   }
}
