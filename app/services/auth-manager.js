import Ember from 'ember';
import config from './../config/environment';

export default Ember.Service.extend({
    torii: Ember.inject.service(),
    store: Ember.inject.service(),
    accessToken: null,
    payload: null,

    initializeFromLocalStorage: function () {
        let accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            this.setAccessToken(accessToken);
        }
    }.on('init'),

    setAccessToken: function (accessToken) {
        this.set('accessToken', accessToken);
        localStorage.setItem('accessToken', accessToken);
        this.set('payload', JSON.parse(window.atob(accessToken.split('.')[1])));
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
    },

    getAuthCode() {
        let self = this;
        return self.get('torii').open('google-oauth2').then(
            authorization => {
                return authorization.authorizationCode;
            });
    },

    getGoogleAccessToken(authorizationCode) {
        return Ember.$.post('https://www.googleapis.com/oauth2/v3/token',
            {
                code: authorizationCode,
                redirect_uri: config.google.redirect_uri,
                client_id: config.google.apiKey,
                grant_type: 'authorization_code',
                client_secret: config.google.secret
            }).then(
            response => {
                return response;
            }
        );
    },

    authenticate() {
        return new Ember.RSVP.Promise((resolve, reject) => {
            this.getAuthCode().then(authorizationCode => {
                    this.getGoogleAccessToken(authorizationCode).then(
                        response => {
                            Ember.$.ajax({
                                type: 'GET',
                                url: 'http://localhost:3000/api/v1/users/login/login_with_google_token' + '?access_token=' + response.access_token,
                                dataType: 'json'
                            }).then(result => {
                                this.setAccessToken(result.token);
                                resolve(result);
                            }, error => {
                                reject(error);
                            });
                        }, error => {
                            reject(error);
                        }
                    );
                }, error => {
                    reject(error);
                }
            );

        });
    },

    logout() {
        this.set('accessToken', null);
        localStorage.removeItem('accessToken');
    },

    isAuthenticated: Ember.computed.bool('accessToken')
});