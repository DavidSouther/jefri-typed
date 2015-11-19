/// <reference path="../node/node.d.ts" />
/// <reference path="../es6-promise/es6-promise.d.ts" />

declare module JEFRi {
  interface JEFRiStatic {
    Runtime: RuntimeStatic;
    Context: Context;
  }

  export interface RuntimeOptions {
    [k: string]: any;
  }

  export interface Prototypes {
    [k: string]: any;
  }

  export interface RuntimeStatic {
    new(contextUri: string, options: RuntimeOptions, protos: Prototypes): Runtime;
  }

  interface Runtime extends NodeJS.EventEmitter {
    load(contextUri: string, protos: Prototypes): Promise<Runtime>;
  }

  interface ContextAttributes {
    [k: string]: any;
  }

  export interface ContextEntities {
    [k: string]: ContextEntity;
  }

  export interface ContextEntity {
    [k: string]: any;
  }

  export interface Context {
    attributes?: ContextAttributes;
    entities: ContextEntities;
  }
}

declare module 'jefri' {
  var j: JEFRi.JEFRiStatic;
  export = j;
}

