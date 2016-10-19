import Ember from 'ember';

export default Ember.Service.extend({
    authManager: Ember.inject.service(),
    store: Ember.inject.service(),
    info: null,
    /**
     * Get auth user
     *
     * @returns {Ember.RSVP.Promise}
     */
    getUser: function () {
        return new Ember.RSVP.Promise((resolve, reject) => {
            this.get('store').findRecord('user', this.get('authManager').payload.aud).then(result => {
                return resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    },
    /**
     * Set information about authorized users on init
     */
    _setInfo: function () {
        this.getUser().then(user => {
            this.set('info', user);
        }, () => {
            //this.get('authManager').invalidate();
        });
    }.on('init')
});
