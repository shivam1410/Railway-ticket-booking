import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numIntoAlpha'
})
export class NumIntoAlphaPipe implements PipeTransform {

  transform(value: number): any {
   
    return String.fromCharCode(65 + value);
  }


}
