import * as vscode from 'vscode';

// 执行删除 log 每行操作
const deleteFoundLogLines = (range: any, edit: vscode.TextEditorEdit, document: any) => {
	for (let index = range.start.line; index <= range.end.line; index++) {
		edit.delete(document.lineAt(index).rangeIncludingLineBreak);
	}
};

// 删除成功提示信息
const deleteSuccessShowMessage = (logs: any) => {
	const message = logs.length
		? `${logs.length} console.logs deleted`
		: `${logs.length} console.log deleted`;
	vscode.window.showInformationMessage(message);
};
const getAllLog = (document: vscode.TextDocument, documentText: string) => {
    const log = [];
    const logRegex = /console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)\(([\s\S]*?)\);?/g;
    let match;
    while ((match = logRegex.exec(documentText))) {
        const matchRange = new vscode.Range(
            document.positionAt(match.index),
            document.positionAt(match.index + match[0].length)
        );
        if (!matchRange.isEmpty) { log.push(matchRange); }
    }
    return log;
};

// 删除所有找到的 log 语句
const deleteFoundLog = (logs: any[]) => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const { document } = editor;
        editor.edit(edit => {
            logs.forEach((range: any) => {
                deleteFoundLogLines(range, edit, document);
            });
            deleteSuccessShowMessage(logs);
        });
    }
};
// 删除页面中全部 log



const deleteAllLog = vscode.commands.registerCommand(
    'cxxlog.clearLog',
    () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const documentText = editor.document.getText();
        const log = getAllLog(document, documentText);
        deleteFoundLog(log);
    }
);

export default deleteAllLog;