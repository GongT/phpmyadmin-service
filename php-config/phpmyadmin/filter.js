const JsonEnv = require(process.env.JENV_FILE_NAME);
const {createHash} = require("crypto");
const {readFileSync} = require("fs");

let settingText = readFileSync(__dirname + '/config.php', {encoding: 'utf8'}).trim();
settingText = settingText.replace(/\?>/, '');

console.log(settingText);

function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function php_escape(value) {
	if (typeof value === 'string') {
		return JSON.stringify(value);
	} else if (typeof value === 'number') {
		return value.toString();
	} else if (typeof value === 'boolean') {
		return value? 'true' : 'false'
	} else {
		throw new TypeError('unknown type "' + (typeof value) + '" of value: ' + value);
	}
}

function replaceOrAppend(text, regex, line) {
	if (regex.test(text)) {
		return text.replace(regex, line);
	} else {
		return text + '\n' + line;
	}
}
