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
  return db.createTable('groups', {
    columns:{
      id: {type: 'bigint', unsigned: true, primaryKey: true, autoIncrement: true},
      name: {type:'string', notNull: true},
      description: {type: 'string', notNull: true},
      userId: {
        type: 'bigint',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'groups_userid_fk',
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
  return db.dropTable('groups');
};

exports._meta = {
  "version": 1
};
