import Ember from 'ember';

export default Ember.Component.extend({
    flashMessages: Ember.inject.service(),

    actions: {
        saveProfile: function(user){
            user.save().then(() => {
                Ember.$(document).scrollTop(0);
                this.get('flashMessages').info('Saved');
            }, () => {
                this.get('flashMessages').danger('Error during user save');
            });
        }
    }
});
