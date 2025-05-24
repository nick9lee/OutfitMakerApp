import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

const OPENAI_CHAT_COMPLETION_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

const IMAGE_COMBINATION_PROMPT =
  'Merge these images to create some pretty scenary.';

const OPENAI_API_KEY = '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';

const uriToBase64 = async (uri: string): Promise<string> => {
  try {
    const fileBase64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return fileBase64;
  } catch (e) {
    console.error('Error converting uri to base64: ', e);
    throw e;
  }
};

const uploadImagesAndGenerateOutfit = async (
  personPhotoUri: string,
  clothingPhotoUri: string
): Promise<string | null> => {
  try {
    const base64Image1 = await uriToBase64(personPhotoUri);
    const base64Image2 = await uriToBase64(clothingPhotoUri);
    console.log('About to send API call');

    const response = await fetch(OPENAI_CHAT_COMPLETION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: IMAGE_COMBINATION_PROMPT },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image1}`,
                },
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image2}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      }),
    });

    console.log('Got result from OpenAI');
    const json = await response.json();
    console.log(json);
  
    console.log("MESSAGE_____________________________________________ \n \n \n");
    // console.log(json.choices[0].message)
    if (!response.ok) {
      console.error('OpenAI Error:', json);
      return null;
    }

    const content = json.choices?.[0]?.message?.content || '';
    const urlMatch = content.match(/https?:\/\/[^\s]+/);
    return urlMatch ? urlMatch[0] : null;
  } catch (error) {
    console.error('Error generating outfit image:', error);
    return null;
  }
};

export default {
  uploadImagesAndGenerateOutfit,
};
