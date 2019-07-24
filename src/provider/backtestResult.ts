import * as _ from 'lodash';
import * as path from 'path';
import * as vscode from 'vscode';
import { BacktestList } from '../client/gekko.client';
import { profitPercent, formatNumber } from '../utils/mathUtils';

const iconPath = (name: string): any => {
	return {
		light: path.join(__filename, '..', '..', '..', 'resources', 'light', name),
		dark: path.join(__filename, '..', '..', '..', 'resources', 'dark', name)
	}
};

export class BacktestResultProvider implements vscode.TreeDataProvider<any> {

	private _onDidChangeTreeData: vscode.EventEmitter<any | undefined> = new vscode.EventEmitter<any | undefined>();
	readonly onDidChangeTreeData: vscode.Event<any | undefined> = this._onDidChangeTreeData.event;

	constructor() {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: any): vscode.TreeItem {
		return element;
	}

	getChildren(element?: any): Thenable<any[]> {
		if (!element) {

			const result = BacktestList({})
				.then(list => list.map(it => new BacktestItem(it, vscode.TreeItemCollapsibleState.Collapsed)));
			return Promise.resolve(result);
		} else {

			let value: any = element instanceof BacktestItem ? element.item : element.value;
			let tree: any = Object.keys(value)
				.map(key => {
					let valueNode = value[key];
					let hasChildren = _.isArray(valueNode) === 'object' || _.isObject(valueNode);
					let treeItem = new BacktestFieldItem(key, valueNode, hasChildren ? valueNode.type === 'object' ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
					treeItem.iconPath = this.getIcon(valueNode);
					treeItem.contextValue = valueNode.type;
					return treeItem;
				});
			return Promise.resolve(tree);
		}
	}

	private getIcon(value: any): any {
		if (_.isBoolean(value)) {
			return iconPath('boolean.svg');
		}
		if (_.isString(value)) {
			return iconPath('string.svg');
		}
		if (_.isNumber(value)) {
			return iconPath('number.svg');
		}
		return null;
	}
}

export class BacktestItem extends vscode.TreeItem {

	constructor(
		public readonly item: any,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(`${_.truncate(item.id, {
			'length': 10,
			'separator': ' '
		})}`, collapsibleState);

		let icon: string = item.performanceReport && (item.performanceReport.profit > 0 ? 'plus.svg' : 'negative.svg') || 'neutral.svg';
		this.iconPath = iconPath(icon);
	}

	get tooltip(): string {
		return `${this.item.id}`;
	}

	get description(): string {
		return `${this.item.exchange} - ${this.item.pair} - ${this.item.tradingAdvisor.method} | ${this.item.performanceReport &&
			formatNumber(profitPercent(this.item.performanceReport)) + ' in ' + this.item.performanceReport.timespan} - candle of ${this.item.tradingAdvisor.candleSize}m`;
	}
	contextValue = 'backtestItem';
}

export class BacktestFieldItem extends vscode.TreeItem {

	constructor(
		public readonly key: string,
		public readonly value: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
	) {
		super(`${key}: ${value}`, collapsibleState);
	}

	get tooltip(): string {
		return `${this.key}: ${this.value}`;
	}

	contextValue = 'field';
}
