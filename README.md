# XML/JSON Benchmarks

Comparison of XML and JSON processing time in different programming languages.

Iterative measurements performed:

* XML/JSON file reading
* deserialization
* serialization

These actions are performed over a set of samples and repeated in order to get a mean processing time, a confidence interval and finally a statistical test of the null hypothesis "processing XML and JSON takes the same time".

*Samples are not provided in this repository.*

Libraries/modules used for XML and JSON processing:

* **Python** (3.7):
	* XML: `lxml.etree`
	* JSON: `json` (standard module)
* **NodeJS** (10.9):
	* XML: `xmldom`
	* JSON: `JSON` (built-in)