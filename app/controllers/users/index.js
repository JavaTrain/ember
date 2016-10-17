import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: [
        'page',
        'limit'
    ],
    page: 1, // default
    limit: 2,
    sortBy: 'lastname',
    store: Ember.inject.service(),
    filterUsers: function() {
        return this.get('store').query('user',
            {
                sort: this.get('sortBy'),
                // like: {
                //     "email": this.get('filter'),
                //     "name-for-filter": this.get('filter')
                // }
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
        },
        nextPage(){
            let pagination = Ember.get(this.store.peekAll('user'), 'pagination');
            let page = this.get('page');
            if (page >= pagination.pages) {
                this.set('page', pagination.pages);
            } else {
                this.set('page', page + 1);
            }
        },
        prevPage(){
            let page = this.get('page');
            if (page <= 1) {
                this.set('page', 1);
            } else {
                this.set('page', page - 1);
            }
        }
    }

});
