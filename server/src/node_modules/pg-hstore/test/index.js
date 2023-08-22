/*globals it, describe */
var mocha  = require('mocha'),
	should = require('should'),
	hstore = require('../lib/index.js')({sanitize : true});

describe('pg-hstore.index', function() {
  it('should get out the same object it put in when sanitizing', function() {
  	var testObj = {foo : "bar", count : "1", emptyString : "", quotyString : '""', extraQuotyString : '"""a"""""', singleQuotyString : "'a''", backslashes : '\\f023', moreBackslashes : '\\f\\0\\2\\1', backslashesAndQuotes : '\\"\\"uhoh"\\"', nully : null};
	hstore.parse(hstore.stringify(testObj)).should.eql(testObj);
  });
});