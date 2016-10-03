import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    content: DS.attr('string'),
    postedBy: DS.belongsTo('user'),
    comments: DS.hasMany('comment')
});
