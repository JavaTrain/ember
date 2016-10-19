import Ember from 'ember';

export default Ember.Controller.extend({
    authUser: Ember.inject.service('authUser'),
    userId:null,
    user: function () {
        return this.get('authUser').getUser().then(user => {
            this.set('userId', user.id);
            return user;
        });
        // return //this.authUser.getUser();
    }.on('init'),
    /*
     * Ckeditor configuration
     */
    ckeditorConfig: {
        filebrowserImageUploadUrl : '/api/file/upload/',
        extraPlugins : ['uploadimage', 'smiley'],
        uploadUrl: '/api/file/upload/',
    },

    /*
     * External plugin - when not available from bower
     */
    externalCkeditorPlugins: [
        {
            pluginName: 'externalPluginName',
            pluginPath:'/path/to/external/plugin'
        }
    ],
    actions: {
        init: function() {
            alert('Name is');
        }
    }
});
