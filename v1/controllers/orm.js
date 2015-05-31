"use strict";

let Bulletin = require('../../models/bulletin'),
    Witness = require('../../models/witness'),
    Feature = require('../../models/feature'),
    Calendar = require('../../models/calendar'),
    Notification = require('../../models/notification'),
    fakeId = 1;

module.exports = function(router) {
  
  let types = {
    bulletins: Bulletin,
    witnesses: Witness,
    features: Feature,
    calendars: Calendar,
    notifications: Notification
  };
  
  router.get('/:type(' + Object.keys(types).join('|') + ')', (req, res) => {
    let Model = types[req.params.type],
        query = req.query,
        modifiers = [];
    
    if (query.orderBy) {
      let sortString = query.orderBy.replace(':A', '').replace(/(.+?):Z/, '-$1').replace(',', ' ');
      modifiers.push({
        method: 'sort',
        params: [sortString]
      });
      delete query.orderBy;
    }
    
    let find = Model.find(req.query);
    modifiers.forEach(function(m) {
      find = find[m.method].apply(find, m.params);
    });
    
    find.exec(function(err, models) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (req.params.type !== 'calendars') {
          models.forEach(function(m) {
            delete m._doc._id;
            m._doc.id = fakeId++;
            delete m._doc.__v;
          });
        }
        res.json(models);
      }
    });
  });
  
};