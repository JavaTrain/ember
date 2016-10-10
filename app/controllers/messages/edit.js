import Ember from 'ember';

export default Ember.Controller.extend({

    ckeditorConfig: {
        filebrowserImageUploadUrl : 'http://localhost:3000/api/v1/messages/upload/',
        extraPlugins : ['uploadimage', 'smiley'],
        uploadUrl: 'http://noadress',
    },
});
