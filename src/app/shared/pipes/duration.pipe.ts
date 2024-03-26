import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration',
  standalone: true
})
export class FormatDurationPipe implements PipeTransform {
  transform(value: string): string {
    const numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      return 'Invalid input';
    }

    const hours = Math.floor(numericValue / 60);
    const minutes = numericValue % 60;
    return `${hours}h ${minutes}m`;
  }
}
