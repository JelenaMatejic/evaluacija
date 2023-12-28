export class SurveyTableDto {
  id: string;
  name: string;
  numberOfGroups: number;

  constructor(id: string, name: string, numberOfGroups: number) {
    this.id = id;
    this.name = name;
    this.numberOfGroups = numberOfGroups;
  }
}
