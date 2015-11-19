import {Context} from 'jefri';
import * as JEFRi from 'jefri';

// export const CONTEXT: Context = {
export const CONTEXT: JEFRi.Context = {
  "attributes": {},
  "entities": {
    "User": {
      "key": "user_id",
      "properties": {
        "user_id": {"type": "int"},
        "name": {"type": "string"},
        "address": {"type": "string"},
        "nicknames": {"type": "list"}
      },
      "relationships": {
        "authinfo": {
          "type": "has_a",
          "property": "user_id",
          "to": {"type": "Authinfo", "property": "user_id"},
          "back": "user"
        }
      },
    },

    "Authinfo": {
      "key": "authinfo_id",
      "properties": {
        "authinfo_id": {"type": "int"},
        "user_id": {"type": "int", "attributes": {}},
        "username": {"type": "string", "attributes": {"length": "45"}},
        "password": {"type": "string", "attributes": {"length": "45"}}
      },
      "relationships": {
        "user": {
          "type": "has_a",
          "property": "user_id",
          "to": {"type": "User", "property": "user_id"},
          "back": "authinfo"
        }
      }
    }
  }
};

export const TabletTop: JEFRi.Context = {
  "attributes": {},
  "entities": {
    "Campaign": {
      "key": "campaign_id",
      "properties": {
        "campaign_id": {"type": "string"},
        "name": {"type": "string"},
        "description": {"type": "string"}
      },
      "relationships": {
        "adventures": {
          "type": "has_many",
          "property": "campaign_id",
          "to": {"type": "Adventure", "property": "campaign_id"},
          "back": "campaign"
        }
      }
    },
    "Adventure": {
      "key": "adventure_id",
      "properties": {
        "adventure_id": {"type": "string"},
        "campaign_id": {"type": "string"},
        "name": {"type": "string"},
        "description": {"type": "string"},
        "flavor_ids": {"type": "list"}
      },
      "relationships": {
        "campaign": {
          "type": "has_a",
          "property": "campaign_id",
          "to": {"type": "Campaign", "property": "campaign_id"},
          "back": "adventures"
        },
        "encounters": {
          "type": "has_many",
          "property": "adventure_id",
          "to": {"type": "Encounter", "property": "adventure_id"},
          "back": "adventure"
        },
        "flavor": {
          "type": "has_many",
          "property": "flavor_ids",
          "to": {"type": "Flavor", "property": "flavor_id"}
        }
      }
    },
    "Encounter": {
      "key": "encounter_id",
      "properties": {
        "encounter_id": {"type": "string"},
        "adventure_id": {"type": "string"},
        "map_id": {"type": "string"},
        "name": {"type": "string"},
        "description": {"type": "string"},
        "scale": {"type": "integer"}
      },
      "relationships": {
        "adventure": {
          "type": "has_a",
          "property": "adventure_id",
          "to": {"type": "Adventure", "property": "adventure_id"},
          "back": "encounters"
        },
        "map": {
          "type": "has_a",
          "property": "map_id",
          "to": {"type": "Image", "property": "image_id"}
        }
      }
    },
    "Player": {
      "key": "player_id",
      "properties":
          {"player_id": {"type": "string"}, "name": {"type": "string"}},
      "relationships": {
        "characters": {
          "type": "has_many",
          "property": "player_id",
          "to": {"type": "Character", "property": "player_id"},
          "back": "player"
        }
      }
    },
    "Character": {
      "key": "character_id",
      "properties": {
        "character_id": {"type": "string"},
        "name": {"type": "string"},
        "class": {"type": "string"},
        "level": {"type": "int"},
        "background": {"type": "string"},
        "race": {"type": "string"},
        "alignment": {"type": "string"},
        "experience": {"type": "int"},
        "proficiency": {"type": "string"},
        "strength": {"type": "int"},
        "dexterity": {"type": "int"},
        "constitution": {"type": "int"},
        "intelligence": {"type": "int"},
        "wisdom": {"type": "int"},
        "charisma": {"type": "int"},
        "armorClass": {"type": "int"},
        "initiative": {"type": "int"},
        "speed": {"type": "int"},
        "hitPoints": {"type": "int"},
        "hitDice": {"type": "int"},
        "hitDiceType": {"type": "string"},
        "weapon_ids": {"type": "list"},
        "spell_ids": {"type": "list"},
        "feature_ids": {"type": "list"},
        "traits": {"type": "string"},
        "ideals": {"type": "string"},
        "bonds": {"type": "string"},
        "flaws": {"type": "string"},

        "prof_str": {"type": "boolean"},
        "prof_athletics": {"type": "boolean"},

        "prof_dex": {"type": "boolean"},
        "prof_acrobatics": {"type": "boolean"},
        "prof_sleight_of_hand": {"type": "boolean"},
        "prof_stealth": {"type": "boolean"},

        "prof_con": {"type": "boolean"},

        "prof_int": {"type": "boolean"},
        "prof_arcana": {"type": "boolean"},
        "prof_history": {"type": "boolean"},
        "prof_investigation": {"type": "boolean"},
        "prof_nature": {"type": "boolean"},
        "prof_religion": {"type": "boolean"},

        "prof_wis": {"type": "boolean"},
        "prof_animal_handling": {"type": "boolean"},
        "prof_insight": {"type": "boolean"},
        "prof_medicine": {"type": "boolean"},
        "prof_perception": {"type": "boolean"},
        "prof_survival": {"type": "boolean"},

        "prof_cha": {"type": "boolean"},
        "prof_deception": {"type": "boolean"},
        "prof_intimidation": {"type": "boolean"},
        "prof_performance": {"type": "boolean"},
        "prof_persuasion": {"type": "boolean"}
      },
      "relationships": {
        "player": {
          "type": "has_a",
          "property": "player_id",
          "to": {"type": "Player", "property": "player_id"},
          "back": "characters"
        },
        "weapons": {
          "type": "has_many",
          "property": "weapon_ids",
          "to": {"type": "Weapon", "property": "weapon_id"}
        },
        "spells": {
          "type": "has_many",
          "property": "spell_ids",
          "to": {"type": "Spell", "property": "spell_id"}
        },
        "features": {
          "type": "has_many",
          "property": "feature_ids",
          "to": {"type": "Feature", "property": "feature_id"}
        }
      },
      "methods": {
        "mod": {
          "return": "int",
          "params": {"stat": "int"},
          "order": ["stat"],
          "definitions": {"javascript": "return Math.floor((stat - 10) / 2);"}
        },
        "str_mod": {
          "return": "int",
          "definitions": {"javascript": "return this.mod(this.strength);"}
        },
        "dex_mod": {
          "return": "int",
          "definitions": {"javascript": "return this.mod(this.dexterity);"}
        },
        "con_mod": {
          "return": "int",
          "definitions": {"javascript": "return this.mod(this.constitution);"}
        },
        "int_mod": {
          "return": "int",
          "definitions": {"javascript": "return this.mod(this.intelligence);"}
        },
        "wis_mod": {
          "return": "int",
          "definitions": {"javascript": "return this.mod(this.wisdom);"}
        },
        "cha_mod": {
          "return": "int",
          "definitions": {"javascript": "return this.mod(this.charisma);"}
        },
        "cantrips": {
          "return": "list",
          "definitions": {
            "javascript":
                "return this.spells.filter(function(spell){ return spell.level === 0; });"
          }
        }
      }
    },
    "Feature": {
      "key": "feature_id",
      "properties": {
        "feature_id": {"type": "string"},
        "name": {"type": "string"},
        "description": {"type": "string"},
        "class": {"type": "string"},
        "level": {"type": "integer"},
        "feat": {"type": "boolean"},
        "race": {"type": "string"}
      },
      "methods": {
        "featureList": {
          "return": "list<string>",
          "definitions": {
            "javascript":
                "return [ this.race != '' ? this.race : false, this.class != 'Any' ? this.class : false, this.level ? 'Level ' + this.level : false, this.feat ? 'Feat' : false].filter(function(_){ return _ !== false })"
          }
        }
      }
    },
    "Token": {
      "key": "token_id",
      "properties": {
        "token_id": {"type": "string"},
        "encounter_id": {"type": "string"},
        "image": {"type": "string"}
      }
    },
    "Image": {
      "key": "image_id",
      "properties": {
        "image_id": {"type": "string"},
        "url": {"type": "string"},
        "name": {"type": "string"},
        "usage": {"type": "string"},
        "width": {"type": "integer"},
        "height": {"type": "integer"}
      }
    },
    "Flavor": {
      "key": "flavor_id",
      "properties":
          {"flavor_id": {"type": "string"}, "image_id": {"type": "string"}},
      "relationships": {
        "image": {
          "type": "has_a",
          "property": "image_id",
          "to": {"type": "Image", "property": "image_id"}
        }
      }
    },
    "Weapon": {
      "key": "weapon_id",
      "properties": {
        "weapon_id": {"type": "string"},
        "flavor_id": {"type": "string"},
        "name": {"type": "string"},
        "type": {"type": "string"},
        "range": {"type": "int"},
        "cost": {"type": "float"},
        "damage": {"type": "string"},
        "damage_type": {"type": "string"},
        "weight": {"type": "int"},
        "properties": {"type": "list"}
      },
      "relationships": {
        "flavor": {
          "type": "has_a",
          "property": "flavor_id",
          "to": {"type": "Flavor", "property": "flavor_id"}
        }
      }
    },
    "Spell": {
      "key": "spell_id",
      "properties": {
        "spell_id": {"type": "string"},
        "flavor_id": {"type": "string"},
        "page": {"type": "string"},
        "range": {"type": "int"},
        "name": {"type": "string"},
        "verbal": {"type": "boolean"},
        "somatic": {"type": "boolean"},
        "material": {"type": "list"},
        "concentration": {"type": "boolean"},
        "ritual": {"type": "boolean"},
        "duration": {"type": "string"},
        "casting_time": {"type": "string"},
        "level": {"type": "int"},
        "school": {"type": "string"},
        "class": {"type": "list"},
        "description": {"type": "string"},
        "overview": {"type": "string"}
      },
      "relationships": {
        "flavor": {
          "type": "has_a",
          "property": "flavor_id",
          "to": {"type": "Flavor", "property": "flavor_id"}
        }
      },
      "methods": {
        "chips": {
          "return": "list<string>",
          "definitions": {
            "javascript":
                "return [ this.school, this.level == 0 ? 'Cantrip' : 'Level ' + this.level, this.casting_time, this.duration, this.range > 1 ? this.range + ' ' + 'feet' : 'Touch', [ this.verbal ? 'V' : '', this.somatic ? 'S' : '', this.material ? 'M' : '', this.ritual ? 'R' : '', this.concentration ? 'C' : '', ].join(''), this.page ];"
          }
        }
      }
    },
    "Monster": {
      "key": "monster_id",
      "properties": {
        "monster_id": {"type": "string"},
        "name": {"type": "string"},
        "description": {"type": "string"},
        "alignment": {"type": "string"},
        "type": {"type": "string"},
        "size": {"type": "string"},
        "page": {"type": "string"},
        "xp": {"type": "int"},
        "challenge": {"type": "int"},
        "tags": {"type": "list"},
        "environments": {"type": "list"}
      }
    }
  }
};

