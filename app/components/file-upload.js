import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;

export default Ember.Component.extend({
    isShowingModal: false,
    store: Ember.inject.service(),
    isShowingModalFileUpload: false,

    actions: {
        readFile: function () {
            this.toggleProperty('isShowingModalFileUpload');
            if (event.target.files && event.target.files[0]) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    Ember.$('.preview').attr('src', e.target.result);
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        },
        upload: function (msg) {
            let el = Ember.$('.upload')[0];
            if (!el.value) {
                return;
            }
            if (el.files && el.files[0]) {
                let file = this.get('store').createRecord('file', {
                        name: get(el.files[0], 'name'),
                        originalName: get(el.files[0], 'name'),
                        size: get(el.files[0], 'size'),
                        mimeType: get(el.files[0], 'type'),
                        message: msg
                    }),
                    reader = new FileReader();

                reader.onload = function (e) {
                    Ember.$('.preview').attr('src', '');
                    Ember.$('.upload').val('');
                    file.set('link', reader.result);
                    file.save();
                };
                reader.readAsDataURL(el.files[0]);

                this.set('isShowingModalFileUpload', false);
            }
        },
        toggleModal: function (file) {
            // if (file) {
            //     this.set('fileToDelete', file);
            // }
            this.toggleProperty('isShowingModalFileUpload');
            return false;
        },
        submitModal(){
            // this.deleteFile();
            this.toggleProperty('isShowingModalFileUpload');
            return false;
        },
    }
});
