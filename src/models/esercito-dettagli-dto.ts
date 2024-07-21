export class EsercitoDettagliDto {

  public id: number = 0;
  public nome: string = '';
  public descrizione: string = '';
  public urlImmagine: string = '';
  public costi!: Map<string, number>
  public quantitaSoldati: number = 0;
  public secondiPerAddestrare: number = 0;
  public limiteUnita: number = 0;
  public armaSoldato: string = '';
}
