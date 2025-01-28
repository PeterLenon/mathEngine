
import Transcriber from "./imageTranscriber.js";
import WolframSolver from "./wolframSolver.js";
import TutorAI from "./tutorAI.js";

class MathEngine {
     #transcriber;
     #wolframSolver;
   
     #tutorAi;

     constructor(){
          this.#transcriber = new Transcriber();
          this.#wolframSolver = new WolframSolver();
          this.#tutorAi = new TutorAI();
          
     }

     async solveMathProblem(imageFilePath){
          const transcribed_question = await this.#transcriber.transcribe(imageFilePath);
          const solution = await this.#wolframSolver.solve(transcribed_question);
          const solutionSteps = await this.#tutorAi.explain(transcribed_question, solution);
          return solutionSteps;
     }
}

