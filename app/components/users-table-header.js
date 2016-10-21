import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'thead',
    sortBy: 'null',
    sortOrder: '',
    sortQuery: Ember.computed('sortOrder', 'sortBy', function () {
        return `${this.get('sortOrder')}${this.get('sortBy')}`;
    }),
    sortClass: 'sort_asc',

    toggleSortOrder: function () {
        this.set('sortOrder', (this.get('sortOrder') === '') ? '-' : '');
        this.set('sortClass', (this.get('sortClass') === 'sort_asc') ? 'sort_desc' : 'sort_asc');
    },

    actions: {
        sortColumn(){
            this.toggleSortOrder();
            this.$('th').removeClass('sort_asc');
            this.$('th').removeClass('sort_desc');
            this.$('#' + event.target.id).addClass(this.get('sortClass'));
            this.set('sortBy', event.target.id);
            this.get('sort')(this.get('sortQuery'));
        }
    }
});
