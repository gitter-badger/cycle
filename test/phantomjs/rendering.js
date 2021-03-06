'use strict';
/* global describe, it */
var assert = require('assert');
var Cycle = require('../../src/cycle');
var Rx = Cycle.Rx;

describe('Rendering', function () {
  this.timeout(6000);

  describe('Cycle.createRenderer', function () {
    it('should accept a DOM element as input', function () {
      var element = document.createElement('div');
      assert.doesNotThrow(function () {
        Cycle.createRenderer(element);
      });
    });

    it('should accept a string selector to an existing element as input', function () {
      var id = 'testShouldAcceptSelectorToExisting';
      var element = document.createElement('div');
      element.id = id;
      document.body.appendChild(element);
      assert.doesNotThrow(function () {
        Cycle.createRenderer('#' + id);
      });
    });

    it('should not accept a selector to an unknown element as input', function () {
      assert.throws(function () {
        Cycle.createRenderer('#nonsenseIdToNothing');
      }, /Cannot render into unknown element/);
    });

    it('should not accept a number as input', function () {
      assert.throws(function () {
        Cycle.createRenderer(123);
      }, /Given container is not a DOM element neither a selector string/);
    });
  });

  describe('Renderer', function () {
    it('should convert a simple virtual-dom <select> to DOM element', function () {
      var element = document.createElement('div');
      document.body.appendChild(element);
      var view = {
        vtree$: Rx.Observable.just(Cycle.h('select.my-class', [
          Cycle.h('option', {value: 'foo'}, 'Foo'),
          Cycle.h('option', {value: 'bar'}, 'Bar'),
          Cycle.h('option', {value: 'baz'}, 'Baz')
        ]))
      };
      Cycle.createRenderer(element).inject(view);
      var selectEl = document.querySelector('.my-class');
      assert.notStrictEqual(selectEl, null);
      assert.notStrictEqual(typeof selectEl, 'undefined');
    });
  });

});
