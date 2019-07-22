import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const defaultWorkspaceConfig = {
    "workspaceConfig": "./vscode-gekko-ext.json",
    "dirs": {
        "strategies": [
            "./strategies/"
        ],
        "indicators": [
            "./indicators/"
        ]
    },
    "backtest": {
        "watch": {
            "exchange": "binance",
            "currency": "USDT",
            "asset": "BTC"
        },
        "backtest": {
            "daterange": {
            }
        }
    }
}

const mkdirIfDoesNotExist = (pathname) => {
    let fullPath = path.join(vscode.workspace.rootPath, pathname);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
    }
}

export default () => {

    if (!vscode.workspace.rootPath) {
        vscode.window.showWarningMessage("You need to open a Folder to create a Workspace.");
        return;
    }


    let workspaceConfigFilePath = path.join(vscode.workspace.rootPath, defaultWorkspaceConfig.workspaceConfig);
    if (!fs.existsSync(workspaceConfigFilePath)) {
        fs.writeFileSync(workspaceConfigFilePath, JSON.stringify(defaultWorkspaceConfig, null, 4));
    }

    defaultWorkspaceConfig.dirs.strategies.forEach(mkdirIfDoesNotExist);
    defaultWorkspaceConfig.dirs.indicators.forEach(mkdirIfDoesNotExist);

    vscode.window.showInformationMessage(`Workspace has been created successfuly at ${vscode.workspace.rootPath}`)
};