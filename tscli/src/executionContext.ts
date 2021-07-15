import { exec } from "child_process";

export interface ExecutionContext {
    sh: (command: string) => void;
}

const executionContext = {
    sh: (command: string) => exec(command),
};

export default executionContext;