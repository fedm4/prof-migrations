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
  return db.createTable('lessons', {
    columns: {
      id: {type: 'bigint', unsigned: true, primaryKey: true, autoIncrement: true},
      name: {type: 'string', notNull: true},
      description: {type: 'text', notNull: true},
      link: {type: 'string', notNull: true},
      linkType: {type: 'string', notNull: true},
      userId: {
        type: 'bigint',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'lessons_userid_fk',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
      },
      createdAt: {type: 'datetime', notNull: true},
      updatedAt: {type: 'datetime', notNull: true}
    },
    ifNotExists: true
  });
};

exports.down = function(db) {
  return db.dropTable('lessons');
};

exports._meta = {
  "version": 1
};
