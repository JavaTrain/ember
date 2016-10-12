import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;

export default Ember.Component.extend({
    store: Ember.inject.service(),
    didInsertElement() {
        this._super(...arguments);
        let store = this.get('store');
        const message = this.get('message');
        this.$('.upload').change(function (e) {
            e.stopPropagation();
            if(!this.value) {
                return;
            }
            $('.btn-upload').css({display: 'block'});
            if(this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('.preview').attr('src', e.target.result);
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
                    $('.preview').attr('src', '');
                    $('.upload').val('');
                    $('.btn-upload').css({display: 'none'});
                    file.set('link', reader.result);
                    file.save();
                };
                reader.readAsDataURL(el.files[0]);
            }
        };
        this.$('.btn-upload').click(function (e) {
            upload($('.upload')[0],message,store);
        });
    },

    actions: {
        deleteFile: function(file) {
            let confirmation = confirm('Are you sure?');

            if (confirmation) {
                file.destroyRecord();
            }
        },
        likeMessage(){
            let like = this.get('store').createRecord('like', {
                message: this.get('message')
            });

            console.log(this.get('message').get('likes'));

            return;

            like.save();
        }
    }
});
