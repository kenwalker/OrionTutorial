/**
 * An Orion plugin that extends the editor in 4 ways for the benefit of Markdown editing.
 * The first part is associating the Markdown file extension which includes an icon.
 * The second is a command extension that converts the selection to and from a Markdown List.
 * The third is a content assist extension that provides either an example document or a link as the two completion paths.
 * The forth is a highlighter extension that provides some very simple syntax highlighting for Markdown text.
 */

// The following comment tells JSLint which variables are globals thus removing the errors.
/*global orion window */

window.onload = function() {

    // create the Markdown List plugin headers
    var headers = {
        name: "Markdown Extensions",
        version: "1.0",
        description: "This plugin provides editor extensions for Markdown lists, content assist and syntax highlighting."
    };

    // Create the provider based on the headers
    var provider = new orion.PluginProvider(headers);

    //===================================== PART 1 ============================================================
    /**
     * The first part is associating the Markdown file extension which includes an icon.
     */

    // Register the content type for all known extensions and the id for Markdown.
    provider.registerServiceProvider("orion.file.contenttype", {}, {
        contentTypes: [{
            id: "text/x-markdown",
            name: "Markdown",
            extension: ["md", "markdown", "mdown", "mkd", "mkdn"],
            image: "http://localhost:8080/file/tutorial/OrionTutorial/solutions/exercise-2/lib/MarkdownSolid.png"
        }]
    });


    //===================================== PART 2 ============================================================
    /**
     * The second is a command extension that converts the selection to and from a Markdown List
     */

    /**
     * A helper function that converts lines of markdown text into a list. If the lines are already
     * a list, it will remove the list markup.
     * @param text input markdown text
     * @return text converted to or from a list
     */
    function convertToFromList(text) {
        // convert or uncovert
        var convert = true;

        //figure out which direction we're going
        var lines = text.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var position = lines[i].search("^[ \t]*\\* ");
            if (position > -1) {
                convert = false;
            }
        }
        var result = "";

        // now covert
        for (i = 0; i < lines.length; i++) {
            if (lines[i].replace(/\s/g, "") === "") {
                result += lines[i];
            } else {
                if (convert) {
                    result += (lines[i].replace(new RegExp("^[ \t]*"), " * "));
                } else {
                    result += (lines[i].replace(new RegExp("^[ \t]*\\* "), ""));
                }
            }

            if ((i !== (lines.length - 1))) {
                result += '\n';
            }
        }

        return result;
    }

    // Create the editor command service implementation
    var serviceImpl = {
        run: function(selectedText, text, selection) {
            return convertToFromList(selectedText);
        }
    };

    // Create the service properties including a hotkey to convert selection to/from a list    
    var serviceProps = {
        name: "Convert to Markdown List",
        key: ["l", true, true],
        contentType: ["text/x-markdown"]
    };

    // Register the editor command
    provider.registerServiceProvider("orion.edit.command", serviceImpl, serviceProps);

    //===================================== PART 3 ============================================================
    /**
     * The third part is a content assist extension that provides either an example document or a link as the two completion paths.
     */

    // Create the content assist service implementation
    var contentAssistImpl = {
        computeProposals: function(buffer, offset, selection) {
            var proposals = [];

            //template - simple markdown document
            if (buffer.length === 0) {
                var text = "# Heading 1 \r\n" + "## Sub-Heading 1.1 \r\n" + "### Sub-Sub Heading 1.1.1 \r\n" + "## Sub-Heading 1.2 \r\n" + "# Heading 2 \r\n" + "# Heading 3 \r\n";

                proposals.push({
                    proposal: text,
                    description: "Simple Markdown document",
                    escapePosition: selection.offset + 152
                });
            }

            var proposalText = "[Link Name](http:// \"Optional Title Here\")";
            var description = "Insert a hyperlink";
            proposals.push({
                proposal: proposalText,
                description: description
            });

            return proposals;
        }
    };

    provider.registerServiceProvider("orion.edit.contentAssist", contentAssistImpl, {
        name: "Markdown content assist",
        contentType: ["text/x-markdown"]
    });


    //===================================== PART 4 ============================================================
    /**
     * The forth part is a highlighter extension that provides some very simple syntax highlighting for Markdown text.
     */

    // Create the syntax highlighting service.
    var markdownGrammar = {
        patterns: [
        // markdown grammar
        // headers
        {
            "match": "^#.*$",
                "name": "entity.name.tag.doctype.html"
        },
        // links
        {
            "match": "(^\\[.*\\]: ?[\\w:/.\\?\\&=_-]+( \".*\")?$)|(\\[.*\\](\\(.*\\))?)",
                "name": "token_keyword"
        },
        // lists
        {
            "begin": "^( )*([\\*\\+\\-]|(\\d.)) ",
                "end": "^$",
                "beginCaptures": {
                "0": {
                    "name": "punctuation.definition.comment.html"
                }
            },
                "endCaptures": {
                "0": {
                    "name": "punctuation.definition.comment.html"
                }
            },
                "contentName": "comment.block.html",
                "patterns": [{
                "match": "\\[.*\\]",
                    "name": "token_keyword"
            }]
        }]
    };

    // Register the highlighter service. Highlighter services can be a grammar or the more complex highlighter.
    provider.registerServiceProvider("orion.edit.highlighter", {}, {
        type: "grammar",
        contentType: ["text/x-markdown"],
        grammar: markdownGrammar
    });

    // Finally, connect the provider
    provider.connect();
};