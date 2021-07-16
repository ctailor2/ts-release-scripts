import { exec } from "child_process";

export interface ExecutionContext {
    sh: (command: string) => void;
    git: (command: string) => void;
    env: Record<string, string | undefined>;
}

const sh = (command: string) => exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(stderr);
        process.exit(1);
    }
    console.log(stdout);
});

const executionContext: ExecutionContext = {
    sh,
    git: (command: string) => sh(`git ${command}`),
    env: process.env
};

export default executionContext;