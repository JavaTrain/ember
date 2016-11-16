import DS from 'ember-data';
import Ember from 'ember';


export default DS.RESTAdapter.extend({
    authManager: Ember.inject.service(),
    namespace: "api/v1",
    host: "http://localhost:8088",

    headers: function() {
        return {
            'x-access-token': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
        };

    }.property().volatile()

});
