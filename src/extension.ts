// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import gekkoServerInfoHandler from './handler/gekkoServerInfo.handler';
import backtestActiveEditor from './handler/backtestActiveEditor.handler';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('extension.gekkoServerInfo', gekkoServerInfoHandler));
	context.subscriptions.push(vscode.commands.registerCommand('extension.backtestStrategy', backtestActiveEditor));
}

// this method is called when your extension is deactivated
export function deactivate() { }

