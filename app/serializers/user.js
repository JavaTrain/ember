import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: '_id',

    normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {

        if(requestType == 'updateRecord'){
            payload = {user: payload}
        }

        return this._super(store, primaryModelClass, payload, id, requestType);
    }
});