import Ember from 'ember';

export default Ember.Route.extend({
    authManager: Ember.inject.service(),

    beforeModel(transition) {
        var leafRoute = transition.state.handlerInfos.slice(-1)[0];
        var auth = this.get('authManager');
        if (!this.get('authManager').get('isAuthenticated') && leafRoute.name !== 'login') {
            // this.get('history').pushRoute(transition);
            this.transitionTo('login');
        }else{
            auth.refreshToken();
        }
    },
    actions: {
        logout: function(){
            this.get('authManager').logout();
            this.transitionTo('login');
        }
    }
});
