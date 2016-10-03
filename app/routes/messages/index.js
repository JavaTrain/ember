import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.get('store').findAll('message');
    },

    actions: {
        deleteMsg(message) {
            let confirmation = confirm('Are you sure?');

            if (confirmation) {
                message.destroyRecord();
            }
        }
    }
});
