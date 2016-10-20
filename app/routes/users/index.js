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
        console.log(params);
        return this.get('store').query('user', params);
    },

    sortBy: 'lastname',
    store: Ember.inject.service(),
    filterUsers: function() {
        return this.get('store').query('user',
            {
                sort: this.get('sortBy'),
                like: {
                    "email": this.get('filter'),
                    "name-for-filter": this.get('filter')
                }
            }
        ).then((result) => this.set('model', result));
    },
    actions:{
        sort(sortQuery){
            this.set('sortBy', sortQuery);
            return this.filterUsers();
        },
        search(){
            return this.filterUsers();
        }
    }
});