export const JefriContextContext: JEFRi.Context = {
  "attributes": {},
  "entities": {
    "Context": {
      "key": "context_id",
      "properties":
          {"context_id": {"type": "string"}, "name": {"type": "string"}},
      "relationships": {
        "entities": {
          "type": "has_many",
          "property": "context_id",
          "to": {"type": "Entity", "property": "context_id"},
          "back": "context"
        }
      },
      "methods": {
        "export": {
          "definitions": {
            "javascript":
                "var context = {attributes: {}, entities: {}};\nthis.entities.forEach(function(entity){\n\tcontext.entities[entity.name] = entity.export();\n});\nreturn JSON.stringify(context);"
          }
        }
      }
    },
    "Entity": {
      "key": "entity_id",
      "properties": {
        "entity_id": {"type": "string"},
        "context_id": {"type": "string"},
        "name": {"type": "string"},
        "key": {"type": "string"}
      },
      "relationships": {
        "context": {
          "type": "has_a",
          "property": "context_id",
          "to": {"type": "Context", "property": "context_id"},
          "back": "entities"
        },
        "properties": {
          "type": "has_many",
          "property": "entity_id",
          "to": {"type": "Property", "property": "entity_id"},
          "back": "entity"
        },
        "relationships": {
          "type": "has_many",
          "property": "entity_id",
          "to": {"type": "Relationship", "property": "to_id"},
          "back": "from"
        }
      },
      "methods": {
        "export": {
          "definitions": {
            "javascript":
                "var entity = {key: this.key, properties: {}, relationships: {}};\nthis.properties.forEach(function(property){\n\tentity.properties[property.name] = property.export();\n});\nthis.relationships.forEach(function(relationship){\n\tentity.relationships[relationship.name] = relationship.export();\n});\nreturn entity;"
          }
        }
      }
    },
    "Property": {
      "key": "property_id",
      "properties": {
        "property_id": {"type": "string"},
        "entity_id": {"type": "string"},
        "name": {"type": "string"},
        "type": {"type": "string"}
      },
      "relationships": {
        "entity": {
          "type": "has_a",
          "property": "entity_id",
          "to": {"type": "Entity", "property": "entity_id"},
          "back": "properties"
        }
      },
      "methods": {
        "export": {
          "definitions": {
            "javascript": "var property = {type: this.type};\nreturn property;"
          }
        }
      }
    },
    "Relationship": {
      "key": "relationship_id",
      "properties": {
        "relationship_id": {"type": "string"},
        "name": {"type": "string"},
        "type": {"type": "string"},
        "to_id": {"type": "string"},
        "to_property": {"type": "string"},
        "from_id": {"type": "string"},
        "from_property": {"type": "string"},
        "back": {"type": "string"}
      },
      "relationships": {
        "to": {
          "type": "has_a",
          "property": "to_id",
          "to": {"type": "Entity", "property": "entity_id"}
        },
        "from": {
          "type": "has_a",
          "property": "from_id",
          "to": {"type": "Entity", "property": "entity_id"},
          "back": "relationships"
        }
      },
      "methods": {
        "normalize": {
          "definitions": {
            "javascript":
                "var this$=this;\nthis._runtime.get_first({'_type': 'Entity', 'entity_id': this.to_id}).then(\n\tfunction(found){\n\t\tthis$.to = found;\n\t}\n);"
          }
        },
        "export": {
          "definitions": {
            "javascript":
                "var relationship = {type: this.type, property: this.from_property, to: {type: this.to.name, property: this.to_property}, back: this.back};\nreturn relationship;"
          }
        }
      }
    }
  }
};
