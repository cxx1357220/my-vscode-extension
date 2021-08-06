import * as vscode from 'vscode';
const axios = require('axios');
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
const fanyi = vscode.commands.registerCommand('myvscodetool.fanyi', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return; }

    const selection = editor.selection;
    const text = editor.document.getText(selection);
    if (text) {
        axios.post('https://fanyi.baidu.com/sug', {
            'kw': text
        }).then((res: any) => {
            console.log(res.data.data[0].v);
            if(res?.data?.data[0]?.v){
                vscode.commands.executeCommand('editor.action.insertLineAfter')
                .then(() => {
                    // const range = new vscode.Range(selection.start, selection.end);
                    // editor.edit((editBuilder) => {
                    // 	editBuilder.replace(range, '/*'+ text+"===>" + res.data.data[0].v + '*/');
                    // });
                    const logToInsert = '/*' + text + "===>" + res.data.data[0].v + '*/';
                    insertText(logToInsert);
                });
            }
            
        });
    }
});
export default fanyi;