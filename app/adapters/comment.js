import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    createRecord: function(store, type, snapshot) {
        var data = this.serialize(snapshot, { includeId: true });
        var url = type;

        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                type: 'POST',
                url: 'http://localhost:3000/api/v1/messages/'+data.message+'/comments',
                // headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiZW1haWwiOiJyZXF1aXJlIiwidXNlcm5hbWUiOiJpbml0IiwiZmlyc3RuYW1lIjoiaW5pdCIsImxhc3RuYW1lIjoiaW5pdCIsImdlbmRlciI6ImRlZmF1bHQiLCJwaG9uZSI6ImRlZmF1bHQiLCJpbWFnZSI6ImRlZmF1bHQiLCJfX3YiOiJpbml0IiwiYWRtaW4iOiJpbml0IiwiR29vZ2xlT2F1dGhUb2tlbiI6ImluaXQiLCJHb29nbGVPYXV0aElkIjoiaW5pdCIsImhhc2giOiJpbml0Iiwic2FsdCI6ImluaXQiLCJjcmVhdGVkQXQiOiJpbml0IiwidXBkYXRlZEF0IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnsiZ2VuZGVyIjp0cnVlLCJwaG9uZSI6dHJ1ZSwiaW1hZ2UiOnRydWV9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiZmlyc3RuYW1lIjp0cnVlLCJsYXN0bmFtZSI6dHJ1ZSwiYWRtaW4iOnRydWUsIkdvb2dsZU9hdXRoVG9rZW4iOnRydWUsIkdvb2dsZU9hdXRoSWQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJoYXNoIjp0cnVlLCJzYWx0Ijp0cnVlLCJjcmVhdGVkQXQiOnRydWUsInVwZGF0ZWRBdCI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6eyJlbWFpbCI6dHJ1ZX19LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7ImZpcnN0bmFtZSI6IiIsImxhc3RuYW1lIjoiIiwiZ2VuZGVyIjoiIiwicGhvbmUiOiIiLCJpbWFnZSI6IiIsIl9fdiI6MCwiYWRtaW4iOmZhbHNlLCJHb29nbGVPYXV0aFRva2VuIjoiIiwiR29vZ2xlT2F1dGhJZCI6IiIsInVzZXJuYW1lIjoiam9obiIsImhhc2giOiI1YzZiZTdhMWYzMDg4MTM0YzBkYWE5NzkyZDZkMWEyYzRmOWFmM2E1YjdlMWI0M2RiY2JlZDdhYjllMzk0Zjc1MzgyZWExZjllODg0ZTFhMzExMGM1ZDBkMWZlYjkzNzE5MWZjNGE4ZDc4NGM3MzBmMjQyZmQ4NTQ2MzlkOGYyZWEwYmFlNThmOWRjNDExMzU4YjQzNjU3ZDMyOTMzNGVhMGNlYWZkYzViMGFhZjA5Nzk0YTI4YWM2NDJjYzQ4YTBhZWUyNmU3NWNlYzBlOTlmMTA4NmFlZDQ4NTg0MDM4NDI3MmU0MDA5YmUzYTIwOWVmYmYxOWZjY2JkN2NhN2EyNjM0MTJjNjQwNDM2NzQyMTYxYjAyZTljN2Q0MzA3ZTVlYWZmOWY1ZDU5M2Q3OTUwNjNlNzE5MmExMzc1ZWU0ZDMxZTc4ZGNjODU4OGMwMTIwYWEwMzY0NWJhYTFlNGNmNGMyMjZiNGQxMzk4ZjAyYWE2Y2JlMTY4ZjkyYzdkY2IzMzNmMjY1NDZlMTlmNTMxM2VjMTQwZjBiMTVkNDE1ZTBhNzIwYjU0NzZkMWQ0MzgzMGZhNWQ5OTcyMmFkYzVmMTFmZjc2YmE5OWRiZDk3OGZlMWVkNzdjNmU1YmM5YTE4NDg3NzZhNGQxZjdlM2I3OTQ0NDdkNjdlNWI5MmY3YzgwYmJhNWQ4NzIwZTcwZWQ3MGNjZDlkNWE2OGUyMGIxYzlkZjE5YjZhZWM3NmU2ZTQzMWUzMDQxZWEzMGQ2ZDcyYjgyZDlkYTlkZmQ2MWMzNjMxOTYwZWUzNTRlMjFlZjcwN2U2MTQ5M2Q1Nzc3ZjY2Y2FlZjI0MmJiZDRkYjNkZmQ4MmQzMTI2OTliODU1YzgyZGJjNGE3YTRlOTQwNmIwMmQ5ZTdlMTc5YzRkNjgxMjNiOWQwMDcwMDQ2ZGU4YmNkMWIxZWRmNGNmYTM1ZWI3ZmI3YjM3Yjg5MGEzOTljYzllNTM5NTVlMDhlYzNlOTEzYjc5MTU5OTY0M2U4Y2Q1ZTBlNDUyMjQ0NjAzZmI0ZTM0NGZjY2M3NGRlOTg4NjFhYTRmOGRmYWEwMTQ1ODkzMWI3MGY4MTc0M2UxNTE4ZWI5ZDMwMzM0Y2MwYmMyMTA2MjFmYmJhN2E3Mjk1YWE3MzA2ZmJkODBhNTljMDVlNzJkNTEyNTM4MjQxMTQ3NWFlMTUzZGE4MmIyYWZkZjY3NGZiODNmZDBiZjBmODc4OWQxMjgwOWNiYTc2M2ZjMmJhMDcyNjU5MDhjYzdiZmNkOTgwZmNlMDI1NDYzZmFjNTY1ZDExNmNjYmQ4ODQ0ZTZjMTNkOTFjY2Q3NjVlMGFhYWIwMzQ5MTg4NDkzOGQxIiwic2FsdCI6ImZhNjQxMzgwNTRjM2ExMWQwNTk2MWMyY2FhZDFlODQ3ZmRiNGM3OTRjNGVhM2E4ZTA2ZDc5NzU5Yzc1OWMzNzkiLCJjcmVhdGVkQXQiOiIyMDE2LTA5LTI2VDIwOjIxOjUwLjc4NFoiLCJ1cGRhdGVkQXQiOiIyMDE2LTA5LTI2VDIwOjIxOjUwLjc4NFoiLCJfaWQiOiI1N2U5ODM1ZTlkYTQ3ZjE1YWYzNTFkYjQifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbCxudWxsLG51bGxdLCIkX19vcmlnaW5hbF92YWxpZGF0ZSI6W251bGxdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltdfSwiaWF0IjoxNDc1OTUzMTU0LCJleHAiOjE0NzYzMTMxNTQsImF1ZCI6IjU3ZTk4MzVlOWRhNDdmMTVhZjM1MWRiNCJ9._zhLziZp1v2S6Se_R-TOKx720C9Ai0FOnBmrrX0DZ2A' },
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
    }
});
