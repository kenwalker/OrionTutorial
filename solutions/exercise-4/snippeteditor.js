 
/*globals define window localStorage console */

define(["./snippet_files/built-editor-amd.min.js"],   
function(edit) {


var htmlEditor = edit({parent: "htmlEditor"});
var jsEditor = edit({parent: "jsEditor"});
var cssEditor = edit({parent: "cssEditor"});

	
var document = window.document;
var bRun = document.getElementById("runSnippet"); //$NON-NLS-0$
var bSave = document.getElementById("saveSnippet"); //$NON-NLS-0$
var bLoad = document.getElementById("loadSnippet"); //$NON-NLS-0$
var tName = document.getElementById("nameSnippet"); //$NON-NLS-0$
var output = document.getElementById("output"); //$NON-NLS-0$

function runSnippet () {
	var htmlContent = htmlEditor.getTextView().getText();
	var jsContent = jsEditor.getTextView().getText();
	var cssContent = cssEditor.getTextView().getText();
	htmlContent = htmlContent.replace("//SCRIPT", jsContent);
	htmlContent = htmlContent.replace("//STYLE", cssContent);
	var frameDocument = output.contentWindow.document;
	frameDocument.open('text/html', 'replace');
	frameDocument.write(htmlContent);
	frameDocument.close();
}

function saveSnippet () {
	var htmlContent = htmlEditor.getTextView().getText();
	var jsContent = jsEditor.getTextView().getText();
	var cssContent = cssEditor.getTextView().getText();
	var snippet = JSON.stringify({html: htmlContent, js: jsContent, css: cssContent});
	
	if (!tName.value) {
		tName.value = "mySnippet";
	}
	// Put the object into storage
	localStorage.setItem(tName.value, snippet);
}

function loadSnippet () {
	if (!tName.value) {
		tName.value = "mySnippet";
	}
	
	// Retrieve the object from storage
	var snippet = JSON.parse(localStorage.getItem(tName.value));
	
	htmlEditor.getTextView().setText(snippet.html);
	jsEditor.getTextView().setText(snippet.js);
	cssEditor.getTextView().setText(snippet.css);
}

bRun.onclick = runSnippet;
bSave.onclick = saveSnippet;
bLoad.onclick = loadSnippet;

});