// Configuration: XML and JSON samples paths
const XMLpath = './XML/';
const JSONpath = './JSON/';

const fs = require('fs');

const stats = require('stats-lite');
const ttest = require('ttest');

const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;

const parser = new DOMParser();
const serializer = new XMLSerializer();

function testBatchXML() {
	var hrstart = process.hrtime();
	var files = fs.readdirSync(XMLpath);
	files.forEach(file => {
		XMLstring = fs.readFileSync(XMLpath+file, 'utf8');
		x = parser.parseFromString(XMLstring, 'text/xml');
		string = serializer.serializeToString(x);
		delete XMLstring;
		delete x;
		delete string;
	});
	return process.hrtime(hrstart);
}

function testBatchJSON() {
	var hrstart = process.hrtime();
	var files = fs.readdirSync(JSONpath);
	files.forEach(file => {
		JSONstring = fs.readFileSync(JSONpath+file, 'utf8');
		j = JSON.parse(JSONstring);
		string = JSON.stringify(j);
		delete JSONstring;
		delete j;
		delete string;
	});
	return process.hrtime(hrstart);
}

const nbIter = 1000;
var timesXML = [];
var timesJSON = [];

for (var i=0 ; i<nbIter ; i++) {
	if (i%Math.floor(nbIter/100) == 0 && i != 0) {
		console.log('%d\%', Math.floor(i*100/nbIter));
	}
	timesXML = timesXML.concat(testBatchXML()[1]/1000000);
	timesJSON = timesJSON.concat(testBatchJSON()[1]/1000000);
}

console.log('xmldom, JSON, ' + nbIter + ' iterations, 3 sigma');
console.log('XML: ' + stats.mean(timesXML) + 'ms +/- ' + stats.stdev(timesXML));
console.log('JSON: ' + stats.mean(timesJSON) + 'ms +/- ' + stats.stdev(timesJSON));

console.log('p-value: ' + ttest(timesXML, timesJSON, {mu: -1}).pValue());
