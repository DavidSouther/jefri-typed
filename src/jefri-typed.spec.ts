import { expect } from 'chai';
import { Runtime } from 'jefri';
import { CONTEXT } from './jefri-typed.mock';

describe('Jefri', function() {
  it('has a Runtime', function() {
    expect(Runtime).to.exist;
  });
});

