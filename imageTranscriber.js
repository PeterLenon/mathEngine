import Groq from "groq-sdk";
import fs from "fs";
import { configDotenv } from "dotenv";
configDotenv();

class Transcriber{
     #groq;

     constructor(){
         this.#groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
     }

     #preprocessImage(imageFilePath){
          const imageFile = fs.readFileSync(imageFilePath); 
          return Buffer.from(imageFile).toString('base64'); 
     }

     async #queryGroq(base64_image) {
          try{
               const chatCompletion = await this.#groq.chat.completions.create({
                    "messages": [
                         {
                              "role": "user",
                              "content": [
                                   {
                                        "type": "text",
                                        "text": "Transcribe the math problem in the image and return the trasncription only."
                                   },
                                   {
                                        "type": "image_url",
                                        "image_url": {
                                             "url": `data:image/jpeg;base64,${base64_image}`
                                        }
                                   }
                              ]
                         }
                    ],
                    "model": "llama-3.2-11b-vision-preview",
                    "temperature": 1,
                    "max_completion_tokens": 1024,
                    "top_p": 1,
                    "stream": false,
                    "stop": null
               });  
               return chatCompletion.choices[0].message.content;
          }catch(error){
               console.log(error)
               return "Error querying Groq.";
          };
     }

     async transcribe(imageFilePath){
          var transcription;
          try{
               var base64_image= this.#preprocessImage(imageFilePath);
               transcription = await this.#queryGroq(base64_image);
          }catch{
               console.error("Error transcribing the image.");
               transcription = "Error transcribing the image.";
          }
          return transcription;
     }
}

export default Transcriber;
