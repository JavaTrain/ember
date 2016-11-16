import Ember from 'ember';
// import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(/*ApplicationRouteMixin*/ {
    authManager: Ember.inject.service(),
    router: Ember.inject.service('_routing'),
    flashMessages: Ember.inject.service(),

    actions: {
        authenticate() {
            this.get('authManager').authenticate().then(() => {
                this.get('router').transitionTo("pages");
            }, (err) => {
                console.log(err);
                this.get('flashMessages').danger('Authorisation Error!');
            });
        }
    }
});
