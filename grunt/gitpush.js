module.exports = {
  task: {
    options: {
      remote: 'heroku',
      branch: 'master'
    }
  },

  dev: {
    options: {
      remote: 'dev',
      branch: 'master'
    }
  }
};
