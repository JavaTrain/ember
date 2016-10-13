import Ember from 'ember';

export function formatPhone(params/*, hash*/) {
    let phone = params[0];
    if (phone == null || phone == '')
    {
        return '';
    }
    let output = '+38(' + phone.substring(0, 3) + ')-' + phone.substring(3, 6) + '-' + phone.substring(6, 8) + '-' + phone.substring(8);
    return output;
}

export default Ember.Helper.helper(formatPhone);