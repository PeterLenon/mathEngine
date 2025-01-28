import Groq from "groq-sdk";
import { configDotenv } from "dotenv";
configDotenv();

class TutorAI {
     #groq;

     constructor(){
         this.#groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
     }

     async explain(question, solution){
          try{
               const chatCompletion = await this.#groq.chat.completions.create({
                    "messages": [
                         {
                              "role": "user",
                              "content": [
                                   {
                                        "type": "text",
                                        "text": `Given the solution to this problem , ${question}, is ${solution}, provide steps as to how the sollution was derived.`
                                   }
                              ]
                         },
                         {
                              "role": "system",
                              "content": "format your responses in json strictly following this format .ie {\"step1\": {\"step\" : \"math expression only i.e ∫x^2 dx = (1/(2+1))x^(2+1)\", \"explanation\" : \"step1 explanation i.e Apply the power rule of integration, ∫x^n dx = (1/(n+1))x^(n+1) + C, where n is a real number equal 2\"}, \"step2\" :{\"step\" : \"expression\", \"explanation\": \"explanations\" }, ...}. In the event of an error or misunderstanding, return a json formatted string like {\"error\": \"your explanation\"}"
                         }
                    ],
                    "model": "llama-3.2-11b-vision-preview",
                    "temperature": 1,
                    "max_completion_tokens": 1024,
                    "top_p": 1,
                    "stream": false,
                    "stop": null
               });
               var content = chatCompletion.choices[0].message.content;
               content = content.slice(content.indexOf('{'), content.lastIndexOf('}')+2);   
               return JSON.parse(content);
          }catch(error){
               console.log(error)
               return JSON.parse(`{"error": "${error.error}"}`);
          }
     }
}

export default TutorAI;

const tutorAI = new TutorAI();
