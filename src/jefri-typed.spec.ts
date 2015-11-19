import { expect } from 'chai';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Runtime } from 'jefri';

import * as JEFRi from 'jefri';
import * as UserContext from 'user-context';

import { CONTEXT } from './jefri-typed.mock';
import { generator } from './jefri-typed';

describe('Jefri', function() {
  it('has a Runtime', function() {
    expect(Runtime).to.exist;
  });

  it('creates a Runtime with a context', function() {
    const options: JEFRi.RuntimeOptions = {debug: {context: CONTEXT}};
    let runtime = new Runtime(options);
    let entity = runtime.build<UserContext.User>('User', {name: 'David'});
    expect(entity.name).to.equal('David');
    expect(entity._definition().key).to.equal('user_id');
  });

  it('creates a .d.ts from a context', function() {
    const typings = readFileSync(
      join(__dirname, '../src/typings/jefri/user.d.ts'),
      {encoding: 'utf-8'}
    );
    expect(generator('User', CONTEXT)).to.equal(typings);
  });
});

