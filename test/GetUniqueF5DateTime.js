var path = require('../GetUniqueF5DateTime.js');
var assert = require("assert");
var should = require("should");

describe("GetUniqueF5DateTime", function() {
	var foo = new GetUniqueF5DateTime();
	var bar = new GetUniqueF5DateTime(true);

	it("should allow multiple instances", function() {
		foo.should.be.a('object').and.have.property('showMicroseconds', false);
		bar.should.be.a('object').and.have.property('showMicroseconds', true);
	});
	it("should only return unique values with seconds", function() {
		foo.tellTheTime().should.not.equal(foo.tellTheTime());
	});
	it("should only return unique values with miliseconds", function() {
		bar.tellTheTime().should.not.equal(bar.tellTheTime());
	});
	it("matches the ImageNow field 5 format", function() {
		foo.tellTheTime().should.match(new RegExp("^\\d{2}/\\d{2}/\\d{4} [0,1]\\d:[0-6]\\d:[0-6]\\d (AM|PM)$"));
	});
	it("matches the ImageNow field 5 format including miliseconds", function() {
		bar.tellTheTime().should.match(new RegExp("^\\d{2}/\\d{2}/\\d{4} [0,1]\\d:[0-6]\\d:[0-6]\\d\.\\d+ (AM|PM)$"));
	});
});
