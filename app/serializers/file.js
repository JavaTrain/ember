import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: '_id',

    normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {
        let data = {};
        if(requestType == 'createRecord'){
            let cnt = payload.files.length-1;
            data = {file: payload.files[cnt]};
        }

        return this._super(store, primaryModelClass, data, id, requestType);
    },
});