// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import gekkoServerInfoHandler from './handler/gekkoServerInfo.handler';
import backtestActiveEditor from './handler/backtestActiveEditor.handler';
import createWorkspaceHandler from './handler/createWorkspace.handler';
import { BacktestResultProvider, BacktestItem } from './provider/backtestResult';
import openBacktestReportHandler from './handler/openBacktestReportHandler.handler';
import deleteBacktestHandler from './handler/deleteBacktest.handler';

export function activate(context: vscode.ExtensionContext) {

	const backtestResultProvider = new BacktestResultProvider();
	vscode.window.registerTreeDataProvider('backtestResults', backtestResultProvider);
	vscode.commands.registerCommand('backtestResults.refreshEntry', () => backtestResultProvider.refresh());
	vscode.commands.registerCommand('backtestResults.viewEntry', openBacktestReportHandler);
	vscode.commands.registerCommand('backtestResults.deleteEntry', (entry) => deleteBacktestHandler(entry).then(() => backtestResultProvider.refresh()));

	context.subscriptions.push(vscode.commands.registerCommand('extension.gekkoServerInfo', gekkoServerInfoHandler));
	context.subscriptions.push(vscode.commands.registerCommand('extension.backtestStrategy', backtestActiveEditor));
	context.subscriptions.push(vscode.commands.registerCommand('extension.createWorkspace', createWorkspaceHandler));
}

// this method is called when your extension is deactivated
export function deactivate() { }

