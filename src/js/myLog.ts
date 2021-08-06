
import * as vscode from 'vscode';
const insertText = (text: string) => {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		vscode.window.showErrorMessage('Can\'t insert console.log because no document is open');
		return;
	}

	const selection = editor.selection;

	const range = new vscode.Range(selection.start, selection.end);

	editor.edit((editBuilder) => {
		editBuilder.replace(range, text);
	});
};
const mylog = vscode.commands.registerCommand('myvscodetool.log', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return; }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    text
        ? vscode.commands.executeCommand('editor.action.insertLineAfter')
            .then(() => {
                const logToInsert = `console.log('${text}: ', ${text});`;
                insertText(logToInsert);
            })
        : insertText('console.log();');
});
export default mylog;


