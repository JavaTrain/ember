import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr('string'),
    firstname: DS.attr('string'),
    lastname: DS.attr('string'),
    gender: DS.attr('string'),
    phone: DS.attr('string'),
    image: DS.attr('string'),
});
