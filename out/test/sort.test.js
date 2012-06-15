// Generated by CoffeeScript 1.3.1
(function() {
  var Backbone, assert, describe, generateTestSuite, joe, queryEngine, store, today, tomorrow, yesterday,
    __hasProp = {}.hasOwnProperty;

  queryEngine = (typeof require === "function" ? require(__dirname + '/../lib/query-engine.js') : void 0) || this.queryEngine;

  assert = (typeof require === "function" ? require('assert') : void 0) || this.assert;

  Backbone = (typeof require === "function" ? require('backbone') : void 0) || this.Backbone;

  joe = (typeof require === "function" ? require('joe') : void 0) || this.joe;

  describe = joe.describe;

  today = new Date();

  today.setHours(0);

  today.setMinutes(0);

  today.setSeconds(0);

  tomorrow = new Date();

  tomorrow.setDate(today.getDate() + 1);

  yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  store = {
    associatedStandard: queryEngine.createCollection({
      'index': {
        id: 'index',
        title: 'Index Page',
        content: 'this is the index page',
        tags: [],
        position: 2,
        category: 1,
        date: today,
        good: true
      },
      'jquery': {
        id: 'jquery',
        title: 'jQuery',
        content: 'this is about jQuery',
        tags: ['jquery'],
        position: 3,
        category: 1,
        date: yesterday,
        good: false
      },
      'history': {
        id: 'history',
        title: 'History.js',
        content: 'this is about History.js',
        tags: ['jquery', 'html5', 'history'],
        position: 4,
        category: 1,
        date: tomorrow
      }
    }),
    associatedModels: queryEngine.createCollection({
      'index': new Backbone.Model({
        id: 'index',
        title: 'Index Page',
        content: 'this is the index page',
        tags: [],
        position: 2,
        category: 1,
        date: today,
        good: true
      }),
      'jquery': new Backbone.Model({
        id: 'jquery',
        title: 'jQuery',
        content: 'this is about jQuery',
        tags: ['jquery'],
        position: 3,
        category: 1,
        date: yesterday,
        good: false
      }),
      'history': new Backbone.Model({
        id: 'history',
        title: 'History.js',
        content: 'this is about History.js',
        tags: ['jquery', 'html5', 'history'],
        position: 4,
        category: 1,
        date: tomorrow
      })
    })
  };

  generateTestSuite = function(describe, it, collectionName, docs) {
    return describe(collectionName, function(describe, it) {
      describe('sortArray', function(describe, it) {
        it('numeric-function', function() {
          var actual, expected;
          actual = docs.sortArray(function(a, b) {
            return b.position - a.position;
          });
          expected = queryEngine.createCollection([docs.get('history'), docs.get('jquery'), docs.get('index')]);
          return assert.deepEqual(actual, expected.toJSON());
        });
        it('numeric-object', function() {
          var actual, expected;
          actual = docs.sortArray({
            position: -1
          });
          expected = queryEngine.createCollection([docs.get('history'), docs.get('jquery'), docs.get('index')]);
          return assert.deepEqual(actual, expected.toJSON());
        });
        it('date-function', function() {
          var actual, expected;
          actual = docs.sortArray(function(a, b) {
            return b.date - a.date;
          });
          expected = queryEngine.createCollection([docs.get('history'), docs.get('index'), docs.get('jquery')]);
          return assert.deepEqual(actual, expected.toJSON());
        });
        return it('date-object', function() {
          var actual, expected;
          actual = docs.sortArray({
            date: -1
          });
          expected = queryEngine.createCollection([docs.get('history'), docs.get('index'), docs.get('jquery')]);
          return assert.deepEqual(actual, expected.toJSON());
        });
      });
      return describe('sortCollection', function(describe, it) {
        it('numeric-function', function() {
          var actual, expected;
          actual = docs.sortCollection(function(a, b) {
            return b.get('position') - a.get('position');
          });
          expected = queryEngine.createCollection([docs.get('history'), docs.get('jquery'), docs.get('index')]);
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        it('numeric-object', function() {
          var actual, expected;
          actual = docs.sortCollection({
            position: -1
          });
          expected = queryEngine.createCollection([docs.get('history'), docs.get('jquery'), docs.get('index')]);
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        it('date-function', function() {
          var actual, expected;
          actual = docs.sortCollection(function(a, b) {
            return b.get('date') - a.get('date');
          });
          expected = queryEngine.createCollection([docs.get('history'), docs.get('index'), docs.get('jquery')]);
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        it('date-object', function() {
          var actual, expected;
          actual = docs.sortCollection({
            date: -1
          });
          expected = queryEngine.createCollection([docs.get('history'), docs.get('index'), docs.get('jquery')]);
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        it('live-onadd', function() {
          var actual, expected;
          actual = queryEngine.createLiveCollection().setComparator({
            position: -1
          }).add(docs.models);
          expected = queryEngine.createCollection([docs.get('history'), docs.get('jquery'), docs.get('index')]);
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        return it('live-onchange', function() {
          var actual, expected;
          actual = queryEngine.createLiveCollection().setComparator({
            position: -1
          }).add(docs.models);
          actual.at(0).set({
            'position': 0
          });
          expected = queryEngine.createCollection([docs.get('jquery'), docs.get('index'), docs.get('history')]);
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
      });
    });
  };

  describe('sort', function(describe, it) {
    var key, value, _results;
    _results = [];
    for (key in store) {
      if (!__hasProp.call(store, key)) continue;
      value = store[key];
      _results.push(generateTestSuite(describe, it, key, value));
    }
    return _results;
  });

  null;


}).call(this);
