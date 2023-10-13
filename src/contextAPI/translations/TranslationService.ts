import english from './en.json'
import finnish from './fi.json'

type Translations = {
    [key: string]: string
}

const translations: { [key: string]: Translations} = {
    en: english,
    fi: finnish,
}

export const getTranslation = (language: string, key: string): string => {
    const translation = translations[language];
    return translation ? translation[key] || key : key;
}