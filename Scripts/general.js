/// <reference path="jquery-1.4.1-vsdoc.js" />

jQuery(document).ready(function () {

    // Handle the flex widgets
    if (jQuery('.flexWidgetContainer').length > 0) {
        var containers = jQuery('.flexWidgetContainer');
        var widget = jQuery('#flexWidgetHolder>*');

        if (widget.length > 0) {
            widget.remove().appendTo(containers);
        }
        else {
            containers.remove();
        }
    }

    jQuery('#flexWidgetHolder').remove();

    //generic tabs
    jQuery(".tabs").tabs({ fx: { opacity: "toggle", duration: "fast"} });

    //generic slide toggle
    jQuery(".toggle-content").hide();
    jQuery(".toggle").click(function () {
        jQuery(this).toggleClass("open").next().slideToggle("med");
    });

    //generic accodion
    if (jQuery(".accordion").length > 0) {
        jQuery(".accordion").accordion(
            {
                autoHeight: false,
                collapsible: true,
                active: false,
                change: function () { jQuery(this).find('dt').blur(); }
            }
        );
    }

    //LightBox Defaults
    if (jQuery(".lightbox").length > 0) {
        jQuery(".lightbox").fancybox({
            'titlePosition': 'inside',
            'transitionIn': 'none',
            'transitionOut': 'none',
            'overlayOpacity': '0.8',
            'overlayColor': '#000'
        });
    }
    //Remove Skype telephone number styling
    window.setTimeout(function () {
        jQuery('.skype_pnh_container').html('');
        jQuery('.skype_pnh_print_container').removeAttr('class');
        jQuery('.skype_pnh_container').remove();
    }, 800);

    //members scroller
    jQuery(".carousel").scrollable().navigator();


    /*page specifics*/

    //Homepage featured promo control
    jQuery(".feature").tabs({ fx: { opacity: "toggle", duration: "fast"} }).tabs("rotate", 5000, true); //rotate featured links and content*/

    if (jQuery("#featured-tabs").length > 0) {
        var height = jQuery(".featured-tabs-nav-wrap").height();
        jQuery("#featured-tabs").css("height", height);
        jQuery(".featured-tabs-desc").css("height", height);
        var paddingTop = jQuery(".featured-tabs-desc li").css("padding-top").replace("px", "");
        var paddingBtm = jQuery(".featured-tabs-desc li").css("padding-bottom").replace("px", "");
        jQuery(".featured-tabs-desc li").css("height", height - paddingTop - paddingBtm);
        jQuery("#featured-tabs").tabs();
    }
    /// <reference path="jquery-ui-custom.min.js" />

    //on mouse hover (anywhere on control , pause rotation, continue rotation afterwards.
    jQuery(".feature").hover(
    function () {
        jQuery(".feature").tabs("rotate", 0, true);
    },
    function () {
        jQuery(".feature").tabs("rotate", 5000, true);
    }
    );

    /*dashboard remove buttons */
    jQuery(".quick-links li").live("hover", function () {
        jQuery(this).children("input").toggle();
    });


    jQuery('.navigation a').each(function () {
        if (jQuery(this).children('br').length < 1) {
            jQuery(this).parent().addClass('single-line');
        }
    });

    searchFormValidate("input#searchTextBox");
    if ($("input.home-search-text").length > 0) {
        searchFormValidate("input.home-search-text");
    }
    if ($("input#keyword").length > 0) {
        searchFormValidate("input#keyword");
    }

});

function post_to_url(url, method, containerElement) {
    method = method || "post"; // Set method to post by default, if not specified.

    var form = jQuery('<form method="' + method + '" action="' + url + '"></form>');
    var container = jQuery(containerElement);

    // Copy inputs from source form
    form.append(container.find('input').clone());
    container.find('select').each(function (i) {
        var element = $(this).clone();
        element.attr("selectedIndex", $(this).attr("selectedIndex"));
        form.append(element);
    });

    document.body.appendChild(form[0]);
    form[0].submit();
}

function postProduct(path, id) {
    // Select box
    var sb = $("#lstaddqty_" + id);

    if (sb) {
        post_to_url(path, "post", sb.parent());
    }
}

function isValidEmail(str) {
    return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
}
function postNewsletter(path) {

    // Email address
    var email = document.getElementById('emailNewsletter').value;

    if (email == '') {
        return;
    }
    if (isValidEmail(email) == false) {
        return;
    }

    // Create paramaters
    var data = new Object;
    data.email = email;

    // Post data
    post_to_url(path, data, "post");

}


