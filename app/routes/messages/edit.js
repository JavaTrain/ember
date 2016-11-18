import Ember from 'ember';

export default Ember.Route.extend({
    model(params){
        return this.get('store').findRecord('page', params.msg_id);
    },

    setupController(controller, model) {
        this._super(controller, model);

        controller.set('title', 'Edit message');
        controller.set('buttonLabel', 'Save changes');
        controller.set('ckeditorConfig', {
            filebrowserImageUploadUrl : 'http://localhost:3000/api/v1/messages/upload/',
            extraPlugins : ['uploadimage', 'smiley'],
            uploadUrl: 'http://noadress',
        });
    },

    renderTemplate() {
        this.render('messages/form');
    },

    actions: {
        saveMsg(newMsg){
            newMsg.save().then(() => this.transitionTo('messages.index'));
        },

        willTransition(transition) {

            let model = this.controller.get('model');

            if (model.get('hasDirtyAttributes')) {
                let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

                if (confirmation) {
                    model.rollbackAttributes();
                } else {
                    transition.abort();
                }
            }
        }
    }
});
