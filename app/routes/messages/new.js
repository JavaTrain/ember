import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        return this.get('store').createRecord('message');
    },

    setupController: function (controller, model) {
        this._super(controller, model);

        controller.set('title', 'Create a new message');
        controller.set('buttonLabel', 'Create');
    },

    renderTemplate() {
        this.render('messages/form');
    },

    actions: {
        saveMsg(newMsg){
            newMsg.save().then(() => this.transitionTo('messages.index'))/*this.transitionTo('messages'))*/;
        },

        willTransition() {
            // rollbackAttributes() removes the record from the store
            // if the model 'isNew'
            let model = this.controller.get('model');

            if (model.get('isNew')) {
                model.destroyRecord();
            }
        }
    }
});
