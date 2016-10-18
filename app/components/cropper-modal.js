import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;

export default Ember.Component.extend({
    store: Ember.inject.service(),
    authUser: Ember.inject.service(),
    imageWidth: 200,
    imageHeight: 200,
    didInsertElement(){
        var self = this;
        var image_holder = Ember.$(".image-holder");
        var e = this.get('img');
        image_holder.empty();
        var cropper = Ember.$("<img />", {
            "src": e.target.result,
            "class": "thumb-image"
        });
        cropper.appendTo(image_holder);
        // var cr = new Cropper();
        cropper.promise().done(function() {
            cropper.cropper({
                responsive: true,
                aspectRatio: 1,
                zoomable: false,
                minCropBoxWidth: self.get('imageWidth'),
                minCropBoxHeight: self.get('imageHeight')
            });
            self.set('cropper',cropper);
        });
    },
    actions: {
        crop() {
            Ember.$('.canvas-holder').append();
            let self = this;
            let base64Img = self.get('cropper').cropper('getCroppedCanvas', {
                width: self.get('imageWidth'),
                height: self.get('imageHeight')
            }).toDataURL();

            let el = Ember.$('#file')[0];
            // console.log(el);return;

            this.get('authUser').getUser().then(user => {
                let file = this.get('store').createRecord('file', {
                        name: get(el.files[0], 'name'),
                        originalName: get(el.files[0], 'name'),
                        size: get(el.files[0], 'size'),
                        mimeType: get(el.files[0], 'type'),
                        user: user,
                        link: base64Img
                });
                file.save().then(() => {
                    self.get('setImage')(file.get('link'));
                    Ember.$('#file').val('');
                    self.send('toggleModal');
                    // $('.profile-photo').eq(0).attr('src', file.get('link'));
                }, (err) => {
                    console.log(err);
                    // return;
                    // self.get('flashMessages').warning(errors[0].title);
                });
            });

            // .toBlob(function (blob) {
            //     console.log(blob.size,blob.type);
            //     return;
            //     var formData = new FormData();
            //     formData.append('croppedImage', blob);
            //     let file = self.get('store').createRecord('file', {
            //         file: formData.get('croppedImage')
            //     });
            //     file.set('profilePhoto', true);
            //     file.save().then(() => {
            //         self.get('setImage')(file.get('link'));
            //         Ember.$('#file').val('');
            //         self.send('toggleModal');
            //     }, (xhr) => {
            //         var errors = xhr.responseJSON.errors;
            //         self.get('flashMessages').warning(errors[0].title);
            //     });
            // });
        },
        toggleModal() {
            this.get('toggleModal')();
        }
    }
});
