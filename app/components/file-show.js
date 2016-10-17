import Ember from 'ember';

export default Ember.Component.extend({
    isShowingModal: false,
    fileToDelete: null,
    deleteFile: function() {
        if (this.fileToDelete){
            this.fileToDelete.destroyRecord();
        }
    },

    actions: {
        toggleModal: function(file){
            if(file){
                this.set('fileToDelete', file);
            }
            this.toggleProperty('isShowingModal');
        },
        submitModal(){
            this.deleteFile();
            this.toggleProperty('isShowingModal');
        },
    }
});
