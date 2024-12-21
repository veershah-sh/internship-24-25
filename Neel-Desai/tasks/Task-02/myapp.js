
const apiKey = '9c326ac76emsh27b91b6f6595cd9p1c7731jsnd3dc9f919675';
const apiHost = 'microsoft-translator-text.p.rapidapi.com';
const translateUrl = 'https://microsoft-translator-text.p.rapidapi.com/translate?api-version=3.0';

const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const selectedLanguage = document.getElementById('selectedLanguage');
const btnTranslate = document.getElementById('btnTranslate');

btnTranslate.addEventListener('click', async () => {
    const textToTranslate = inputText.value;
    const targetLanguage = selectedLanguage.value;

    if (!textToTranslate.trim()) {
        alert('Please enter text to translate.');
        return;
    }

    const query = new URLSearchParams({
        'to': targetLanguage,
        'textType': 'plain',
        'profanityAction': 'NoAction'
    });
    const fullUrl = `${translateUrl}&to=${targetLanguage}&text=${encodeURIComponent(textToTranslate)}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        outputText.value = result[0].translations[0].text;
    } catch (error) {
        console.error(error);
        alert('An error occurred while translating. Please try again later.');
    }
});
