import { expect } from 'chai';
import { MESSAGE } from './jefri-typed';

describe('Jefri Typed', function() {
  it('eports a message', function() {
    expect(MESSAGE).to.equal('jefri-typed');
  });
});
