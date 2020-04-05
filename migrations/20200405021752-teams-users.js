'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('teams_users', {
    columns: {
      teamId: {
        type: 'bigint',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'teams_users_teamid_fk',
            table: 'teams',
            rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
            },
            mapping: 'id'
        }
      },
      userId: {
        type: 'bigint',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'teams_users_userid_fk',
            table: 'users',
            rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
            },
            mapping: 'id'
        }
      }
    },
    ifNotExists: true
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
