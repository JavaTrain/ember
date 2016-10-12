import DS from 'ember-data';

export default DS.Model.extend({
    'likeBy': DS.belongsTo('user'),
    'message': DS.belongsTo('message')
});