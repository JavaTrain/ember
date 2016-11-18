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
    this.route('show', {path: '/:msg_id'});
  });
  this.route('message', {path: 'messages/:msg_id'});
  this.route('comments');
  this.route('login');
  this.route('users', function() {
    this.route('user', {path: 'users/:user_id'});
  });
  this.route('profile');
  this.route('pages');
});

export default Router;
