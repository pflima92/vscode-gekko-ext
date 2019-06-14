import * as vscode from 'vscode';
import * as unirest from 'unirest';

const GetInfo = () => {

    const gekkoAddress = vscode.workspace.getConfiguration().get('gekko.address');
    return new Promise<any>(function (resolve, reject) {
        unirest.get(`${gekkoAddress}/v1/info`)
            .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
            .send()
            .end(res => {
                if (res.error) reject(res.error);
                else resolve(res.body);
            });
    });
};

const BacktestSandbox = (data: any) => {

    const gekkoAddress = vscode.workspace.getConfiguration().get('gekko.address');
    return new Promise<string[]>(function (resolve, reject) {
        unirest.post(`${gekkoAddress}/v1/sandboxBacktest`)
            .headers({ 'cache-control': 'no-cache', 'Content-Type': 'application/json' })
            .send(data)
            .end(res => {
                if (res.error) reject(res.error);
                else resolve(res.body);
            });
    });
};

export {
    GetInfo,
    BacktestSandbox
}