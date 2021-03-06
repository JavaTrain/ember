import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    createRecord: function(store, type, snapshot) {
        var data = this.serialize(snapshot, {includeId: true});

        return new Ember.RSVP.Promise(function (resolve, reject) {
            Ember.$.ajax({
                type: 'POST',
                url: 'http://localhost:3000/api/v1/messages/' + data.message + '/likes',
                headers: {'x-access-token': localStorage.getItem('accessToken')},
                dataType: 'json',
                data: data
            }).then(function (data) {
                Ember.run(null, resolve, data);
            }, function (jqXHR) {
                jqXHR.then = null; // tame jQuery's ill mannered promises
                Ember.run(null, reject, jqXHR);
            });
        });
    },
    deleteRecord: function(store, type, snapshot) {
        var data = this.serialize(snapshot, { includeId: true });

        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                type: 'DELETE',
                url: 'http://localhost:3000/api/v1/messages/'+data.message+'/likes/'+data._id,
                headers: { 'x-access-token': localStorage.getItem('accessToken') },
                dataType: 'json',
                data: data
            }).then(function(data) {
                Ember.run(null, resolve, data);
            }, function(jqXHR) {
                jqXHR.then = null; // tame jQuery's ill mannered promises
                Ember.run(null, reject, jqXHR);
            });
        });
    },
});
