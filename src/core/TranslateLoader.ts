import {TranslateHttpLoader, provideTranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader() {
    return provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
    });
}
