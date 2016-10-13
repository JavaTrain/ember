import Ember from 'ember';

export default Ember.Helper.extend({
    compute(params) {
        let url = params[0] || null;

        if (url) {
            return url;
        } else {
            return 'assets/img/no-avatar.png';
        }

    }
});
