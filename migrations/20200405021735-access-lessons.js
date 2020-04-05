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
  return db.createTable('access_lessons',
    {
      columns: {
        lessonId: {
          type: 'bigint',
          unsigned: true,
          notNull: true,
          foreignKey: {
            name: 'access_lessons_lesson_fk',
            table: 'lessons',
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
            name: 'access_lessons_user_fk',
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
    }
  );
};

exports.down = function(db) {
  return db.dropTable('access_lessons');
};

exports._meta = {
  "version": 1
};
