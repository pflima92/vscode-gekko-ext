import * as vscode from 'vscode';
import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';

export default (context: vscode.ExtensionContext) => {

    const gekkoAddress: string = vscode.workspace.getConfiguration().get('gekko.address');

    const panel = vscode.window.createWebviewPanel(
        'gordon',
        'Gekko - Gordon UI (embedded version)',
        vscode.ViewColumn.One,
        {
            // Only allow the webview to access resources in our extension's media directory
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'resources', 'gordon'))],
            enableScripts: true
        }
    );


    const rootSrc = vscode.Uri.file(path.join(context.extensionPath, 'resources', 'gordon')).with({ scheme: 'vscode-resource' });
    const indexSrc = vscode.Uri.file(path.join(context.extensionPath, 'resources', 'gordon', 'index.html')).with({ scheme: 'vscode-resource' });
    let content = fs.readFileSync(indexSrc.fsPath, 'utf8')
        .replace(/__CONTEXT_PATH/g, rootSrc.toString())
        .replace('__gekkoAddress', gekkoAddress);
    panel.webview.html = content;
};