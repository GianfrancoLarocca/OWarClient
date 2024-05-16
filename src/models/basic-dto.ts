export class BasicDto {

  public id:number = 0;
  public nickname:string = '';
  public livello:number = 0;
  public expStartLvl:number = 0;
  public exp:number = 0;
  public expTot:number = 0;
  public expNextLevel:number = 0;
  public cp:number = 0;
  public puntiAttacco:number = 0;
  public puntiDifesa:number = 0;
  public dataRegistrazione!:Date;
  public urlImmagine = '';
}
