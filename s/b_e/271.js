// Generated by CoffeeScript 1.12.3
(function() {
  var I, log, m271, url,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  url = require('url');

  log = require('../log');

  I = require('./I');

  m271 = (function(superClass) {
    extend(m271, superClass);

    function m271() {
      return m271.__super__.constructor.apply(this, arguments);
    }

    m271.prototype.init = function() {
      return this._raw_url = {
        vms: null,
        file: {}
      };
    };

    m271.prototype.on_request = function(info) {
      var i;
      i = url.parse(info.url, true);
      switch (i.host) {
        case 'cache.video.qiyi.com':
          if (i.pathname === '/vms') {
            this._raw_url.vms = info.url;
            return log.d("b_e/271: got vms URL " + info.url);
          }
          break;
        case 'data.video.qiyi.com':
          if (i.pathname.startsWith('/videos/v') && (i.query.qd_stert !== null)) {
            this._raw_url.file[i.query.qd_stert] = info.url;
            return log.d("b_e/271: got one video URL " + info.url);
          }
      }
    };

    m271.prototype.get_info = function() {
      var count, f, i, j, k, len, o, time_s;
      o = m271.__super__.get_info.call(this);
      if (!o.playing) {
        return o;
      }
      if (this._raw_url.vms !== null) {
        o._vms = this._raw_url.vms;
      }
      count = 1;
      f = o.video[o.size].file;
      k = Object.keys(this._raw_url.file).sort((function(_this) {
        return function(a, b) {
          return a - b;
        };
      })(this));
      for (j = 0, len = k.length; j < len; j++) {
        i = k[j];
        time_s = i / 1e3;
        f.push({
          time_s: time_s,
          before: this._raw_url.file[i],
          filename: this._make_filename(count, k.length, time_s)
        });
        count += 1;
      }
      return o;
    };

    m271.prototype.get_url = function(raw) {
      var raw_url;
      raw_url = raw.before;
      return new Promise(function(resolve, reject) {
        return $.getJSON(raw_url, function(data) {
          raw.url = data.l;
          return resolve(raw);
        });
      });
    };

    m271.prototype._make_filename = function(i, i_max, time_s) {
      return m271.__super__._make_filename.call(this, i, i_max, time_s) + '.flv';
    };

    return m271;

  })(I);

  module.exports = m271;

}).call(this);

//# sourceMappingURL=271.js.map