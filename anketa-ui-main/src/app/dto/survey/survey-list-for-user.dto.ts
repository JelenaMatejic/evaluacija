export class SurveyListForUserDto {
  id: string;
  name: string;
  canDo: string;


  constructor(id: string, name: string, canDo: string) {
    this.id = id;
    this.name = name;
    this.canDo = canDo;
  }
}
