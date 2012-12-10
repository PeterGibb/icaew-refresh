jQuery(document).ready(function () {
    jQuery('ul.results-list').each(function () {
        var liItems = jQuery(this);
        var showalllink = jQuery('.showhideallul');
        var selectpagevalue = jQuery('.results-page-value');

        if (liItems.children('li').length > selectpagevalue.val()) {
            liItems.children('li:gt(' + (selectpagevalue.val() - 1) + ')').hide();
            liItems.after('<a href="#" class="showhideallul submit-style" id="hlShowAll">Show all (' + liItems.children('li').length + ' items)</a>');
            if (liItems.children('li:hidden').length <= selectpagevalue.val()) {
                liItems.after('<a href="#" class="showhideul submit-style" id="hlShowMoreLess">Show last ' + liItems.children('li:hidden').length + '</a>');
            }
            else {
                liItems.after('<br/><a href="#" class="showhideul submit-style" id="hlShowMoreLess">Show ' + selectpagevalue.val() + ' more</a>');
            }
        }
    });

    jQuery('.showhideul').click(function (e) {
        e.preventDefault();
        var liItems = jQuery('ul.results - list');
        var liItemInWord = jQuery(this);
        var showalllink = jQuery('.showhideallul');
        var selectpagevalue = jQuery('.results-page-value');


        if (liItemInWord.prev().prev().children('li:hidden:lt(' + selectpagevalue.val() + ')').show("med").length == 0) {
            window.location.hash = "top"
            if (liItemInWord.prev().prev().children('li:hidden').length != 0) {
                //showalllink.hide("slow").show();
            }
        };

        if (liItemInWord.prev().prev().children('li:hidden').length == 0) {
            //liItemInWord.text('Show less');
            //liItemInWord.hide("slow").hide();
            jQuery('ul.results-list').children().show();
            liItemInWord.text('Back to top');
            showalllink.hide("slow").hide();
        } else {
            if (liItemInWord.prev().prev().children('li:hidden').length <= selectpagevalue.val()) {
                liItemInWord.text('Show last ' + (liItemInWord.prev().prev().children('li:hidden').length));
            }
            else {
                liItemInWord.text('Show ' + selectpagevalue.val() + ' more');
            }
        };
    });

    jQuery('.showhideallul').click(function (e) {
        e.preventDefault();
        var liItemInWord = jQuery(this);
        var showmorelesslink = jQuery('.showhideul');

        jQuery('ul.results-list').children().show();
        //showmorelesslink.text('Show less');
        showmorelesslink.text('Back to top');
        liItemInWord.hide("slow").hide();
    });
});

jQuery(document).ready(function () {
    jQuery('ul.mini-list').each(function () {
        var liItems = jQuery(this);
        var numberOfItems = parseInt(liItems.children('div.numberOfItems').text());

        var MaxNumberOfItems = numberOfItems - 1;
        if (liItems.children('li').length > numberOfItems) {
            liItems.children('li:gt(' + MaxNumberOfItems + ')').hide();
            liItems.append('<div class="cta-footer"><a href="#" class="showhideulmini">View more</a></div>');
        }
    });

    jQuery('.showhideulmini').click(function () {
        var liItemInWord = jQuery(this);
        var liItems = liItemInWord.parent().parent();

        var numberOfItems = parseInt(liItems.children('div.numberOfItems').text());
        var MaxNumberOfItems = numberOfItems - 1;

        if (liItems.children('li:hidden:lt(' + numberOfItems + ')').show("med").length == 0) {
            liItems.children('li:gt(' + MaxNumberOfItems + ')').hide("slow").hide();
        };

        if (liItems.children('li:hidden').length == 0) {
            liItemInWord.text('View less');

        } else {
            liItemInWord.text('View more');
        };

        return false;
    });
});








//jQuery(document).ready(function () {
//    jQuery('ul.results-list').each(function () {
//        var liItems = jQuery(this);
//        var showalllink = jQuery('.showhideallul');
//        var selectpagevalue = jQuery('.results-page-value');

//        if (liItems.children('li').length > selectpagevalue.val()) {
//            liItems.children('li:gt(' + (selectpagevalue.val() - 1) + ')').hide();
//            //liItems.after('<br/><select id="selectpagevalue" class="results-page-value"><option>5</option><option>10</option><option>15</option><option>20</option><option>25</option></select></a>');
//            liItems.after('<br/><a href="#" class="showhideallul submit-style" id="hlShowAll">Show all</a>');
//            liItems.after('<br/><a href="#" class="showhideul submit-style" id="hlShowMoreLess">Show more</a>');

//        }
//    });

//    jQuery('.showhideul').click(function (e) {
//        e.preventDefault();
//        var liItemInWord = jQuery(this);
//        var showalllink = jQuery('.showhideallul');
//        var selectpagevalue = jQuery('.results-page-value');


//        if (liItemInWord.prev().prev().children('li:hidden:lt(' + selectpagevalue.val() + ')').show("med").length == 0) {
//            liItemInWord.prev().prev().children('li:gt(' + (selectpagevalue.val() - 1) + ')').hide("slow").hide();
//            if (liItemInWord.prev().prev().children('li:hidden').length != 0) { 
//                showalllink.hide("slow").show();
//            }
//        };

//        if (liItemInWord.prev().prev().children('li:hidden').length == 0) {
//            liItemInWord.text('Show less');
//            showalllink.hide("slow").hide();
//        } else {
//            liItemInWord.text('Show more');
//        };
//    });

//    jQuery('.showhideallul').click(function (e) {
//        e.preventDefault();
//        var liItemInWord = jQuery(this);
//        var showmorelesslink = jQuery('.showhideul');

//        jQuery('ul.results-list').children().show();
//        showmorelesslink.text('Show less');
//        liItemInWord.hide("slow").hide();
//    });
//});

//jQuery(document).ready(function () {
//    jQuery('ul.mini-list').each(function () {
//        var liItems = jQuery(this);
//        var numberOfItems = parseInt(liItems.children('div.numberOfItems').text());

//        var MaxNumberOfItems = numberOfItems - 1;
//        if (liItems.children('li').length > numberOfItems) {
//            liItems.children('li:gt(' + MaxNumberOfItems + ')').hide();
//            liItems.append('<div class="cta-footer"><a href="#" class="showhideulmini">View more</a></div>');
//        }
//    });

//    jQuery('.showhideulmini').click(function () {
//        var liItemInWord = jQuery(this);
//        var liItems = liItemInWord.parent().parent();

//        var numberOfItems = parseInt(liItems.children('div.numberOfItems').text());
//        var MaxNumberOfItems = numberOfItems - 1;

//        if (liItems.children('li:hidden:lt(' + numberOfItems + ')').show("med").length == 0) {
//            liItems.children('li:gt(' + MaxNumberOfItems + ')').hide("slow").hide();
//        };

//        if (liItems.children('li:hidden').length == 0) {
//            liItemInWord.text('View less');

//        } else {
//            liItemInWord.text('View more');
//        };

//        return false;
//    });
//});

