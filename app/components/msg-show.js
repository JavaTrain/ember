import Ember from 'ember';

// const get = Ember.get;
// const set = Ember.set;

export default Ember.Component.extend({
    store: Ember.inject.service(),
    authUser: Ember.inject.service(),
    isShowingModal: false,

    actions: {
        likeMessage() {
            this.get('authUser').getUser().then(user => {
                let liked = false;
                this.get('message').get('likes').forEach(function(item) {
                    if(user.get('id') == item.get('likeBy').get('id')){
                        liked = true;
                    }
                });
                if(liked){
                    console.log('ALREADY LIKED');
                    return;
                }
                let like = this.get('store').createRecord('like', {
                    message: this.get('message')
                });
                like.save();
            });
        },
        toggleModal() {
            this.toggleProperty('isShowingModal');
        },
        submitModal(){
            this.deletePost(this.get('post'));
            this.get('routing').transitionTo('posts');
        },

    }
});
