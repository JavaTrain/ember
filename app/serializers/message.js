import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        comments: { embedded: 'always' },
        files: {embedded: 'always'},
        likes: {embedded: 'always'},
        // serialize: 'records',
        // deserialize: 'records'
    },
    primaryKey: '_id',
    extractMeta: function(store, type, payload) {
        if (payload && payload.meta) {
            this.store.peekAll('message').set('pagination', payload.meta.pagination);
        }
        // delete payload.meta;
    }
});