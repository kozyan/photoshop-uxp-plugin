import { Pipe, PipeTransform } from '@angular/core';
import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns';
// import { formatInTimeZone } from 'date-fns-tz'

@Pipe({
  name: 'today'
})
export class TodayPipe implements PipeTransform {

  transform(value?: string | Date, args?: any): any {

    if(!value) return "";

    let date;

    if(value instanceof Date){
      date = value;
    }else{
      value = value.replace(/\//g,'-');
      date = parseISO(value);
    }

    let fmt = args?.fmt ? args.fmt : "yyyy/MM/dd";
    let ret = format(date, fmt);

    if(isToday(date)){
      ret = "Today";
    }

    return ret;
  }

}
