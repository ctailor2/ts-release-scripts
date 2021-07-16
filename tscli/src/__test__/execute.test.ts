import execute from '../execute';
import fs from 'fs';
import os from 'os';
import crypto from 'crypto';
import path from 'path';

describe('executor', () => {
    const tmpdir = os.tmpdir();
    const generatedFilePaths: string[] = [];

    afterAll(() => {
        generatedFilePaths.forEach(filePath => fs.unlinkSync(filePath));
    });

    it('echoes out', () => {
        const filePath = path.join(tmpdir, crypto.randomUUID());
        generatedFilePaths.push(filePath);
        fs.writeFileSync(filePath, `repositories: []`);

        const sh = jest.fn();
        execute({ sh, git: jest.fn(), env: {} }, filePath);

        expect(sh).toHaveBeenCalledWith('echo "Hello World"');
    });

    it('clones repositories in the supplied inventory file to the specified directory', () => {
        const filePath = path.join(tmpdir, crypto.randomUUID());
        generatedFilePaths.push(filePath);
        fs.writeFileSync(filePath, `
repositories:
  - name: someRepoName
    url: https://hostname/org/repo
        `.trimStart());

        const sh = jest.fn();
        const git = jest.fn();
        execute({ sh, git, env: {
            'REPO_USERNAME': 'someUsername',
            'REPO_ACCESS_TOKEN': 'someAccessToken'
        } }, filePath);

        expect(sh).toHaveBeenCalledWith("mkdir repos");
        expect(git).toHaveBeenCalledWith("clone https://someUsername:someAccessToken@hostname/org/repo repos/someRepoName");
    });
});