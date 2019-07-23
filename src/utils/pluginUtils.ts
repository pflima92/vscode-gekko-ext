import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

const WORKSPACE_CONFIG_NAME = "vscode-gekko-ext.json";


const GetWorkspaceConfig = () => {
    let workspaceConfigFilePath = path.resolve(vscode.workspace.rootPath, WORKSPACE_CONFIG_NAME);
    if (!fs.existsSync(workspaceConfigFilePath)) {
        return {};
    }

    let config = JSON.parse(fs.readFileSync(workspaceConfigFilePath).toString('utf8'));
    return config;
};

export { WORKSPACE_CONFIG_NAME, GetWorkspaceConfig };
