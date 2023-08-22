/*globals it, describe, beforeEach */
(function () {
  'use strict';

  var should = require('should'),
      assert= require('assert'),
      HStore = require('../lib/index.js'),
      hstore;

  describe('pg-hstore.parse', function () {
    beforeEach(function () {
      hstore = new HStore();
    });

    it('should hstore parse an hstore string', function (done) {
      var source = '"foo"=>"bar"';
      hstore.parse(source, function (target) {
        should.exist(target);
        target.foo.should.equal('bar');
        done();
      });
    });

    it('should hstore parse an empty hstore string', function (done) {
      var source = '';
      hstore.parse(source, function (target) {
        should.exist(target);
        target.should.eql({});
        done();
      });
    });

    it('should hstore parse an hstore string with multiple values', function (done) {
      var source = '"foo"=>"oof","bar"=>"rab","baz"=>"zab"';
      hstore.parse(source, function (target) {
        should.exist(target);
        target.foo.should.equal('oof');
        target.bar.should.equal('rab');
        target.baz.should.equal('zab');
        done();
      });
    });

    it('should hstore parse an escaped quoted string with quotes', function (done) {
      var source = '"foo"=>"\\"bar\\""';
      hstore.parse(source, function (target) {
        should.exist(target);
        target.foo.should.equal('"bar"');
        done();
      });
    });

    it('should hstore parse an escaped quoted string with single quotes', function (done) {
      var source = '"foo"=>"\'\'bar\'\'"';
      hstore.parse(source, function (target) {
        should.exist(target);
        target.foo.should.equal('\'bar\'');
        done();
      });
    });

    it('should hstore parse a string with escaped backslashes', function (done) {
      var source = '"foo"=>"\\\\f0123"';
      hstore.parse(source, function (target) {
        should.exist(target);
        target.foo.should.equal('\\f0123');
        done();
      });
    });

    it('should hstore parse a string with commas', function (done) {
      var source = '"foo"=>"bar,foo,bar"';
      hstore.parse(source, function (target) {
        should.exist(target);
        target.foo.should.equal('bar,foo,bar');
        done();
      });
    });

    it('should hstore parse a string with advanced types', function (done) {
      var source = '"foo"=>"{\\"key\\":\\"value\\",\\"key2\\":\\"value\\"}"';
      hstore.parse(source, function (target) {
        should.exist(target);
        target.foo.should.equal('{"key":"value","key2":"value"}');
        done();
      });
    });

    it('should hstore parse a string with NULL values', function (done) {
      var source = '"foo"=>"oof","bar"=>NULL,"baz"=>"zab"';
      hstore.parse(source, function (target) {
        should.exist(target);
        target.foo.should.equal('oof');
        assert.equal(target.bar, null);
        target.baz.should.equal('zab');
        done();
      });
    });

    it('should hstore parse a string with \n values', function (done) {
      var source = '"foo"=>"o\rof","bar"=>NULL,"baz"=>"z\nab"';
      hstore.parse(source, function (target) {
        should.exist(target);
        target.foo.should.equal('o\rof');
        assert.equal(target.bar, null);
        target.baz.should.equal('z\nab');
        done();
      });
    });

    it('should hstore parse a string ending with \\', function (done) {
      var source = '"url"=>"http://google.com\\\\","foo"=>"bar"';
      hstore.parse(source, function (target) {
        should.exist(target);
        target.url.should.equal('http://google.com\\');
        target.foo.should.equal('bar');
        done();
      });
    });
  });
})();
