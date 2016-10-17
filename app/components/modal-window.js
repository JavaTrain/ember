import Ember from 'ember';

// const get = Ember.get;
// const set = Ember.set;

export default Ember.Component.extend({
    // classNames: ['modal'],
    // didInsertElement() {
    //     Ember.$('body').addClass('modal-open');
    //     Ember.$(document).keyup(e => {
    //         if (e.keyCode === 27) {
    //             this.get('toggleModal')();
    //         }
    //     });
    //     // center
    //     let $marginTop = (Ember.$( window ).height() - Ember.$('.modal-content').height()) / 2;
    //     Ember.$('.modal-content').css('margin-top', `${$marginTop}px`);
    // },
    // didDestroyElement() {
    //     Ember.$('body').removeClass('modal-open');
    // },
    modalSize: Ember.computed('size', function () {
        return 'modal-dialog ' + (this.get('size') ? 'modal-' + this.get('size') : 'modal-lg');
    }),
    actions: {
        toggleModal() {
            this.get('toggleModal')();
        }
    }
});
