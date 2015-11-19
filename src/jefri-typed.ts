import * as JEFRi from 'jefri';

export function generator(name: string, context: JEFRi.Context): string {
  return [
    getReferenceLine(),
    getAmbientModule(),
    getExternalModule()
  ].join('\n');

  function getReferenceLine(): string {
    return '/// <reference path="./jefri.d.ts" />\n';
  }

  function getAmbientModule(): string {
    return `declare module ${name}Context {
  interface Context {
${contextExports()}
  }

${interfaces()}
}
`;
  }

  function contextExports(): string {
    return Object.keys(context.entities).map(_ => `    ${_}: ${_};`).join('\n');
  }

  function interfaces(): string {
    return Object.keys(context.entities).map(makeInterface).join('\n\n');

  }

  function makeInterface(name: string): string {
    return `  interface ${name} extends JEFRi.Entity {
${makeProperties(name)}
  }`;
  }

  function makeProperties(name: string): string {
    let entity: JEFRi.ContextEntity = context.entities[name];
    return Object.keys(entity.properties).map(makeProperty)
      .concat(Object.keys(entity.relationships).map(makeRelationship))
      .join(',\n');

    function makeProperty(prop: string): string {
      let property: JEFRi.EntityProperty = entity.properties[prop];
      return `    ${prop}: ${makeType(property)}`;
    }

    function makeRelationship(rel: string): string {
      let relationship: JEFRi.EntityRelationship = entity.relationships[rel];
      switch(relationship.type) {
        case 'has_a':
          return `    ${rel}: ${relationship.to.type}`;
        case 'has_many':
          return `    ${rel}: JEFRi.EntityArray<${relationship.to.type}>`;
        default:
          return `    ${rel}: any`;
      }
    }
  }

  function makeType(property: JEFRi.EntityProperty): string {
    switch(property.type) {
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
  }

  function getExternalModule(): string {
    return `declare module "${name.toLowerCase()}-context" {
  var c: ${name}Context.Context;
  export = c;
}\n`;
  }
}
