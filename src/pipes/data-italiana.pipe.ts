import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';


@Pipe({
  name: 'dataItaliana'
})
export class DataItalianaPipe implements PipeTransform {

  transform(value: Date): any {
    const dataModificata = new Date(value);
    dataModificata.setHours(dataModificata.getHours() + 1);
    return formatDate(dataModificata, 'MM-dd-yyyy HH:mm:ss', 'it');
  }

}
