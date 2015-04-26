import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  service: DS.attr('string'),
  visible: DS.attr('boolean'),
  file: DS.attr('string')
});
