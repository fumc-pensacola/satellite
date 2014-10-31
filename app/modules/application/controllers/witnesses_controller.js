Fumc.WitnessesController = Fumc.BulletinsController.extend({

  actions: {

    newWitness: function () {
      this.store.createRecord('witness', {
        from: moment().add(1, 'weeks').startOf('week'),
        to: moment().add(1, 'weeks').endOf('week').startOf('day'),
        volume: moment().add(1, 'weeks').startOf('week').year() - 1820
      });
    },

    registerModal: function (modal) {
      this.set('modal', modal);
    }

  }

});
