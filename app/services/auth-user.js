import Ember from 'ember';

export default Ember.Service.extend({
    authManager: Ember.inject.service(),
    store: Ember.inject.service(),
    user: null,
    /**
     * Get auth user
     *
     * @returns {Ember.RSVP.Promise}
     */
    getUser: function () {
        return new Ember.RSVP.Promise((resolve, reject) => {
            this.get('store').findRecord('user', this.get('authManager').payload.userId).then(result => {
                return resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    },
    /**
     * Set information about authorized users on init
     */
    _setUser: function () {
        this.getUser().then(user => {
            this.set('user', user);
        }, () => {
            this.get('authManager').logout();
        });
    }.on('init')
});
