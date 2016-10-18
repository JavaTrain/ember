import Ember from 'ember';

export default Ember.Component.extend({
    flashMessages: Ember.inject.service(),
    fileInputId: '#file',
    isShowingCropperModal: false,

    actions: {
        saveProfile: function (user) {
            user.save().then(() => {
                Ember.$(document).scrollTop(0);
                this.get('flashMessages').info('Saved');
            }, () => {
                this.get('flashMessages').danger('Error during user save');
            });
        },

        inputFileChange: function () {
            var self = this;
            if (typeof (FileReader) !== "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    self.set('img', e);
                    self.send('toggleCropperModal');
                };
                reader.readAsDataURL(Ember.$(this.get('fileInputId')).prop('files')[0]);
            }
        },
        toggleCropperModal() {
            this.toggleProperty('isShowingCropperModal');
        },
        setImage(img) {
            this.get('user').set('image', img);
        },

    }
});
