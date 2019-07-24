import * as vscode from 'vscode';

export default () => {
    const gekkoAddress: string = vscode.workspace.getConfiguration().get('gekko.address');
    vscode.env.openExternal(vscode.Uri.parse(gekkoAddress));
};