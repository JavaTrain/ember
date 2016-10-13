import Ember from 'ember';

export default Ember.Route.extend({
    authUser: Ember.inject.service(),
    model(){
        return this.get('authUser').getUser();
    }
});
