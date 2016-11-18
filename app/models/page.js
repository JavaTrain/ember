import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    // author: DS.belongsTo('user'),
    postedBy: DS.belongsTo('user'),
    // comments: DS.hasMany('comment'),
    // files: DS.hasMany('file'),
    // likes: DS.hasMany('likes'),

    isValid: (Ember.computed.notEmpty('title') && Ember.computed.notEmpty('body'))
});
