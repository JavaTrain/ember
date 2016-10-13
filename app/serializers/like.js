import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: '_id',

    normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {
        if(requestType == 'createRecord'){
            let cnt = payload.likes.length;
            if (cnt > 0){
                payload = {like: payload.likes[cnt-1]};
            }
        }
        if(requestType == 'deleteRecord'){
            payload = {};
        }

        return this._super(store, primaryModelClass, payload, id, requestType);
    },
});