import * as JEFRi from 'jefri';

export const CONTEXT: JEFRi.Context = {
  "attributes": {},
  "entities": {
    "User": {
      "key": "user_id",
      "properties": {
        "user_id": {"type": "int", "attributes": {"primary": "true"}},
        "name": {"type": "string"},
        "address": {"type": "string", "attributes": {"unique": "true"}},
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
      "attributes": {"vname": "users"}
    },

    "Authinfo": {
      "key": "authinfo_id",
      "properties": {
        "authinfo_id": {"type": "int", "attributes": {"primary": "true"}},
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
}
