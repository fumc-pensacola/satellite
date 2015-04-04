import DS from 'ember-data';

export default DS.Model.extend({
  sendDate: DS.attr('date-with-timezone'),
  expirationDate: DS.attr('date-with-timezone'),
  message: DS.attr('string'),
  url: DS.attr('string'),
  test: DS.attr('boolean')
});
