import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;

export default Ember.Component.extend({
    isShowingModal: false,
    store: Ember.inject.service(),

    didInsertElement() {
        this._super(...arguments);
        let store = this.get('store');
        var self = this;
        const message = this.get('message');
        this.$('.upload').change(function (e) {
            e.stopPropagation();
            if(!this.value) {
                return;
            }
            self.set('isShowingModal', true);
            Ember.$('.btn-upload').css({display: 'block'});
            if(this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    Ember.$('.preview').attr('src', e.target.result);
                };
                reader.readAsDataURL(this.files[0]);
            }
        });

        let upload = function (el, msg, store) {
            if (!el.value) {
                return;
            }
            if (el.files && el.files[0]) {
                let file = store.createRecord('file', {
                        name: get(el.files[0], 'name'),
                        originalName: get(el.files[0], 'name'),
                        size: get(el.files[0], 'size'),
                        mimeType: get(el.files[0], 'type'),
                        message: message
                    }),
                    reader = new FileReader();

                reader.onload = function (e) {
                    Ember.$('.preview').attr('src', '');
                    Ember.$('.upload').val('');
                    Ember.$('.btn-upload').css({display: 'none'});
                    file.set('link', reader.result);
                    file.save();
                };
                reader.readAsDataURL(el.files[0]);
            }
        };
        this.$('.btn-upload').click(function (e) {
            upload(Ember.$('.upload')[0], message, store);
        });
    },

    actions: {
        upl: function(msg){
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
                    Ember.$('.btn-upload').css({display: 'none'});
                    file.set('link', reader.result);
                    file.save();
                };
                reader.readAsDataURL(el.files[0]);
            }
        },
        toggleModal: function(file){
            if(file){
                this.set('fileToDelete', file);
            }
            this.toggleProperty('isShowingModal');
            return false;
        },
        submitModal(){
            this.deleteFile();
            this.toggleProperty('isShowingModal');
            return false;
        },
    }
});
