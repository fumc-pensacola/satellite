Fumc.FileUploadComponent = Ember.Component.extend({
  didInsertElement: function () {
    var component = this;
    component.get('element').querySelector('input[type=file]').addEventListener('change', function() {
      var file = this.files[0];
      component.sendAction('change', file);
    }, false);
  }
});
