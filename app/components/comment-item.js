import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;

export default Ember.Component.extend({
    authUser: Ember.inject.service(),
    store: Ember.inject.service(),
    editComment: null,



    /*
     * Ckeditor configuration
     */
    ckeditorConfig: {
        filebrowserImageUploadUrl : 'http://localhost:3000/api/v1/messages/upload/',
        extraPlugins : ['uploadimage', 'smiley'],
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
            var user = this.get('authUser').getUser();

            let comment = this.get('store').createRecord('comment', {message: msg, user: user});
            comment.set('comment', commentMsg);
            comment.save();
        },
        deleteComment(comment){
            let confirmation = confirm('Are you sure?');

            if (confirmation) {
                comment.destroyRecord();
            }
        },
        editComment(comment){
            if(this.get('editComment') === comment.id){
                this.set('editComment', null);
            }else{
                this.set('editComment',comment.id);
            }
        },
        updateComment(comment){
            comment.save();
            this.set('editComment', null);
        },

        uploadImage: function (file) {
            var product = this.modelFor('product');
            var image = this.store.createRecord('image', {
                product: product,
                filename: get(file, 'name'),
                filesize: get(file, 'size')
            });

            file.read().then(function (url) {
                if (get(image, 'url') == null) {
                    set(image, 'url', url);
                }
            });

            file.upload('http://localhost:3000/api/v1/messages/upload').then(function (response) {
                set(image, 'url', response.headers.Location);
                return image.save();
            }, function () {
                image.rollback();
            });
        }
    }
});
