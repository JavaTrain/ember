import Ember from 'ember';

export default Ember.Controller.extend({
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
});
