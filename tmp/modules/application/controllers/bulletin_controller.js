Fumc.BulletinController = Ember.ObjectController.extend({

  editing: false,
  fileUpload: null,

  init: function () {
    if (~this.get('currentState.stateName').indexOf('uncommitted')) {
      this.set('editing', true);
    }
  },

  formattedDate: function () {
    return moment(this.get('date')).format('dddd, MMMM Do YYYY');
  }.property('date'),

  actions: {

    toggleEditing: function () {
      this.toggleProperty('editing');
    },

    save: function () {

      var fileUpload = this.get('fileUpload'),
          model = this.get('model'),
          saved = function () {
            this.set('editing', false);
          }.bind(this);

      this.set('date', new Date(this.get('date')));

      if (fileUpload) {
        fileUpload.uploadFile().then(function (url) {
          this.set('file', url);
          model.save().then(saved);
        })
      } else {
        model.save().then(saved);
      }
    },

    cancel: function () {
      var bulletin = this.get('model');
      bulletin.rollback();
      this.set('editing', false);
    },

    remove: function () {
      console.log(this);
    },

    fileSelected: function (file) {
      this.set('fileUpload', Fumc.FileUploadModel.create({
        fileToUpload: file
      }));
    }
  }
})
