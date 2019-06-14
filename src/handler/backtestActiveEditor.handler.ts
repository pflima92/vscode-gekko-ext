
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as toml from 'toml';

import checkVersion from './checkVersion';
import { BacktestSandbox } from '../client/gekko.client';
import backtestReport from '../reports/backtest.report';

export default async () => {

    if (! await checkVersion()) {
        return;
    }

    if (!vscode.window.activeTextEditor) {
        vscode.window.showInformationMessage(`Open the Strategy that you want to test.`);
        return;
    }

    let { document } = vscode.window.activeTextEditor;

    if (document.languageId !== 'javascript') {
        vscode.window.showErrorMessage(`The strategy must be a Javascript file`);
        return;
    }

    // Save the current version
    document.save();

    // Define name and configuration to be used
    let name = path.basename(document.fileName, '.js');
    let rawStrategy = document.getText();
    let backtest: any = vscode.workspace.getConfiguration().get('gekko.backtest');
    backtest.tradingAdvisor.method = `${name}`;
    let settings = {};

    // Set values based on Active Strategy
    let dirname = path.dirname(document.fileName);

    // Set Params
    let paramsFileName = `${dirname}/${name}.toml`
    if (fs.existsSync(paramsFileName)) {

        let params = fs.readFileSync(paramsFileName).toString('utf8');
        // Retrieve Data to compose the configuration
        settings = toml.parse(params);
    } else {

        // A toml file is required, as utility create a new file to encourage a new file creation.
        fs.writeFileSync(paramsFileName, '[general]\nfoo = bar');
        vscode.window.showWarningMessage(`No configurations for ${name} founded. A empty toml configuration file has been created.`);
    }

    // Check and Load a Custom Backtest for this strategy
    let customBacktestFileName = `${dirname}/backtest.json`;
    if (fs.existsSync(customBacktestFileName)) {
        let customBacktest: any = JSON.parse(fs.readFileSync(customBacktestFileName).toString('utf8'));

        // Set configuraiton based on customBacktest if available
        // For while only watch and backtest are accepted here.
        if (customBacktest.watch) {
            backtest.watch = customBacktest.watch;
        }
        if (customBacktest.backtest) {
            backtest.backtest = customBacktest.backtest;
        }
    }

    // Check and Load a Paper Trader for this strategy
    let paperTraderFileName = `${dirname}/paper-trader.toml`;
    if (fs.existsSync(paperTraderFileName)) {
        backtest.paperTrader = toml.parse(fs.readFileSync(paperTraderFileName).toString('utf8'));
    }

    // Initialize a Webview Panel to show the result and futurely the debug while processing.
    const panel = vscode.window.createWebviewPanel(
        'backtestResult', // Identifies the type of the webview. Used internally
        `Backtest Result: ${name}`, // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
            // Enable javascript in the webview
            enableScripts: true,
        }
    );

    panel.webview.html = `
        Loading Backtest for: ${name} 
        <br>
        Waiting for a result... `;

    let data = {
        name: name,
        rawStrategy: rawStrategy,
        settings: settings,
        backtest: backtest
    };

    BacktestSandbox(data)
        .catch(err => panel.webview.html = `Backtest for ${name} failed.\n` + err)
        .then((res: any) => panel.webview.html = backtestReport({
            name: name,
            serverAddress: vscode.workspace.getConfiguration().get('gekko.address'),
            ...res
        }));

    vscode.window.showInformationMessage(`Backtest for ${name} has been started.`);
};