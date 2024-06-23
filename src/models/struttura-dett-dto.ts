export class StrutturaDettDto {

  public id: number = 0;
  public nome: string = '';
  public descrizione: string = '';
  public livello: number = 0;
  public urlImmagine: string = '';
  public chance: string = '';
  public costi!: Map<string, string>

  //risorse
  public produzioneAttuale!: Map<string, string>
  public produzioneProssimoLivello!: Map<string, string>

  //tech
  public effectValue?:number;
  public nextEffectValue?:number;
  public effectValueType?:string;
  public livelloLaboratorioRequisito?:number;

  //arsenale
  public livelloFabbricaRequisito?:number;

  public attacco?:number;
  public armatura?:number;
  public vita?:number;
  public velocita?:number;
  public stiva?:number;
  public consumo?:number;
  public numeroMassimoObbiettivi?:number;
  public numeroMassimoArma?:number;

  public attaccoNextLvl?:number;
  public armaturaNextLvl?:number;
  public vitaNextLvl?:number;
  public velocitaNextLvl?:number;
  public stivaNextLvl?:number;
  public consumoNextLvl?:number;
  public numeroMassimoObbiettiviNextLvl?:number;
  public numeroMassimoArmaNextLvl?:number;

  //difesa
  public danno?:number;
  public penetrazioneArmatura?:number;
  public numeroMassimoDifesa?:number;

  public dannoNextLvl?:number;
  public penetrazioneArmaturaNextLvl?:number;
  public numeroMassimoDifesaNextLvl?:number;
}

