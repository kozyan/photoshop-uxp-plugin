///https://stackoverflow.com/questions/34164413/how-to-apply-filters-to-ngfor

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'callback',
  pure: false
})
export class FilterCallbackPipe implements PipeTransform {

  transform<T>(items: T[] | null | undefined, callback: (item: T, extra?:any) => boolean, extra?: any): T[] {
    if (!items) {
        return [];
    }else if(!callback){
      return items;
    }

    return items.filter(item => callback(item, extra));
  }

}
