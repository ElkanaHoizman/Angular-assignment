import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    debugger;
    if (!items) return [];
    if (!searchText) return [];
    if (searchText == '') return items;

    searchText = searchText.toLowerCase();

    return items.filter((it) => {
      return it.toLowerCase().includes(searchText);
    });
  }
}
