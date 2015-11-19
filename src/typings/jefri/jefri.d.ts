/// <reference path="../node/node.d.ts" />
/// <reference path="../es6-promise/es6-promise.d.ts" />

declare module JEFRi {
  interface JEFRiStatic {
    Runtime: RuntimeStatic;
    Context: Context;
    ContextEntity: ContextEntity;
    EntityProperty: EntityProperty;
    EntityRelationship: EntityRelationship;
    EntityRelationshipType: EntityRelationshipType;
    EntityMethod: EntityMethod;
  }

  export interface RuntimeStatic {
    new(contextUri: string, options: RuntimeOptions, protos: Prototypes): Runtime;
  }

  export interface RuntimeOptions {
    updateOnIntern?: boolean,
    debug?: {
      context: Context
    };
  }

  export interface Prototypes {
    [k: string]: any;
  }

  interface Runtime extends NodeJS.EventEmitter {
    load(contextUri: string, protos: Prototypes): Promise<Runtime>;
  }

  export interface Context {
    attributes?: JEFRiAttributes;
    entities: ContextEntities;
  }

  export interface JEFRiAttributes {
    [k: string]: any;
  }

  export interface ContextEntities {
    [k: string]: ContextEntity;
  }

  export interface ContextEntity {
    key: string;
    properties: { [k: string]: EntityProperty };
    relationships?: { [k: string]: EntityRelationship };
    methods?: { [k: string]: EntityMethod };
  }

  export interface EntityProperty {
    type: string;
    attributes?: JEFRiAttributes;
  }

  export enum EntityRelationshipType {
    is_a,
    has_a,
    has_many
  }

  export interface EntityRelationship {
    type: string|EntityRelationshipType;
    property: string;
    to: {
      type: string,
      property: string;
    };
    back?: string;
  }

  export interface EntityMethod {
    params?: { [k: string]: string },
    order?: string[],
    return?: string;
    definitions: {
      [k: string]: string;
      javascript: string;
    }
  }
}

declare module 'jefri' {
  var j: JEFRi.JEFRiStatic;
  export = j;
}

