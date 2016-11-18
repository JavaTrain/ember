import Ember from 'ember';

export default Ember.Component.extend({
    authUser: Ember.inject.service(),
    userId: null,
    user: Ember.computed(function () {
        return this.get('authUser').get('user');
    }),

    actions: {
        deleteMsg(message) {
            let confirmation = confirm('Are you sure?');

            if (confirmation) {
                message.destroyRecord();
            }
        }
    }
});
