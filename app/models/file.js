import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    'name': DS.attr('string'),
    'mimeType': DS.attr('string'),
    'originalName': DS.attr('string'),
    'link': DS.attr('string'),
    // 'file': DS.attr(),
    'message': DS.belongsTo('message'),
    'user': DS.belongsTo('user'),
    'isImage': Ember.computed('mimeType', function () {
        let mimeImage = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/png'];
        return mimeImage.indexOf(this.get('mimeType')) !== -1;
    })
});