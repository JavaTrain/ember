import DS from 'ember-data';
import _ from "lodash/lodash";

export default DS.RESTSerializer.extend({
    // attrs: {
    //     user: { embedded: 'always' },
    // },
    normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {
        console.log(payload.users, requestType);
        if(requestType == 'updateRecord'){
            payload = {user: payload};
        }
        if(requestType == 'findAll'){
            var pages = payload.pages;
            var arr = [];
            // console.log(pages);
            _.forOwn(pages, function(value, key) {
                if(value['0']){
                    value['0']['posted_by']=value['0']['posted_by']['id'];
                    arr.push(value['0']);
                }
            });
            arr['id'] = 0;
            console.log(888,arr);
            payload.pages = arr;

            // for (var key in pages) {
            //     // console.log(pages[key][0]);
            //     // var _id = pages[key][0]['posted_by']['id'];
            //     // console.log(_id,id);
            //     console.log(pages[key][0]['posted_by']['id']);
            //     pages[key][0]['posted_by'] = 1;
            // }
            // payload['pages'] = pages;
        }


        return this._super(store, primaryModelClass, payload, id, requestType);
    },
});
