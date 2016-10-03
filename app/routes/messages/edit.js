import Ember from 'ember';

export default Ember.Route.extend({
    model(params){
        return this.get('store').findRecord('message', params.msg_id);
    },
    actions: {
        saveMsg(newMsg){
            newMsg.save().then(() => this.transitionTo('messages'));
        },

        willTransition(transition) {

            let model = this.controller.get('model');

            if (model.get('hasDirtyAttributes')) {
                let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

                if (confirmation) {
                    model.rollbackAttributes();
                } else {
                    transition.abort();
                }
            }
        }
    }
});
