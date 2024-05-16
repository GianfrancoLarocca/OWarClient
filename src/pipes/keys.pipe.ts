import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any): string[] {
    return Object.keys(value).filter(item => item !== 'id' && item !== 'cambioPosizione' && item !== 'img');
  }

}
