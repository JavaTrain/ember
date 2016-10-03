import DS from 'ember-data';

export default DS.Model.extend({
    comment: DS.attr('string'),
    commentedBy: DS.belongsTo('user'),
    message: DS.belongsTo('message')
});
