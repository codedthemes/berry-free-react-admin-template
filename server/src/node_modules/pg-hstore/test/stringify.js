/*globals it, describe, beforeEach */
(function () {
  'use strict';

  var should = require('should'),
      HStore = require('../lib/index.js'),
      hstore;

  describe('pg-hstore.stringify', function () {
    describe('without sanitization', function(){
      beforeEach(function () {
        hstore = new HStore();
      });

      it('should hstore encode a string', function (done) {
        var source = { foo: 'bar' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"bar"');
          done();
        });
      });

      it('should hstore encode a number', function (done) {
        var source = { foo: 1000 };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"1000"');
          done();
        });
      });

      it('should hstore encode a boolean', function (done) {
        var source = { foo: true };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"true"');
          done();
        });
      });

      it('should hstore encode an object', function (done) {
        var source = { foo: { bar: 1000 } };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"[object Object]"');
          done();
        });
      });

      it('should hstore encode a null value', function (done) {
        var source = { foo: null };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>NULL');
          done();
        });
      });

      it('should hstore encode a null string value', function (done) {
        var source = { foo: 'null' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"null"');
          done();
        });
      });

      it('should hstore encode single quotes correctly', function (done) {
        var source = { 'foo \'quotes\'': 'with \'quotes\'' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo \'quotes\'"=>"with \'quotes\'"');
          done();
        });
      });

      it('should hstore encode double quotes correctly', function (done) {
        var source = { foo: 'with \"quotes\"' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"with "quotes""');
          done();
        });
      });

      it('should hstore encode double quote keys correctly', function (done) {
        var source = { 'foo \"quotes\"': 'with \"quotes\"' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo "quotes""=>"with "quotes""');
          done();
        });
      });

      it('should hstore encode colon correctly', function (done) {
        var source = { 'foo': 'with:colon' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"with:colon"');
          done();
        });
      });

      it('should not sanitize output', function (done) {
        var source = { 'foo\'"\\': 'bar' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo\'"\\"=>"bar"');
          done();
        }, true);
      });
    });

    describe('with sanitization', function(){
      beforeEach(function () {
        hstore = new HStore({sanitize : true});
      });

      it('should hstore encode a string', function (done) {
        var source = { foo: 'bar' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"bar"');
          done();
        });
      });

      it('should hstore encode a number', function (done) {
        var source = { foo: 1000 };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"1000"');
          done();
        });
      });

      it('should hstore encode a boolean', function (done) {
        var source = { foo: true };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"true"');
          done();
        });
      });

      it('should hstore encode a null value', function (done) {
        var source = { foo: null };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>NULL');
          done();
        });
      });

      it('should hstore encode a null string value', function (done) {
        var source = { foo: 'null' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"null"');
          done();
        });
      });

      it('should hstore encode single quotes correctly', function (done) {
        var source = { 'foo \'quotes\'': 'with \'quotes\'' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo \'\'quotes\'\'"=>"with \'\'quotes\'\'"');
          done();
        });
      });

      it('should hstore encode double quotes correctly', function (done) {
        var source = { foo: 'with "quotes"' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"with \\"quotes\\""');
          done();
        });
      });

      it('should hstore encode backslashes correctly', function (done) {
        var source = { '\\f0122': '\\f0123' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"\\\\f0122"=>"\\\\f0123"');
          done();
        });
      });

      it('should hstore encode colon correctly', function (done) {
        var source = { 'foo': 'with:colon' };
        hstore.stringify(source, function (target) {
          should.exist(target);
          target.should.equal('"foo"=>"with:colon"');
          done();
        });
      });
    });
  });
})();
