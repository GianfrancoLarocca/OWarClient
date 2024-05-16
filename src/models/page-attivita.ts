import { Attivita } from "./attivita";

export class PageAttivita {
  content: Array<Attivita> = [];
  "last":boolean = false;
  "totalPages":number = 0;
  "totalElements":number =  0;
  "size":number = 0;
  "number":number = 0;
  "first":boolean = true;
  "numberOfElements":number = 0;
  "empty":boolean = false;
}
