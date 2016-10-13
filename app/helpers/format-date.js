import Ember from 'ember';
import moment from 'moment';

export function formatDate(params/*, hash*/) {
    let date = moment(params[0]) || moment();

    return date.format('DD.MM.YYYY HH:mm:ss');
}

export default Ember.Helper.helper(formatDate);
