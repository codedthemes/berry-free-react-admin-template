[![Build Status](https://travis-ci.org/scarney81/pg-hstore.png)](https://travis-ci.org/[YOUR_GITHUB_USERNAME]/[YOUR_PROJECT_NAME])

pg-hstore
===========

A node package for serializing and deserializing JSON data to hstore format

## Install pg-hstore

```bash
$ npm install pg-hstore
```

## Usage
### stringify

```javascript
var hstore = require('pg-hstore')();
var source = { foo: "oof", bar: "rab", baz: "zab" };
hstore.stringify(source, function(result) {
  ...
  // result = '"foo"=>"oof", "bar"=>"rab", "baz"=>"zab"'
  ...
});
```

### parse

```javascript
var hstore = require('pg-hstore')();
var source = '"foo"=>"oof", "bar"=>"rab", "baz"=>"zab"';
hstore.parse(source, function(result) {
  ...
  // result = { foo: "oof", bar: "rab", baz: "zab" } 
  ...
});
```
