import axios from "axios";
import xml2js from "xml2js";
import {configDotenv} from "dotenv";
configDotenv();


class WolframSolver {
    #appId;
    constructor(){
        this.#appId = process.env.WOLFRAM_APP_ID;
    }

    async solve(question){
        try {
            const response = await axios.get("http://api.wolframalpha.com/v1/result", {
                params: {
                    input: `solve ${question}`,       
                    appid: this.#appId,     
                    format: "plaintext"    
                }
            });
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
}

export default WolframSolver;