import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        comments: { embedded: 'always' }
    },
    primaryKey: '_id',
    extractMeta: function(store, type, payload) {
        if (payload && payload.meta) {
            this.store.peekAll('message').set('pagination', payload.meta.pagination);
        }
    }
});