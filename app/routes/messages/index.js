import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        page: {
            as: 'page',
            refreshModel: true
        },
        limit: {
            as: 'limit',
            refreshModel: true
        }
    },

    model(params) {
        return this.get('store').query('message', params);
    }

});
