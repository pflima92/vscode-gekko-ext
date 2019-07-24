import { window } from 'vscode';
import openBacktestReportHandlerHandler from './openBacktestReport.handler';

export default async () => {
    const result = await window.showInputBox({
        value: '',
        placeHolder: 'Inform the Backtest ID: e.g 820910a8-b872-4a0d-bcb7-49a5d4e9b9c0'
    });
    openBacktestReportHandlerHandler(result);
}