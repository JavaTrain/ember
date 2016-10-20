import Ember from 'ember';

export default Ember.Component.extend({
    authUser: Ember.inject.service(),
    userId: null,
    user: function () {
        return this.get('authUser').getUser().then(user => {
            this.set('userId', user.id);
            return user;
        });
    }.on('init'),

    actions: {
        deleteMsg(message) {
            let confirmation = confirm('Are you sure?');

            if (confirmation) {
                message.destroyRecord();
            }
        }
    }
});
