import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: `${process.env.REACT_APP_CHATGPT_KEY}`,
});

const openai = new OpenAIApi(configuration);

export function useData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [responses, setResponses] = useState(null);

    const search = async (keyword) => {
        setLoading(true);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: keyword,
            temperature: 0.7,
            max_tokens: 256,
        });
        setLoading(false);

        setResponses(response?.data?.choices?.map(e => e.text));
    };

    return {
        loading,
        error,
        responses,
        search
    };
}