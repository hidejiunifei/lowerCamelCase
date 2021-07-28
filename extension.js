// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function toLowerCamelCase()
{
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const document = editor.document;
		editor.edit(editBuilder => {
			editor.selections.forEach(sel => {
				let word = document.getText(sel);
				let camelCased = word.split('-').map((item, index)=>
					(item.length > 0 ? (index > 0 ? item[0].toUpperCase() : item[0]) : '')
					+(item.length > 1 ? item.substr(1) : '')).join('');

				editBuilder.replace(sel, camelCased);
			})
		}) // apply the (accumulated) replacement(s) (if multiple cursors/selections)
	}
}

function fromLowerCamelCase()
{
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const document = editor.document;
		editor.edit(editBuilder => {
			editor.selections.forEach(sel => {
				const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
				let word = document.getText(range);
				let hyphened = word.split('').map((c, index) => (index > 0 && c == c.toUpperCase() ? '-' + c.toUpperCase() : c)).join('');

				editBuilder.replace(range, hyphened);
			})
		}) // apply the (accumulated) replacement(s) (if multiple cursors/selections)
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "camel-case" is now active!');

	let disposable = vscode.commands.registerCommand('extension.toLowerCamelCase', () => 
	{
		toLowerCamelCase();
	});

	context.subscriptions.push(disposable);
	
	disposable = vscode.commands.registerCommand('extension.fromLowerCamelCase', () => 
	{
		fromLowerCamelCase();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
