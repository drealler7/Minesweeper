import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mineBoardTimer'
})
export class MineBoardTimerPipe implements PipeTransform {

  transform(seconds: number, ..._: unknown[]): string {
    const parts: string[] = [];

    seconds = MineBoardTimerPipe.addMinutes(parts, seconds);

    parts.push(MineBoardTimerPipe.PartToString(seconds));
    return parts.join(':');
  }
  static addMinutes(parts: string[], seconds: number): number {
    const remainder = seconds % 60;
    const minutes = (seconds - remainder) / 60;

    parts.push(this.PartToString(minutes));

    return remainder;
  }

  static PartToString(value: number): string {
    let result = value.toString();
    while (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }



}
