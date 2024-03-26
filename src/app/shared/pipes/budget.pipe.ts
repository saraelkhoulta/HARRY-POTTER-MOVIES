import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBudget',
  standalone: true
})
export class FormatBudgetPipe implements PipeTransform {
  transform(value: string): string {
    return `$${value} million`;
  }
}
