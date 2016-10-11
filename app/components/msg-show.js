import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;

export default Ember.Component.extend({
    store: Ember.inject.service(),
    didInsertElement() {
        this._super(...arguments);
        var store = this.get('store');
        const message = this.get('message');
        this.$('.upload').change(function (e) {
            e.stopPropagation();
            if(!this.value) {
                return;
            }
            if(this.files && this.files[0]) {
                var file = store.createRecord('file', {
                    name: get(this.files[0], 'name'),
                    originalName: get(this.files[0], 'name'),
                    size: get(this.files[0], 'size'),
                    mimeType: get(this.files[0], 'type'),
                    message: message
                });
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('.preview').attr('src', e.target.result);
                    file.set('link', e.target.result);
                    file.save();
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    },



    actions: {
        deleteFile: function(file) {
            let confirmation = confirm('Are you sure?');

            if (confirmation) {
                file.destroyRecord();
            }
        }
    }
});
