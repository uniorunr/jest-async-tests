import { queryResultMessage } from "./utils";

const message = document.querySelector('.message-wrapper');
const langYandexKey = 'langYandexKey';
export const baseURL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${langYandexKey}`;
export const defaultResponseData = { default: 'data' };

export async function translateWord(word, lang, messageContainer = message) {
    try {
        const url = `${baseURL}&text=${word}&lang=${lang}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.text ? data.text.join() : defaultResponseData;
    } catch (err) {
        messageContainer.innerText = `ERROR CATCH(${err.code}): ${err.message}`;
    }
}

export const defaultColor = 'linear-gradient(135deg, #FF3043, #FF722E)';
export const baseUrlTranslate = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
export const apiKeyTranslate = 'apiKeyTranslate';

export async function getTranslation(str, lang = 'ru', baseUrl = baseUrlTranslate, apiKey = apiKeyTranslate) {
    try {
        const wordTranslate = `&text=${str}&lang=${lang}-en`;
        const res = await fetch(`${baseUrl}?key=${apiKey}${wordTranslate}`);
        if (!res.ok) {
            throw new Error('Could not fetch '
                + `, received ${res.status}`);
        }
        const { text } = await res.json();
        return text[0];
    } catch (e) {
        queryResultMessage(e.message, defaultColor);
    }
}