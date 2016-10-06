import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    comment: DS.attr('string'),
    commentedBy: DS.belongsTo('user'),
    message: DS.belongsTo('message'),

    isValid: Ember.computed.notEmpty('comment')
});
