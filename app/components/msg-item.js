import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        deleteMsg(message) {
            let confirmation = confirm('Are you sure?');

            if (confirmation) {
                message.destroyRecord();
            }
        }
    }
});
