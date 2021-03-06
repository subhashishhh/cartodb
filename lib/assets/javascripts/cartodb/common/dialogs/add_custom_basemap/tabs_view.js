var cdb = require('cartodb.js');
var $ = require('jquery');

/**
 * View representing the tabs content of the dialog.
 */
module.exports = cdb.core.View.extend({

  events: {
    'click .js-open-old-dialog': '_openOldDialog',
    'click .js-tabs button': '_onClickTab'
  },

  initialize: function() {
    this.elder('initialize');
    this._initBinds();
  },

  render: function() {
    var $el = $(
      cdb.templates.getTemplate('common/dialogs/add_custom_basemap/tabs')({
        model: this.model
      })
    );
    $el.find('.js-tab-content').append(this._createTabContentView().el);
    this.$el.html($el);
    return this;
  },

  _initBinds: function() {
    this.model.bind('change:currentTab', this.render, this);
  },

  _createTabContentView: function() {
    if (this._currentTabView) {
      this._currentTabView.clean();
    }
    this._currentTabView = this.model.activeTabModel().createView();
    this.addView(this._currentTabView);
    return this._currentTabView.render();
  },

  // TODO: Remove once all tabs are implemented
  _openOldDialog: function(ev) {
    this.killEvent(ev);
    this.options.openOldDialog();
    this.hide();
  },

  _onClickTab: function(ev) {
    this.killEvent(ev);
    var name = $(ev.target).closest('button').data('name');
    if (name) {
      this.model.set('currentTab', name);
    } else {
      cdb.log.error('tab name was expected but was empty');
    }
  }

});
