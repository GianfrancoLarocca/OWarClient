import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    const seconds: number = value % 60;

    return this.pad(hours) + ':' + this.pad(minutes) + ':' + this.pad(seconds);
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

}
