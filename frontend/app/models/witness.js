import DS from 'ember-data';

export default DS.Model.extend({
  from: DS.attr('date-with-timezone'),
  to: DS.attr('date-with-timezone'),
  volume: DS.attr('number'),
  issue: DS.attr('number'),
  visible: DS.attr('boolean'),
  file: DS.attr('string')
});
