import Ember from 'ember';

export default Ember.Controller.extend({
    // store: Ember.inject.service(),
    queryParams: [
        'page',
        'limit'
    ],
    page: 1, // default
    limit: 2,
    metaData: Ember.computed('model', function(){
        let pagination = this.store.peekAll('message');
      return Ember.get(pagination, 'pagination');
    }),
    actions: {
        nextPage(){
            let pagination = Ember.get(this.store.peekAll('message'), 'pagination');
            let page = this.get('page');
            if(page >= pagination.pages){
                this.set('page', pagination.pages);
            }else {
                this.set('page', page + 1);
            }
        },
        prevPage(){
            let page = this.get('page');
            if(page <= 1){
                this.set('page', 1);
            }else {
                this.set('page', page - 1);
            }
        }
    }
});