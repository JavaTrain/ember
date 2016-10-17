import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: '_id',

    extractMeta: function(store, type, payload) {
        if (payload && payload.meta) {
            this.store.peekAll('user').set('pagination', payload.meta.pagination);
        }
        delete payload.meta;
    },

    normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {
        if(requestType == 'updateRecord'){
            payload = {user: payload};
        }

        return this._super(store, primaryModelClass, payload, id, requestType);
    },
});