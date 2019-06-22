import * as vscode from 'vscode';
import * as semver from 'semver';

import { GetInfo } from "../client/gekko.client"

const extPackage = vscode.extensions.getExtension('jspare-org.vscode-gekko-ext').packageJSON;

export default async () => {
    let res = await GetInfo();
    let required = extPackage.engines['platform-gekko']
    let version = extPackage.version;

    let validate = vscode.workspace.getConfiguration().get('gekko.validateServerVersion');
    if (!validate) return true;

    let satisfies: boolean = semver.satisfies(res.version, required);
    if (!satisfies) {
        vscode.window.showWarningMessage(`Incompatible versions, Extesion v.: ${version} is incompatible with Platform Gekko v.: ${res.version} Required version should match: ${required}`);
    }
    return satisfies;
}