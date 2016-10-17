import Ember from 'ember';

export default Ember.Helper.extend({
    compute(params) {
        let url = params[0] || null;

        if (url) {
            return url;
        } else {
            return 'http://localhost:3000/img/no-avatar.png';
        }

    }
});
