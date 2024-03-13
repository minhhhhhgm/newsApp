import { useState } from 'react';
import { I18n } from 'i18n-js';
import { translations } from "../i18n/trans";
import { getAccessToken } from '../utils/storage';

export const i18n = new I18n(translations);
i18n.enableFallback = true;

export function useLanguage() {
    const [locale, setLocale] = useState(i18n.locale);
    function changeLanguage(newLocale : string) {
        i18n.locale = newLocale;
        setLocale(newLocale);
    }

    return {
        locale,
        changeLanguage
    };
}

export async function useAuth() {
    const token = await getAccessToken()
    return token
}
