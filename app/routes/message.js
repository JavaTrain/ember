import Ember from 'ember';

export default Ember.Route.extend({
    authManager: Ember.inject.service(),
    authUser: Ember.inject.service(),


    model(params){
        return this.get('store').findRecord('message', params.msg_id);
    },
    beforeModel() {
        this.comment = this.store.createRecord('comment');
    },
    actions: {
        saveComment(commentMsg, msg){
            var user = this.get('authUser').getUser();

            let comment = this.get('store').createRecord('comment', {message: msg, user: user});
            comment.set('comment', commentMsg);
            comment.save();
        }
    }
});
