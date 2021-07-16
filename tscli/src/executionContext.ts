import { exec } from "child_process";
import { stderr } from "process";

export interface ExecutionContext {
    sh: (command: string) => void;
    git: (command: string) => void;
}

const sh = (command: string) => exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(stderr);
        process.exit(1);
    }
    console.log(stdout);
});

const executionContext = {
    sh,
    git: (command: string) => sh(`git ${command}`),
};

export default executionContext;