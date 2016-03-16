import {
  Context,
  ContextEntity,
  Entity,
  EntityMethod,
  EntityProperty,
  EntityRelationship,
  JEFRiPropertyType
} from 'jefri';

export function generator(name: string, context: Context): string {
  return [
    getJEFRiLine(),
    interfaces()
  ].join('\n');

  function getJEFRiLine(): string {
    return `import { Entity } from 'jefri';\n`;
  }


  function contextExports(): string {
    return Object.keys(context.entities).map(_ => `  ${_}: ${_};`).join('');
  }

  function interfaces(): string {
    return Object.keys(context.entities).map(makeInterface).join('\n\n');

  }

  function makeInterface(name: string): string {
    return `export interface ${name} extends Entity {
${makeProperties(name)}
}`;
  }

  function makeProperties(name: string): string {
    let entity: ContextEntity = context.entities[name];
    return Object.keys(entity.properties).map(makeProperty)
      .concat(Object.keys(entity.relationships || {}).map(makeRelationship))
      .concat(Object.keys(entity.methods || {}).map(makeMethod))
      .join('\n');

    function makeProperty(prop: string): string {
      let property: EntityProperty = entity.properties[prop];
      return `  ${prop}: ${makeType(property.type)};`;
    }

    function makeRelationship(rel: string): string {
      let relationship: EntityRelationship = entity.relationships[rel];
      switch(relationship.type) {
        case 'has_a':
          return `  ${rel}: ${relationship.to.type};`;
        case 'has_many':
          return `  ${rel}: EntityArray<${relationship.to.type}>;`;
        default:
          return `  ${rel}: any;`;
      }
    }

    function makeMethod(prop: string): string {
      let method: EntityMethod = entity.methods[prop];
      return `  ${prop}(${makeParams(method)}): ${makeType(method.return)};`
    }

    function makeParams(method: EntityMethod): string {
      return method.order && method.params ?
        method.order.map(_ => `${_}: ${makeType(method.params[_])}`).join(','):
        '';
    }
  }

  function makeType(jefriType: string|JEFRiPropertyType): string {
    if (typeof jefriType == 'string') {
      let listType = (<string>jefriType).match(/list\<([^\>]+)\>/);
      if (listType !== null) {
        return `${makeType(listType[1])}[]`;
      }
      if(jefriType in context.entities) {
        return <string>jefriType;
      }
      switch(jefriType) {
        case 'boolean':
          return 'boolean';
        case 'int':
        case 'float':
          return 'number'
        case 'string':
          return 'string';
        case 'list<int>':
        case 'list<float>':
          return 'number[]';
        case 'list<string>':
          return 'string[]';
        case 'object':
          return '{[k: string]: any}';
        default:
          return 'any';
      }
    } else {
      return 'any';
    }
  }
}
