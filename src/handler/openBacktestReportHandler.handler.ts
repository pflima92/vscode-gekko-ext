import * as vscode from 'vscode';
import { BacktestItem } from '../provider/backtestResult';
import backtestReport from '../reports/backtest.report';
import { BacktestResultById } from '../client/gekko.client';

export default (element: BacktestItem) => {

    let id = element.item.id;

    // Initialize a Webview Panel to show the result and futurely the debug while processing.
    const panel = vscode.window.createWebviewPanel(
        'backtestResult', // Identifies the type of the webview. Used internally
        `Backtest Result: ${id}`, // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
            // Enable javascript in the webview
            enableScripts: true,
        }
    );

    panel.webview.html = `Retrieving Backtest for: ${id} 
    <br>
    Waiting for a result... `;

    BacktestResultById(id).then(res => panel.webview.html = panel.webview.html = backtestReport({
        name: id,
        serverAddress: vscode.workspace.getConfiguration().get('gekko.address'),
        ...res
    })).catch(err => panel.webview.html = `Backtest for ${id} failed.\n` + err);
}