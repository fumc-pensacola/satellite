Fumc.Bulletin = DS.Model.extend({
  date: DS.attr('date-with-timezone'),
  service: DS.attr('string'),
  visible: DS.attr('boolean'),
  file: DS.attr('string')
});

// Fumc.Bulletin.FIXTURES = [{
//   id: 1,
//   date: moment().startOf('week').subtract(1, 'weeks'),
//   service: 'ICON',
//   visible: true
// }];
