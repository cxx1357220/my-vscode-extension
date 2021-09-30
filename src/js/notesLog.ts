

import * as vscode from 'vscode';


// 获取全部 log 语句
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
// 执行注释 log 每行操作
const notesFoundLogLines = (range: any, edit: vscode.TextEditorEdit, document: any) => {
    // for (let index = range.start.line; index <= range.end.line; index++) {
    let text = document.getText(range);
    edit.replace(range, '/*' + text + '*/');
    // }
};
// 注释所有找到的 log 语句
const notesFoundLog = (logs: any[]) => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const { document } = editor;
        editor.edit(edit => {
            logs.forEach((range: any) => {
                notesFoundLogLines(range, edit, document);
            });
            // deleteSuccessShowMessage(logs);
        });
    }
};
// 注释页面中全部 log
const notesAllLog = vscode.commands.registerCommand(
    'cxxlog.notesLog',
    () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const documentText = editor.document.getText();
        const log = getAllLog(document, documentText);
        notesFoundLog(log);
    }
);
export default notesAllLog;