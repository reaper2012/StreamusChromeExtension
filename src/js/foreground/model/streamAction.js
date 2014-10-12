﻿define([
    'foreground/view/prompt/clearStreamPromptView',
    'foreground/view/prompt/saveSongsPromptView'
], function (ClearStreamPromptView, SaveSongsPromptView) {
    'use strict';

    var StreamItems = Streamus.backgroundPage.StreamItems;

    var StreamAction = Backbone.Model.extend({
        clearStream: function () {
            if (StreamItems.length > 0) {
                this._showClearStreamPrompt();
            }
        },
        
        saveStream: function() {
            if (StreamItems.length > 0) {
                this._showSaveSongsPrompt();
            }
        },
        
        _showClearStreamPrompt: function () {
            Backbone.Wreqr.radio.channel('prompt').commands.trigger('show:prompt', ClearStreamPromptView);
        },
        
        _showSaveSongsPrompt: function() {
            Backbone.Wreqr.radio.channel('prompt').commands.trigger('show:prompt', SaveSongsPromptView, {
                songs: StreamItems.pluck('song')
            });
        }
    });

    return new StreamAction();
});