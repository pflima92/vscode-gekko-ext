import * as vscode from 'vscode';

import { GetInfo } from "../client/gekko.client"

const extVersion = vscode.extensions.getExtension('jspare.vscode-gekko-ext').packageJSON.version;

const message = res => `Client Version: ${extVersion} - Platform Gekko Version: ${res.version}`;

export default () => {
    GetInfo().then((res) => vscode.window.showInformationMessage(message(res)))
};