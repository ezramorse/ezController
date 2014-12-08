/**
 * Minimalistic Frontend Controller
 *
 * Hides and Shows blocks with animation sequence when hash changes
 *
 * @date        2014-12-01
 * @version     0.0.1
 * @copyright   Copyright (c) 2014 Ezra Morse <me@ezramorse.com>
 * @license     Released under the MIT and GPL licenses
 * @author      Ezra Morse <me@ezramorse.com>
 */
(function( $ ) {
    $.fn.ezController = function (options) {

        var t = this;

        t.gotoHash = '';
        t.currentHash = false;
        t.element = t.first();

        t.settings = $.extend({
            inTransition: [],
            pages: {},
            initList: {},
            openClass: 'ezControllerOpen',
            autoLoad: true,
            setInTransition: function (h) {
                if (t.settings.inTransition.indexOf(h) < 0)
                    t.settings.inTransition.push(h);
            },
            clearInTransition: function (h) {
                var i = t.settings.inTransition.indexOf(h);
                if (i > -1)
                    t.settings.inTransition.splice(i, 1);

            },
            defaultIntro: function () {
                if (!('transition' in t.settings.pages[t.gotoHash]))
                    t.settings.defaultTransition();
                      else
                    t.settings.pages[t.gotoHash].transition(t.settings.pages[t.gotoHash].data, t);
            },
            defaultTransition: function () {
                t.settings.defaultShow();
            },
            defaultShow: function () {
                t.element.find("[data-page='" + t.gotoHash + "']").hide().removeClass('hidden').addClass(t.settings.openClass).show();
            },
            defaultHide: function (data, o, tranFunc) {
                t.element.children().each(function () { 
			if (typeof $(this).data('page') !== 'undefined')
				$(this).hide().removeClass(t.settings.openClass);
		});
                tranFunc();
            }
        }, options);


        if ("onhashchange" in window) {
            window.onhashchange = function () {
                t.hashChanged();
            }
        }
        else {
            window.setInterval(function () {
                if (t.gotoHash != t.currentHash) {
                    t.hashChanged();
                }
            }, 100);
        }


        t.hashChanged = function () {

            if (t.settings.inTransition.indexOf(window.location.hash) > -1) {
                window.location.hash = t.currentHash;
                return t;
            }

            t.gotoHash = window.location.hash;
            if (t.gotoHash[0] == '#')
                t.gotoHash = t.gotoHash.substring(1);            
            
            if (!(t.gotoHash in t.settings.pages))
                t.settings.pages[t.gotoHash] = {};

            var tran = null;

            if (!(t.gotoHash in t.settings.initList)) {
                t.settings.initList[t.gotoHash] = true;

                t.settings.pages[t.gotoHash].data = {hash: window.location.hash};
                if (!(t.gotoHash in t.settings.pages) || !('init' in t.settings.pages[t.gotoHash])) {
                    tran = t.settings.defaultIntro;
                } else {
                    t.settings.pages[t.gotoHash].init(t.settings.pages[t.gotoHash].data, t);

                    if (!('intro' in t.settings.pages[t.gotoHash]))
                        tran = t.settings.defaultIntro;
                    else
                        tran = t.settings.intro;
                }

            } else {

                if (!(t.gotoHash in t.settings.pages) || !('transition' in t.settings.pages[t.gotoHash]))
                    tran = t.settings.defaultTransition;
                else {
                    tran = t.settings.pages[t.gotoHash].transition;
                }
            }

            var tranFunc = function () {
                tran(t.settings.pages[t.gotoHash].data, t);
            };

            if (t.currentHash in t.settings.initList) {
                if ('hide' in t.settings.pages[t.currentHash])
                    t.settings.pages[t.currentHash].hide(t.settings.pages[t.currentHash].data, t, tranFunc);
                else
                    t.settings.defaultHide(t.settings.pages[t.currentHash].data, t, tranFunc);
            } else if (t.currentHash && t.currentHash in t.settings.pages)
                t.settings.defaultHide(t.settings.pages[t.currentHash].data, t, tranFunc);
  	    else
		t.settings.defaultHide(null, t, tranFunc);

            t.currentHash = t.gotoHash;
        };

        if (t.settings.autoLoad == true)
            t.hashChanged();

        return t;

    }
}( jQuery ));
