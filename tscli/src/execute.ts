import { ExecutionContext } from "./executionContext";

type Execute = (executionContext: ExecutionContext) => void;

const execute: Execute = (executionContext: ExecutionContext) => {
    executionContext.sh('echo "Hello World"');
};

export default execute;