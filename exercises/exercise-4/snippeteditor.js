 
/*globals define window localStorage console */

define(["./snippet_files/built-editor-amd.min.js"],   
function(edit) {

//Create editors using the edit function -> pass in the DIV ID as the parent

function runSnippet () {
	//Get the HTML, JS and CSS content
	//Put it together and write it to the iframe
}

function saveSnippet () {
	//Get the contents from each editor, stringify and save it in local storage
}

function loadSnippet () {
	//Get the contents from local storage and set them back in the editors
}


});