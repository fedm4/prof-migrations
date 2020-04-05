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
  return db.createTable('groups_lessons', {
    columns: {
      groupId: {
        type: 'bigint',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'groups_lessons_groupid_fk',
          table: 'groups',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
      },
      lessonId: {
        type: 'bigint',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'groups_lessons_lessonid_fk',
          table: 'lessons',
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
  return db.dropTable('groups_lessons');
};

exports._meta = {
  "version": 1
};
