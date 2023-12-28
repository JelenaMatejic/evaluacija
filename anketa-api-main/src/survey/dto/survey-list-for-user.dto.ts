export class SurveyListForUserDto {
  id: string;
  name: string;
  canDo: boolean;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
