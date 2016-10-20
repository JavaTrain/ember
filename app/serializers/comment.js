import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: '_id',
    normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {
        if(requestType === 'createRecord'){
            if ( payload.message.comments){
                let cnt = payload.message.comments.length;
                if (cnt > 0) {
                    payload = {comment: payload.message.comments[cnt-1]};
                }
            }
        }
        if(requestType === 'deleteRecord'){
            payload = {};
        }
        if(requestType === 'updateRecord'){
            var comment = payload.message.comments.filter(function(el){
               return el._id == id;
            })[0];
            payload = {comment: comment};
        }

        return this._super(store, primaryModelClass, payload, id, requestType);
    },

});