import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    // createRecord: function(store, type, snapshot) {
        // var data = this.serialize(snapshot, {includeId: true});
        //
        // return new Ember.RSVP.Promise(function (resolve, reject) {
        //     var url = data.message?'http://localhost:3000/api/v1/messages/'+data.message+'/files':
        //                             'http://localhost:3000/api/v1/users/'+data.user+'/avatar';
        //     Ember.$.ajax({
        //         type: 'POST',
        //         url: url,
        //         headers: {'x-access-token': localStorage.getItem('accessToken')},
        //         dataType: 'json',
        //         data: data
        //     }).then(function (data) {
        //         Ember.run(null, resolve, data);
        //     }, function (jqXHR) {
        //         jqXHR.then = null; // tame jQuery's ill mannered promises
        //         Ember.run(null, reject, jqXHR);
        //     });
        // });
    // },
    deleteRecord: function(store, type, snapshot) {
        var data = this.serialize(snapshot, { includeId: true });

        var url;
            if(data.message && data._id){
                url = 'http://localhost:3000/api/v1/messages/'+data.message+'/files/'+data._id;
            } else if(data.user && data._id){
                url = 'http://localhost:3000/api/v1/users/'+data.user+'/avatar/'+data._id;
            } else {
                url = 'http://localhost:3000/api/v1/files/'+data._id;
            }

        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                type: 'DELETE',
                url: url,
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
