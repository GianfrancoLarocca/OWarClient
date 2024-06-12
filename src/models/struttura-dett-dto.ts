export class StrutturaDettDto {

  public id: number = 0;
  public nome: string = '';
  public descrizione: string = '';
  public livello: number = 0;
  public urlImmagine: string = '';
  public chance: string = '';
  public costi!: Map<string, string>
  public produzioneAttuale!: Map<string, string>
  public produzioneProssimoLivello!: Map<string, string>
  public effectValue?:number;
  public nextEffectValue?:number;
  public effectValueType?:string;
  public livelloLaboratorioRequisito?:number;
}

