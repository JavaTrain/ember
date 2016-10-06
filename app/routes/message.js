import Ember from 'ember';

export default Ember.Route.extend({

    model(params){
        return this.get('store').findRecord('message', params.msg_id);
    },
    beforeModel() {
        this.comment = this.store.createRecord('comment');
    },
    actions: {
        saveComment(commentMsg, msg){
            let comment = this.get('store').createRecord('comment', {message: msg});
            comment.set('comment', commentMsg);
            comment.save();
        }
    }
});
