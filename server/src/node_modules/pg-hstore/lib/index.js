(function () {
  var _ = require('underscore');

  function sanitize_input(input) {
    // http://www.postgresql.org/docs/9.0/static/sql-syntax-lexical.html [4.1.2.1-4.1.2.2]
    // single quotes (') must be replaced with double single quotes ('')
    input = input.replace(/'/g, '\'\'');
    // backslashes (\) must be replaced with double backslashes (\\)
    input = input.replace(/\\/g, '\\\\');
    // double quotes (") must be replaced with escaped quotes (\\")
    input = input.replace(/"/g, '\\"');
    return input;
  }

  function to_string(input, sanitize) {
    switch(typeof input) {
      case 'boolean':
      case 'number':
      case 'object':
        return String(input);
      case 'string':
        return sanitize ? sanitize_input(input) : input;
      default:
        return '';
    }
  }

  module.exports = function (options) {
    options = _.defaults({}, options, { sanitize: false });

    return {
      stringify: function (data, callback) {
        var hstore = Object.keys(data).map(function (key) {
          if (data[key] === null) {
            return '"'+to_string(key, options.sanitize)+'"=>NULL';
          } else {
            return '"'+to_string(key, options.sanitize)+'"=>"'+to_string(data[key], options.sanitize)+'"';
          }
        });
        var joined = hstore.join();
        if (!callback || callback === null) return joined;
        callback(joined);
      },

      parse: function(string, callback) {
        var result = {},
        //using [\s\S] to match any character, including line feed and carriage return,
            r = /(["])(?:\\\1|\\\\|[\s\S])*?\1|NULL/g,
            matches = string.match(r),
            i,
            l,
            clean = function (value) {
                // Remove leading double quotes
                value = value.replace(/^\"|\"$/g, "");
                // Unescape quotes
                value = value.replace(/\\"/g, "\"");
                //Unescape backslashes
                value = value.replace(/\\\\/g,"\\");
                //Unescape single quotes
                value = value.replace(/''/g,"'");

                return value;
            };

        if(matches) {
          for (i = 0, l = matches.length; i < l; i+= 2) {
            if (matches[i] && matches[i + 1]) {
              var key = clean(matches[i]);
              var value = matches[i + 1];
              result[key] = value=="NULL"?null:clean(value);
            }
          }
        }
        if (!callback || callback === null) return result;
        callback(result);
      }
    };
  };
})();
