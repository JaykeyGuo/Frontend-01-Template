import { add } from '../src/main.js';
let assert = require('assert');

describe('add', function () {
  it('add(3)(4) should be 7', function () {
    assert.equal(add(3)(4), 7);
  });
});