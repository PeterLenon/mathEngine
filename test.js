import MathEngine from './mathEngine.js';
import dotenv from 'dotenv';
dotenv.config();

const mathEngine = new MathEngine();
const solutionSteps = await mathEngine.solveMathProblem(process.env.TEST_IMAGE_PATH);

Object.keys(solutionSteps).forEach((step) => {
     console.log(step + ": " + JSON.stringify(solutionSteps[step]));
     console.log("\n");
});