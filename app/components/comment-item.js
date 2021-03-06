import Ember from 'ember';

// const get = Ember.get;
// const set = Ember.set;

export default Ember.Component.extend({
    authUser: Ember.inject.service(),
    store: Ember.inject.service(),
    editComment: null,

    /*
     * Ckeditor configuration
     */
    ckeditorConfig: {
        filebrowserImageUploadUrl: 'http://localhost:3000/api/v1/messages/upload/',
        extraPlugins: ['uploadimage', 'smiley'],
        uploadUrl: 'http://noadress',
    },

    /*
     * External plugin - when not available from bower
     */
    // externalCkeditorPlugins: [
    //     {
    //         pluginName: 'externalPluginName',
    //         pluginPath:'/path/to/external/plugin'
    //     }
    // ],

    actions: {
        saveComment(commentMsg, msg){
            this.get('authUser').getUser().then(user => {
                let comment = this.get('store').createRecord('comment', {
                    message: msg,
                    commentedBy: user,
                    comment: commentMsg
                });

                comment.save();
            });
            for (var key in CKEDITOR.instances) {
                CKEDITOR.instances[key].setData("");
            }
        },
        deleteComment(comment){
            let confirmation = confirm('Are you sure?');

            if (confirmation) {
                comment.destroyRecord();
            }
            if (this.get('editComment') == comment.id) {
                this.set('editComment', null);
            }
        },
        editComment(comment){
            if (this.get('editComment') === comment.id) {
                this.set('editComment', null);
            } else {
                this.set('editComment', comment.id);
            }
        },
        updateComment(comment){
            comment.save();
            this.set('editComment', null);
        },
    }
});
