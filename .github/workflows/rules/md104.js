"use strict";

/*
ignore lists!
ignore headers!
*/

module.exports = {
  "names": [ "MD104", "one line per sentence" ],
  "description": "one line (and only one line) per sentence",
  "tags": [ "sentences" ],
  "function": function rule(params, onError) {
    for (const inline of params.tokens.filter(function filterToken(token) {
      return token.type === "inline";
    })) {
	var actual_lines = inline.content.split("\n");
	actual_lines.forEach( (line, index, arr) => {
	    /* check how many sentence endings are per line */
	    var dots = line.split(".").length - 1;
	    var question_marks = line.split("?").length - 1;
	    var exclamation_marks = line.split("!").length - 1;
	    /* there should be only one sentence ending per line! */
	    if (dots + question_marks + exclamation_marks > 1) {
		    onError({
			    "lineNumber": inline.lineNumber + index,
			    "detail": "Expected one sentence per line. Multiple end of sentence punctuation signs found on one line!"
		    });
	    }});
    }
  }
};
