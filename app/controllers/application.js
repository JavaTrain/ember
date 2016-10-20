import Ember from 'ember';

export default Ember.Controller.extend({
    authManager: Ember.inject.service(),
    isAuthenticated:  Ember.computed('authManager.payload', function(){
        if(this.get('authManager').isAuthenticated)
            return this.get('authManager').get('isAuthenticated');
    })
});
