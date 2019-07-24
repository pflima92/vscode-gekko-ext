import * as vscode from 'vscode';
import { BacktestItem } from '../provider/backtestResult';
import { DeleteBacktestResultById } from '../client/gekko.client';

export default (element: BacktestItem) => {
    return new Promise<any>(function (resolve) {
        DeleteBacktestResultById(element.item.id)
            .then(() => {
                vscode.window.showInformationMessage(`Backtest "${element.item.id}" has been deleted successfuly.`)
                resolve();
            });
    });
}

