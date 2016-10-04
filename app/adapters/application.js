import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    namespace: 'api/v1',
    host: 'http://localhost:3000',
    headers: {
        'x-access-token': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
    }
});
