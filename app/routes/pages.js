import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend({

    // perPageParam: "limit",                          // instead of "per_page"
    // pageParam: "page",                              // instead of "page"
    // totalPagesParam: "meta.pagination.total",       // instead of "meta.total_pages"

    model() {
        return this.get('store').findAll('page');
        // return this.infinityModel('page'/*, {perPage: 2, startingPage: 1}*/);
    }
});
