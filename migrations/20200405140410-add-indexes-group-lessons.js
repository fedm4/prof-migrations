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
  return db.addIndex(
    'groups_lessons',
    'groups_lessons_group_idx',
    ['groupId'],
    false,
    () => {
      return db.addIndex(
        'groups_lessons',
        'groups_lessons_lesson_idx',
        ['lessonId']
      )
    }
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
