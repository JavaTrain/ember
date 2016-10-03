import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        return this.get('store').createRecord('message');
    },
    actions: {
        saveMsg(newMsg){
            console.log(newMsg);
            newMsg.save().then(() => console.log('ere')/*this.transitionTo('messages')*/);
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
