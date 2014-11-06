module.exports = function (grunt) {
  return {
    task: {
      options: {
        message: grunt.option('message'),
        noStatus: true
      }
    }
  };
};
