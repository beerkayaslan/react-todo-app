import { create } from 'zustand';

interface IDefaultAlllangs {
    name: string;
    ShortName: string;
}

enum Langs {
    TR = 'tr',
    EN = 'en',
    ES = 'es'
}

export const defaultAlllangs: IDefaultAlllangs[] = [
    {
        name: 'Turkish',
        ShortName: 'tr'
    },
    {
        name: 'English',
        ShortName: 'en'
    },
    {
        name: "Spanish",
        ShortName: "es"
    }
];

type Lang = {
    lang: {
        name: string;
        ShortName: string;
    };
    setLang: (lang: { name: string; ShortName: string }) => void;
}

const getLang = () => {
    const localStorageLang = localStorage.getItem('lang');
    return localStorageLang ? JSON.parse(localStorageLang) : defaultAlllangs.find(lang => lang.ShortName === Langs.TR);
};

export default create<Lang>()((set) => ({
    lang: getLang(),
    setLang: (lang: { name: string; ShortName: string }) => {
        localStorage.setItem('lang', JSON.stringify(lang));
        set({ lang });
    }
}));

