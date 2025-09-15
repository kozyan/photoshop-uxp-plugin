import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { zhTW } from 'date-fns/locale';
@Pipe({
  name: 'datetime',
})
export class DateTimePipe implements PipeTransform {
  transform(value?: string | Date, fmt?: string): any {
    if (!value) return '';

    let date;

    if (value instanceof Date) {
      date = value;
    } else {
      value = value.replace(/\//g, '-');
      date = parseISO(value);
    }

    fmt = fmt ? fmt : 'HH:mm:ss';
    const ret = format(date, fmt, { locale: zhTW });

    return ret;
  }
}
