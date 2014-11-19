Fumc.FeatureController = Ember.ObjectController.extend({

  needs: ['application', 'featured'],

  editing: false,
  iphoneFiveFileUpload: null,
  initialDate: null,
  isKindOfDirty: false,

  s3: Ember.computed.alias('controllers.application.s3'),
  featuredController: Ember.computed.alias('controllers.featured'),

  showingImage: Ember.computed.or('iphoneFiveFileUpload', 'iphoneFiveImage'),
  isUploading: Ember.computed.or('iphoneFiveFileUpload.isUploading'),
  isControllerDirty: Ember.computed.or('isDirty', 'isKindOfDirty'),
  setIphoneFiveImageURL: function (key) {
    Fumc.s3.getSignedUrl('getObject', { Key: this.get('iphoneFiveImage') }, function (err, url) {
      if (!err) {
        this.set('iphoneFiveImageURL', url);
      }
    }.bind(this));
  }.observes('iphoneFiveImage').on('init'),

  toggledActive: function () {
    var self = this;
    if (this.get('active')) {
      this.get('featuredController').forEach(function (f) {
        if (f !== self.get('model')) {
          f.set('active', false);
        }
      });
    }
  }.observes('active'),

  actions: {

    iphoneFiveFileSelected: function (file) {
      if (!file) {
        this.set('iphoneFiveFileUpload', null);
        return;
      }

      if (file.name !== this.get('iphoneFiveImage')) {
        this.set('isKindOfDirty', true);
      }

      this.set('iphoneFiveCurrentFile', file.name);
      this.set('iphoneFiveFileUpload', Fumc.FileUploadModel.create({
        fileToUpload: file
      }));
    },

    save: function () {

      var iphoneFiveFileUpload = this.get('iphoneFiveFileUpload'),
          model = this.get('model'),
          iphoneFiveOldFile = this.get('iphoneFiveImage'),
          saved = function () {
            this.set('isKindOfDirty', false);
            setTimeout(function () { this.set('iphoneFiveFileUpload', null); }.bind(this), 500);
          }.bind(this);

      if (iphoneFiveFileUpload && iphoneFiveFileUpload.isUploading) {
        return false;
      }

      if (iphoneFiveFileUpload) {
        console.log(iphoneFiveFileUpload.name, iphoneFiveOldFile)
        if (iphoneFiveFileUpload.name !== iphoneFiveOldFile) {
          Fumc.s3.deleteObject({ Key: iphoneFiveOldFile }).send();
        }
        console.log(iphoneFiveFileUpload);
        iphoneFiveFileUpload.uploadFile().then(function (key) {
          this.set('iphoneFiveImage', key);
          model.save().then(saved);
        }.bind(this));
      } else {
        model.save().then(saved);
      }
    }

  }

});
