import Vue from 'vue';
import en from '../src/i18n/en.json'
import de from '../src/i18n/de.json'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import deLocale from 'element-ui/lib/locale/lang/de'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: { ...enLocale, ...en },
    de: { ...deLocale, ...de }
  }
})