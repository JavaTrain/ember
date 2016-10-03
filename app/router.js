import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('messages', function () {
    this.route('new');
    this.route('edit', {path: '/:msg_id/edit'});
  });
  this.route('message', {path: 'messages/:msg_id'});
  this.route('comments');
  this.route('login');
});

export default Router;
