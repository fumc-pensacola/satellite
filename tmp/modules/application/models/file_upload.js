Fumc.FileUploadModel = Ember.Object.extend({

  // Name is used for the upload property
  name: '',

  // {Property} Human readable size of the selected file
  size: "0 KB",

  // {Property} Raw file size of the selected file
  rawSize: 0,

  // {Property} Will be an HTML5 File
  fileToUpload: null,

  // {Property} Will be a $.ajax jqXHR
  uploadJqXHR: null,

  // {Property} Promise for when a file was uploaded
  uploadPromise: null,

  // {Property} Upload progress 0-100
  uploadProgress: null,

  // {Property} If a file is currently being uploaded
  isUploading: false,

  // {Property} If the file was uploaded successfully
  didUpload: false,

  init: function() {
    this._super();
    Ember.assert("File to upload required on init.", !!this.get('fileToUpload'));
    this.set('uploadPromise', Ember.Deferred.create());
  },

  readFile: function() {
    var self = this;
    var fileToUpload = this.get('fileToUpload');

    this.set('name', fileToUpload.name);
    this.set('rawSize', fileToUpload.size);
    // this.set('size', App.humanReadableFileSize(fileToUpload.size));

  }.on('init'),

  uploadFile: function() {
    if (this.get('isUploading') || this.get('didUpload') || this.get('didError')) {
      return this.get('uploadPromise');
    }

    var fileToUpload = this.get('fileToUpload');
    var self = this;

    this.set('isUploading', true);

    Fumc.s3.putObject({
      Key: this.get('name'),
      ContentType: fileToUpload.type,
      Body: fileToUpload
    }, function (err, data) {
      if (err) {
        self.set('isUploading', false);
        self.set('didError', true);
        self.get('uploadPromise').reject(errorThrown);
      }

      var value = '';
      try {
        value = data.getElementsByTagName('Location')[0].textContent;
      } catch (e) {}
      self.set('isUploading', false);
      self.set('didUpload', true);
      self.get('uploadPromise').resolve(value);
    });

    return this.get('uploadPromise');
  },

  showProgressBar: Ember.computed.or('isUploading', 'didUpload'),

  progressStyle: function() {
    return 'width: %@%'.fmt(this.get('progress'));
  }.property('progress')

});
