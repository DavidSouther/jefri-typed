import { expect } from 'chai';
import { Runtime } from 'jefri';
import * as JEFRi from 'jefri';
import * as UserContext from 'user-context';
import { CONTEXT } from './jefri-typed.mock';

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
});

