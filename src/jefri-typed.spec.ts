import { expect } from 'chai';
import { Runtime } from 'jefri';
import * as JEFRi from 'jefri';
import { CONTEXT } from './jefri-typed.mock';

describe('Jefri', function() {
  it('has a Runtime', function() {
    expect(Runtime).to.exist;
  });

  it('creates a Runtime with a context', function() {
    type User = JEFRi.Entity & {
      user_id: string,
      name: string,
      address: string,
      nicknames: string[]
    };
    const options: JEFRi.RuntimeOptions = {debug: {context: CONTEXT}};
    let runtime = new Runtime(options);
    let entity = runtime.build<User>('User', {name: 'David'});
    expect(entity.name).to.equal('David');
  });
});

