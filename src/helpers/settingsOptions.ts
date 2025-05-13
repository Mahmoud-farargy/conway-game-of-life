import { i18n } from '@/i18n';
const t = i18n.global?.t;

export const getOptionLists = () => ({
    languages: [
        {value: 'de', label: 'German'},
        {value: 'en', label: 'English'}
    ],
    modes: [
        {value: "", label: t('system')},
        {value: 'light', label: t('light')},
        {value: 'dark', label: t('dark')}   
    ],
    palettes: [
        {value: "", label: t('primary_accent')},
        {value: 'bg-green-500', label: t('green')},
        {value: 'bg-teal-500', label: t('teal')},
        {value: 'bg-yellow-500', label: t('yellow')},
    ],
    boardSizes: [
        {value: "", label: t('responsive')},
        {value: 400, label: 400},
        {value: 600, label: 600},
    ]
});