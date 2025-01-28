import axios from "axios";
import {configDotenv} from "dotenv";
configDotenv();

class SymbolabSolver {
     constructor(){
          this.headers = {
               "app_id" : process.env.SYMBOLAB_APP_ID,
               "access_key" : process.env.SYMBOLAB_ACCESS_KEY
          };
     }

     async solve(question){
          let solution_steps = [];
          try{
               const response = await axios.post("https://www.symbolab.com/api/v1/solve", {
                    "question": question,
                    "result_type": "flat_steps",
                    "language": "en",
                    "math_inline_delimiters": [
                      "$$",
                      "$$"
                    ]
                  }, { headers: this.headers});
               solution_steps = response.data.steps.steps;
          }catch(error){
               console.error("Error querying the Symbolab API:", error.message);
               solution_steps.push({
                    "Error" : error.message
               });
          }
          return solution_steps;
     }
}

export default SymbolabSolver;

const solver = new SymbolabSolver();
solver.solve(" solve 3x + 5 = 8");
