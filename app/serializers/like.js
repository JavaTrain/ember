import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: '_id',

    normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {
        let cnt = payload.likes.length-1,
            data = {file: payload.likes[cnt]};

        return this._super(store, primaryModelClass, data, id, requestType);
    },
});