function search() {
    if (window.location.href.match(/https?:\/\/[^\/]+(\/en)?\/library/i)) {
        window.location.href = "/library/search?q=" + encodeURI($('#searchTextBox').val());
    }
    else {
        window.location.href = "/search?q=" + encodeURI($('#searchTextBox').val());
    }
}


function trySearch(e) {

    var buttonId = null;
    var textBoxValue = null;


    if (e.type === "keypress") {
        buttonId = $(e.target).siblings(":image").attr("id");
        textBoxValue = $(e.target).val();
    }

    else {
        buttonId = e.target.id;
        textBoxValue = $(e.target).siblings(":text").val();
    }

    for (var searchForm in defaultSearchTerms) {
        if (defaultSearchTerms.hasOwnProperty(searchForm)) {
            if (defaultSearchTerms[searchForm].searchButtonId === buttonId) {
                defaultSearchTerms[searchForm].newSearchTerm = textBoxValue;
                if (defaultSearchTerms[searchForm].canSearch()) {
                    if (buttonId === "searchButton") {
                        e.preventDefault();
                        search();
                        e.stopImmediatePropagation();
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    alert("Please enter a valid search term.");
                    e.preventDefault();
                    return false;
                }
            }
        }
    }

    return false;
}

// search textbox key listner
function searchKeyListner(target) {
    jQuery(target).keypress(function (e) {
        if (e.which == "13") {
            if (e.target.id === "keyword") {
                $("#EventSearchButton").click();
                return false;
            }
            if (trySearch(e)) {
                return true;
            }

            return false;
        }
    });
}

function searchButtonListner(target) {
    jQuery(target).click(function (e) {
        trySearch(e);
    });

}

var defaultSearchTerms = [];

// used for validation
function searchForm(searchFormId, searchButtonId, defaultSearchTerm) {
    this.searchFormId = searchFormId;
    this.searchButtonId = searchButtonId;
    this.defaultSearchTerm = defaultSearchTerm;
    this.newSearchTerm = null;
    this.canSearch = function () {
        if (this.defaultSearchTerm != this.newSearchTerm && this.newSearchTerm !== "") {
            return true;
        }
        if ((window.location.href.match(/https?:\/\/[^\/]+(\/en)?\/search/i)) && this.newSearchTerm !== "" && this.searchButtonId !== "searchButton") {
            return true;
        }
        if ((window.location.href.match(/https?:\/\/[^\/]+(\/en)?\/library/i)) && this.newSearchTerm !== "" && this.searchButtonId !== "searchButton") {
            return true;
        }
        else {
            return false;
        }
    }
}

function searchFormValidate(target) {
    searchKeyListner(target);
    if ($(target).attr("id") != "keyword") {
        searchButtonListner($(target).siblings(":image"));
        searchValidation(target);
    }
}

function searchValidation(target) {
    $(target).each(function (index) {
        defaultSearchTerms.push(new searchForm(this.id, $(this).siblings(":image").attr("id"), $(this).val()));
    });
}

// INCLUDE SUPERFISH PLUGIN

/*
* Superfish v1.4.8 - jQuery menu widget
* Copyright (c) 2008 Joel Birch
*
* Dual licensed under the MIT and GPL licenses:
* 	http://www.opensource.org/licenses/mit-license.php
* 	http://www.gnu.org/licenses/gpl.html
*
* CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
*/

; (function ($) {
    $.fn.superfish = function (op) {

        var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="', c.arrowClass, '"> &#187;</span>'].join('')),
			over = function () {
			    var $$ = $(this), menu = getMenu($$);
			    clearTimeout(menu.sfTimer);
			    $$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function () {
			    var $$ = $(this), menu = getMenu($$), o = sf.op;
			    clearTimeout(menu.sfTimer);
			    menu.sfTimer = setTimeout(function () {
			        o.retainPath = ($.inArray($$[0], o.$path) > -1);
			        $$.hideSuperfishUl();
			        if (o.$path.length && $$.parents(['li.', o.hoverClass].join('')).length < 1) { over.call(o.$path); }
			    }, o.delay);
			},
			getMenu = function ($menu) {
			    var menu = $menu.parents(['ul.', c.menuClass, ':first'].join(''))[0];
			    sf.op = sf.o[menu.serial];
			    return menu;
			},
			addArrow = function ($a) { $a.addClass(c.anchorClass).append($arrow.clone()); };

        return this.each(function () {
            var s = this.serial = sf.o.length;
            var o = $.extend({}, sf.defaults, op);
            o.$path = $('li.' + o.pathClass, this).slice(0, o.pathLevels).each(function () {
                $(this).addClass([o.hoverClass, c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
            });
            sf.o[s] = sf.op = o;

            $('li:has(ul)', this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over, out).each(function () {
                if (o.autoArrows) addArrow($('>a:first-child', this));
            })
			.not('.' + c.bcClass)
				.hideSuperfishUl();

            var $a = $('a', this);
            $a.each(function (i) {
                var $li = $a.eq(i).parents('li');
                $a.eq(i).focus(function () { over.call($li); }).blur(function () { out.call($li); });
            });
            o.onInit.call(this);

        }).each(function () {
            var menuClasses = [c.menuClass];
            if (sf.op.dropShadows && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
            $(this).addClass(menuClasses.join(' '));
        });
    };

    var sf = $.fn.superfish;
    sf.o = [];
    sf.op = {};
    sf.IE7fix = function () {
        var o = sf.op;
        if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity != undefined)
            this.toggleClass(sf.c.shadowClass + '-off');
    };
    sf.c = {
        bcClass: 'sf-breadcrumb',
        menuClass: 'sf-js-enabled',
        anchorClass: 'sf-with-ul',
        arrowClass: 'sf-sub-indicator',
        shadowClass: 'sf-shadow'
    };
    sf.defaults = {
        hoverClass: 'sfHover',
        pathClass: 'overideThisToUse',
        pathLevels: 1,
        delay: 800,
        animation: { opacity: 'show' },
        speed: 'normal',
        autoArrows: true,
        dropShadows: true,
        disableHI: false, 	// true disables hoverIntent detection
        onInit: function () { }, // callback functions
        onBeforeShow: function () { },
        onShow: function () { },
        onHide: function () { }
    };
    $.fn.extend({
        hideSuperfishUl: function () {
            var o = sf.op,
				not = (o.retainPath === true) ? o.$path : '';
            o.retainPath = false;
            var $ul = $(['li.', o.hoverClass].join(''), this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility', 'hidden');
            o.onHide.call($ul);
            return this;
        },
        showSuperfishUl: function () {
            var o = sf.op,
				sh = sf.c.shadowClass + '-off',
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility', 'visible');
            sf.IE7fix.call($ul);
            o.onBeforeShow.call($ul);
            $ul.animate(o.animation, o.speed, function () { sf.IE7fix.call($ul); o.onShow.call($ul); });
            return this;
        }
    });

})(jQuery);


// INITIALISE SUPERFISH PLUGIN
$(document).ready(function () {
    $('ul.sf-menu').superfish({
        delay: 500,                            // one second delay on mouseout 
        animation: { opacity: 'show', height: 'show' },  // fade-in and slide-down animation 
        speed: 'fast',                          // faster animation speed 
        autoArrows: false,                           // disable generation of arrow mark-up 
        dropShadows: false                            // disable drop shadows 
    });
});

// FEATURED CONTENT SLIDER PANEL
$(document).ready(function () {
    // Tabs should go to destination by default but let's rename them to the target tab if javascript is turned on
    $('#featured ul > li').each(function (i) {
        var item = i + 1;
        $('#nav-fragment-' + item + ' a').attr('href', '#fragment-' + item);
    });
    // Rotate
    $("#featured").tabs({ fx: { opacity: "toggle"} }).tabs("rotate", 7000, true);
    // Pause on hover
    $("#tabspanel").hover(
        function () {
            $("#featured").tabs("rotate", 0, true);
        },
        function () {
            $("#featured").tabs("rotate", 7000, true);
        }
    );
    });

// Banner end title switcher
$(document).ready(function () {
    var BannerTitle = $('#shareTitle').text();
    $('#shareTitle').text('');
    $("#bannerEnd a").hover(function (event) {
        BannerTitle = $(this).attr('title');
        $('#shareTitle').text(BannerTitle);
    }, function () {
        $('#shareTitle').text('');
    });
    // Styling supplement for IE7 and 8
    $('ul.header-column li a:first').css('border-left-width', 0);
});


// iPhone Footer link
$(document).ready(function ($) {
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod)/);
    if (agentID) {
        $("#iPhoneHide").attr("id", "iPhoneShow");
    }
});