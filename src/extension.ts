import * as vscode from 'vscode';
import mylog from './js/myLog';
import deleteAllLog from './js/delLog';
import notesAllLog from './js/notesLog';
import fanyi from './js/fanyi';
export function activate(context: vscode.ExtensionContext) {
	const chinaNo1 = vscode.commands.registerCommand(
		'myvscodetool.china',
		() => {
			vscode.window.showInformationMessage('China No.1');
		}
	);
	context.subscriptions.push(chinaNo1);
	context.subscriptions.push(mylog);
	context.subscriptions.push(deleteAllLog);
	context.subscriptions.push(notesAllLog);
	context.subscriptions.push(fanyi);
}
export function deactivate() { }
