import { exec } from "child_process";

export interface ExecutionContext {
    sh: (command: string) => void;
}

const executionContext = {
    sh: (command: string) => exec(command, (_error, stdout, _stderr) => console.log(stdout)),
};

export default executionContext;