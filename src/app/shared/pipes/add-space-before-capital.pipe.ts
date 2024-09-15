import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addSpaceBeforeCapital',
  standalone: true,
})
export class AddSpaceBeforeCapitalPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    // Use regex to add space before capital letters, except for the first letter.
    return (
      value.charAt(0).toUpperCase() +
      value.slice(1).replace(/(?!^)([A-Z])/g, ' $1')
    );
  }
}
