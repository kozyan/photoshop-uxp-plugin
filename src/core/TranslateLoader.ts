import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from "@angular/common/http";

// export class CustomLoader implements TranslateLoader {
//     constructor(private httpClient: HttpClient){
//     }

//     getTranslation(lang: string): Observable<any> {
//         return Observable.of({KEY: 'value'});
//     }
// }

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
