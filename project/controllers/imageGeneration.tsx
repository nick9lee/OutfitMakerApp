import * as FileSystem from 'expo-file-system';

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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'
});

const TESTPROMPT = "merge both images and make a pretty scenary";

const PROMPT = "Using the two provided images—one of a person and one of a clothing item/outfit. Digitally style a complete outfit centered around the clothing item/outfit. Virtually dress the person in the styled outfit, ensuring it looks realistic and well-fitted. The new outfit should complement the clothing item, suit the person’s body type, and reflect a cohesive, fashionable look. Show the person wearing the full outfit in a natural pose and setting"


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

const saveBase64AsImageAndGetUri = async (base64: string): Promise<string> => {
  const fileUri = `${FileSystem.cacheDirectory}generated-image.png`;
  await FileSystem.writeAsStringAsync(fileUri, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return fileUri;
};

const uploadImagesAndGenerateOutfit = async (
  personPhotoUri: string,
  clothingPhotoUri: string
): Promise<string | null> => {
    try {

      console.log('called function')
      const base64Image1 = await uriToBase64(personPhotoUri);
      const base64Image2 = await uriToBase64(clothingPhotoUri);
      console.log('About to send API call');

      const response = await openai.responses.create({
        model: "gpt-4.1",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: PROMPT },
              {
                type: "input_image",
                image_url: `data:image/jpeg;base64,${base64Image1}`,
              },
              {
                type: "input_image",
                image_url: `data:image/jpeg;base64,${base64Image2}`,
              }
            ],
          }
        ],
        tools: [{ type: "image_generation" }],
    });

    const imageData = response.output
    .filter((output) => output.type === "image_generation_call")
    .map((output) => output.result);

    if (imageData.length > 0) {
      const imageBase64 = imageData[0];
      const imageUri = await saveBase64AsImageAndGetUri(imageBase64);
      return imageUri;
    } else {
      console.log(response.output.content);
      return null;
    }

    } catch (err) {
      console.error("Failed to upload images and generate output:", err);
      return null;
    }
  };

  export {
    uploadImagesAndGenerateOutfit
  }