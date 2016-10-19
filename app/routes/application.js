import Ember from 'ember';

export default Ember.Route.extend({
    authManager: Ember.inject.service(),

    beforeModel(transition) {
        var leafRoute = transition.state.handlerInfos.slice(-1)[0];
        var auth = this.get('authManager');
        if(auth.payload){
            if((new Date().getTime()/1000) < auth.payload.exp){
                setInterval(function(){
                    Ember.$.ajax({
                        type: 'POST',
                        url: 'http://localhost:3000/api/v1/users/refresh-token',
                        headers: {'x-access-token': localStorage.getItem('accessToken')},
                        dataType: 'json'
                    }).then(result => {
                        localStorage.setItem('accessToken', result.token);
                        this.set('accessToken', result.token);
                        this.set('payload', JSON.parse(window.atob(result.token.split('.')[1])));
                    }, error => {
                        // reject(error);
                    });
                }, 120000);
            }else{
                this.transitionTo('login');
            }
        }

        if (!this.get('authManager').get('isAuthenticated') && leafRoute.name !== 'login') {
            // this.get('history').pushRoute(transition);
            this.transitionTo('login');
        }
    },
});
