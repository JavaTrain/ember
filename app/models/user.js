import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    username: DS.attr('string'),
    email: DS.attr('string'),
    firstname: DS.attr('string'),
    lastname: DS.attr('string'),
    gender: DS.attr('string'),
    phoneMask: Ember.computed('phone', {
        get(key) {
            return this.get('phone');
        },
        set(key, value) {
            this.set('phone', value.replace(/(\+38)|-|\(|\)|_/g, ''));
            return value;
        }
    }),
    phone: DS.attr('string'),
    image: DS.attr('string'),
});
