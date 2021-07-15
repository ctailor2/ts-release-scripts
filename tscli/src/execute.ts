import { ExecutionContext } from "./executionContext";
import fs from 'fs';
import yaml from 'js-yaml';

type Execute = (executionContext: ExecutionContext, inventoryFilePath: string) => void;

interface Inventory {
    repositories: Repository[];
}

interface Repository {
    name: string;
    url: string;
}

const execute: Execute = async (executionContext: ExecutionContext, inventoryFilePath: string) => {
    executionContext.sh('echo "Hello World"');
    executionContext.sh('mkdir repos');
    const doc = yaml.load(fs.readFileSync(inventoryFilePath, 'utf8')) as Inventory;
    doc.repositories.forEach((repository) => {
        executionContext.git(`clone ${repository.url} repos/${repository.name}`);
    });
};

export default execute;