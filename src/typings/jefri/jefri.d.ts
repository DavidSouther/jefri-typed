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
    Entity: Entity;
    EntityArray: EntityArray;
  }

  export interface RuntimeStatic {
    new(options: RuntimeOptions): Runtime;
    new(contextUri: string, options: RuntimeOptions): Runtime;
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
    load(contextUri: string, protos?: Prototypes): Promise<Runtime>;
    clear(): Runtime;
    definition(name: string): ContextEntity;
    extend(type: string, protos: Prototypes): Runtime;
    intern<E extends Entity>(entity: E, updateOnIntern: boolean): E;
    build<E extends Entity>(type: string, obj: any): E;
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
    type: string|JEFRiPropertyType;
    attributes?: JEFRiAttributes;
  }

  export enum JEFRiPropertyType {
    int, string, list_int, list_string, boolean
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

  export enum EntityRelationshipType {
    is_a,
    has_a,
    has_many
  }

  export interface EntityMethod {
    params?: { [k: string]: string|JEFRiPropertyType },
    order?: string[],
    return?: string|JEFRiPropertyType;
    definitions: {
      [k: string]: string;
      javascript: string;
    }
  }

  export interface Entity {
    _definition(): ContextEntity;
  }

  export interface EntityArray extends Array<Entity> {
  }
}

declare module 'jefri' {
  var j: JEFRi.JEFRiStatic;
  export = j;
}

