import { expect } from 'chai';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Runtime } from 'jefri';

import { IRuntimeOptions } from 'jefri';
import { User } from '../typings/jefri/user';

import { CONTEXT } from './jefri-typed.mock';
import { generator } from './jefri-typed';

describe('Jefri', function() {
  it('has a Runtime', function() {
    expect(Runtime).to.exist;
  });

  it('creates a Runtime with a context', function() {
    const options: IRuntimeOptions = {debug: {context: CONTEXT}};
    let runtime = new Runtime('', options);
    let entity = runtime.build<User>('User', {name: 'David'});
    expect(entity.name).to.equal('David');
    expect(entity._definition.key).to.equal('user_id');
  });

  it('creates a .d.ts from a context', function() {
    const typings = readFileSync(
      join(__dirname, '../../typings/jefri/user.d.ts'),
      {encoding: 'utf-8'}
    );
    expect(generator('User', CONTEXT).trim()).to.equal(typings.trim());
  });
});

