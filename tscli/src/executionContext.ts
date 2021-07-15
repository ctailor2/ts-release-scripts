import { exec } from "child_process";

export interface ExecutionContext {
    sh: (command: string) => void;
    git: (command: string) => void;
}

const sh = (command: string) => exec(command, (_error, stdout, _stderr) => console.log(stdout));

const executionContext = {
    sh,
    git: (command: string) => sh(`git ${command}`),
};

export default executionContext;