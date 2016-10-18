import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: '_id',

    normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {
        if(requestType == 'createRecord'){
            if ( payload.files){
                let cnt = payload.files.length;
                if (cnt > 0) {
                    payload = {file: payload.files[cnt-1]};
                }
            }
        }
        if(requestType == 'deleteRecord'){
                payload = {};
        }

        return this._super(store, primaryModelClass, payload, id, requestType);
    },
});