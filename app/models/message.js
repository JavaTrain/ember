import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    title: DS.attr('string'),
    content: DS.attr('string'),
    postedBy: DS.belongsTo('user'),
    comments: DS.hasMany('comment'),
    files: DS.hasMany('file'),

    isValid: (Ember.computed.notEmpty('title') && Ember.computed.notEmpty('content'))
});
