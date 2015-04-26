import DS from 'ember-data';

export default DS.Model.extend({
  sendDate: DS.attr('date'),
  expirationDate: DS.attr('date'),
  message: DS.attr('string'),
  url: DS.attr('string'),
  test: DS.attr('boolean')
});
