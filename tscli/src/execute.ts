import fs from 'fs';
import yaml from 'js-yaml';
import { ExecutionContext } from "./executionContext";

type Execute = (executionContext: ExecutionContext, inventoryFilePath: string) => void;

interface Inventory {
    repositories: Repository[];
}

interface Repository {
    name: string;
    url: string;
}

const execute: Execute = (executionContext: ExecutionContext, inventoryFilePath: string) => {
    executionContext.sh('echo "Hello World"');
    executionContext.sh('mkdir repos');
    const doc = yaml.load(fs.readFileSync(inventoryFilePath, 'utf8')) as Inventory;
    doc.repositories.forEach((repository) => {
        const url = new URL(repository.url)
        const username = executionContext.env['REPO_USERNAME'];
        const accessToken = executionContext.env['REPO_ACCESS_TOKEN'];
        username &&
            accessToken &&
            executionContext.git(`clone ${url.protocol}//${username}:${accessToken}@${ url.hostname }${url.pathname} ${ ['repos', repository.name].join('/') }`);
    });
};

export default execute;