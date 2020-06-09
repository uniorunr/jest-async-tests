import fetch from 'jest-fetch-mock';
import '@babel/polyfill';
import {
    translateWord,
    baseURL,
    defaultResponseData,
    baseUrlTranslate,
    apiKeyTranslate,
    defaultColor,
    getTranslation
} from "./index";
import * as utils from './utils';

global.fetch = fetch;

describe('translateWord', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    const mockResponseData = {
        cool: 'data',
        wow: 'woof',
        text: ['d', 'a', 't', 'a']
    };
    const mockErrorData = {
        code: 403,
        message: 'You shall not pass',
    };
    const mockText = 'testText';
    const mockLang = 'testLang';

    it('should call fetch with correct params', async () => {
        fetch.mockResponse(JSON.stringify({}));

        await translateWord(mockText, mockLang);

        expect(fetch.mock.calls[0][0]).toEqual(`${baseURL}&text=${mockText}&lang=${mockLang}`);
    });

    it('returns parsed data if request succeed', async () => {
        fetch.mockResponse(JSON.stringify(mockResponseData));

        const response = await translateWord(mockText, mockLang);

        expect(response).toEqual(mockResponseData.text.join());
    });

    it('returns default data if response does not contain text property', async () => {
        fetch.mockResponse(JSON.stringify({}));

        const response = await translateWord(mockText, mockLang);

        expect(response).toEqual(defaultResponseData);
    });

    it('correctly handle request errors', async () => {
        const main = document.createElement('main');
        main.className = 'message-wrapper';
        document.body.appendChild(main);

        fetch.mockReject(mockErrorData);

        const messageContainer = document.querySelector('.message-wrapper');
        await translateWord(mockText, mockLang, messageContainer);

        expect(messageContainer.innerText).toEqual(`ERROR CATCH(${mockErrorData.code}): ${mockErrorData.message}`);
    });
});


describe('getTranslation', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    const mockResponseData = {
        cool: 'data',
        wow: 'woof',
        text: ['d', 'a', 't', 'a']
    };
    const mockErrorData = {
        code: 403,
        message: 'You shall not pass',
    };
    const mockText = 'testText';
    const mockLang = 'testLang';

    it('should call fetch with correct params', async () => {
        fetch.mockResponse(JSON.stringify({}));

        await getTranslation(mockText, mockLang);

        expect(fetch.mock.calls[0][0]).toEqual(
            `${baseUrlTranslate}?key=${apiKeyTranslate}&text=${mockText}&lang=${mockLang}-en`
        );
    });

    it('returns parsed data if request succeed', async () => {
        fetch.mockResponse(JSON.stringify(mockResponseData));

        const response = await getTranslation(mockText, mockLang);

        expect(response).toEqual(mockResponseData.text[0]);
    });

    it('correctly handle request errors', async () => {
        const mockQueryResultMessage = jest
            .spyOn(utils, 'queryResultMessage')
            .mockImplementation(jest.fn());

        fetch.mockReject(mockErrorData);

        await getTranslation(mockText, mockLang);

        expect(mockQueryResultMessage).toHaveBeenCalled();
        expect(mockQueryResultMessage).toHaveBeenCalledWith(mockErrorData.message, defaultColor);
    });
});