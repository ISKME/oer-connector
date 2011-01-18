// check for ie5 mac
var bugRiddenCrashPronePieceOfJunk = (
    navigator.userAgent.indexOf('MSIE 5') != -1
    &&
    navigator.userAgent.indexOf('Mac') != -1
)

var W3CDOM = (!bugRiddenCrashPronePieceOfJunk &&
               typeof document.getElementsByTagName != 'undefined' &&
               typeof document.createElement != 'undefined' );

function isUndefinedOrNull(/* ... */) {
    for (var i = 0; i < arguments.length; i++) {
    var o = arguments[i];
    if (!(typeof(o) == 'undefined' || o === null)) {
        return false;
    }
    }
    return true;
}

function selectAllCheckboxes(id, formName) {
    // Get the elements. if formName is provided, get the elements inside the form
    if (formName==null) {
        checkboxes = document.getElementsByName(id)
        for (i = 0; i < checkboxes.length; i++){
            checkboxes[i].checked = true ;
            }
    } else {
        for (i=0; i<document.forms[formName].elements.length;i++){
            if (document.forms[formName].elements[i].name==id){
                document.forms[formName].elements[i].checked=true;
                }
            }
        }
    }

function deselectAllCheckboxes(id, formName) {
    if (formName==null) {
        checkboxes = document.getElementsByName(id)
        for (i = 0; i < checkboxes.length; i++){
            checkboxes[i].checked = false ;}
    } else {
        for (i=0; i<document.forms[formName].elements.length;i++){
            if (document.forms[formName].elements[i].name==id){
                document.forms[formName].elements[i].checked=false;
                }
            }
        }
    }

function initializeCollapsibles() {
    $('.collapsible_header').click(function() {   
        var header = $(this);
	    var container = $(this).parents(".collapsible_container").get(0);
	    if (!container)
	        return true;
	    var items = $('.collapsible_item', container);
	    if (header.hasClass('collapsed')) {
	    	items.show();
	    } else {
	    	items.hide();
	    }
	    $('.collapsible_header', container).toggleClass('collapsed').toggleClass('expanded');
    });
    $('.collapsible_header_sub').click(function() {   
        var header = $(this);
	    var container = $(this).parents(".collapsible_container_sub").get(0);
	    if (!container)
	        return true;
	    var items = $('.collapsible_item_sub', container);
	    if (header.hasClass('collapsed')) {
	    	items.show();
	    } else {
	    	items.hide();
	    }
	    $('.collapsible_header_sub', container).toggleClass('collapsed').toggleClass('expanded');
    });
}

$.extend(DateInput.DEFAULT_OPTS, { start_of_week: 0 });

$.extend(DateInput.DEFAULT_OPTS, {
  stringToDate: function(string) {
    var matches;
    if (matches = string.match(/^(\d{2,2})\/(\d{2,2})\/(\d{4,4})$/)) {
      return new Date(matches[3], matches[1] - 1, matches[2]);
    } else {
      return null;
    };
  },

  dateToString: function(date) {
    var month = (date.getMonth() + 1).toString();
    var dom = date.getDate().toString();
    if (month.length == 1) month = "0" + month;
    if (dom.length == 1) dom = "0" + dom;
    return month + "/" + dom + "/" + date.getFullYear();
  }
});

$(document).ready(function() {$($.date_input.initialize);});
$(document).ready(function() {initializeCollapsibles();});
    
var LOADING_INDICATOR_HTML = '<img src="'+SITE_URL+'/@@/oer-images/ajax-loader.gif" alt="Loading..." />';    

function addTagToSelection(tag) {
    tag = $.trim(tag);
    var textarea = $("textarea[name='tags']");
    var selected_tags = textarea.attr("value").split("\n");
    for (var i=0; i < selected_tags.length; i++ ) {
        if (tag == $.trim(selected_tags[i]))
           return;
    }
    tags = new Array();
    for (var i=0; i < selected_tags.length; i++) {
        if ($.trim(selected_tags[i]) != "") 
            tags.push($.trim(selected_tags[i]));
    }
    tags.push(tag);
    textarea.attr("value", tags.join("\n"));
}    

function initializeSearchBox() {
	var searchbox = $("#searchbox input[name='f.search']");
	searchbox.focus(function() {
		if (this.value == "Enter Search")
			this.value = "";
	});
	searchbox.blur(function() {
		if (this.value == "")
			this.value = "Enter Search";
	});
	$("#searchbox").submit(function() {
		var searchbox = $("#searchbox input[name='f.search']");
		if (searchbox.attr("value") == "" || searchbox.attr("value")== "Enter Search")
			return false;
		return true;
	});
}

function initializeListingParamersForm() {
	$("#listing-actionpanel form select[name='sort_on']").change(function() {
		var value = $("#listing-actionpanel form select[name='sort_on']").attr("value");
		$("#filters-portlet form input[name='sort_on']").attr("value", value);
		$("#filters-portlet form").submit();
	});
	$("#listing-actionpanel form select[name='batch_size']").change(function() {
		var value = $("#listing-actionpanel form select[name='batch_size']").attr("value");
		$("#filters-portlet form input[name='batch_size']").attr("value", value);
		$("#filters-portlet form").submit();
	});
}

function initializeListingExpandAll() {
	$(".listing-navigation a.expand-link").click(function() {
		$(".listing-item .collapsible_header").addClass("expanded").removeClass("collapsed");
		$(".listing-item .collapsible_item").show();
	});
	$(".listing-navigation a.collapse-link").click(function() {
		$(".listing-item .collapsible_header").addClass("collapsed").removeClass("expanded");
		$(".listing-item .collapsible_item").hide();
	});
}

function initializeListingItemLinks() {
	$("a.item-link").click(function() {
		var form = document.forms['search-parameters-form'];
		form.action = this.href;
		form.submit();
		return false;
	})
}

function initializeFiltersPortlet() {
	$("#filters-portlet table.filter thead :checkbox").click(function() {
		var table = $(this).parents("table.filter").get(0);
		var tbody = $("tbody", table);
		if (this.checked)
			$(":checkbox", tbody).attr("checked", true);
		else
			$(":checkbox", tbody).attr("checked", false);
	});
	$("#filters-portlet table.filter tbody :checkbox").click(function() {
		var tbody = $(this).parents("tbody").get(0);
		var table = $(this).parents("table.filter").get(0);
		var checkboxes = $(":checkbox", tbody);
		var checked = jQuery.grep(checkboxes, function(checkbox) {return checkbox.checked});
		if (checked.length == checkboxes.length)
			$("thead :checkbox", table).attr("checked", true);
		else
			$("thead :checkbox", table).attr("checked", false);
	});
}

function before(element1, element2) {
	element2.before(element1);
}

function initializeSendSearchForm() {
	$("#send-search-link").click(function() {
	    var offset = $("#send-search-link").offset();
	    $("#send-search-form").css("top", (offset.top + 35) + "px").css("left", (offset.left - 120) + "px").show().dropShadow();
	});
	$(document).ready(function() {
		$("#send-search-form").validate({errorPlacement: before});
	});
}

function initializeSaveSearchForm() {
	$("#save-search-link").click(function() {
	    var offset = $("#save-search-link").offset();
	    $("#save-search-form").css("top", (offset.top + 35) + "px").css("left", (offset.left - 120) + "px").show().dropShadow();
	});
	$(document).ready(function() {
		$("#save-search-form").validate({errorPlacement: before});
	});
}

function initializeAdvancedSearch() {
	$(".advanced-search-filters table.filter thead :checkbox").click(function() {
		var table = $(this).parents("table.filter").get(0);
		var tbody = $("tbody", table);
		if (this.checked)
			$(":checkbox", tbody).attr("checked", true);
		else
			$(":checkbox", tbody).attr("checked", false);
	});
	$(".advanced-search-filters table.filter tbody :checkbox").click(function() {
		var table = $(this).parents("table.filter:last");
		var tbody = $('tbody:first', table);
		var checkboxes = $(":checkbox", tbody);
		var checked = $(":checkbox:checked", tbody);
		if (checked.length == checkboxes.length)
			$("thead:first :checkbox", table).attr("checked", true);
		else
			$("thead:first :checkbox", table).attr("checked", false);
	});
}

function initializeRemoveFromPortfolioButtons() {
	$(".remove-from-portfolio-button").click(function() {
		$(".remove-from-portfolio-confirmation", $(this).parents(".details-ct").get(0)).show();
	});
	$(".remove-from-portfolio-confirmation .cancel").click(function() {
		$($(this).parents(".remove-from-portfolio-confirmation").get(0)).hide();
	});
	$(".remove-from-portfolio-confirmation .confirm").click(function() {
		var url = $(".item-link", $(this).parents(".details-ct").get(0)).attr("href");
		url += "/unsave";
		var form = $("#remove-from-portfolio-form");
		form.attr("action", url);
		form.submit();
	});
}

function initializeRemoveSavedSearchButtons() {
	$(".remove-saved-search-button").click(function() {
		$(".remove-saved-search-confirmation", $(this).parents("li").get(0)).show();
	});
	$(".remove-saved-search-confirmation .cancel").click(function() {
		$($(this).parents(".remove-saved-search-confirmation").get(0)).hide();
	});
}

function hideAllMenus() {
    $('dl.actionMenu').removeClass('activated');
    $('dl.actionMenu').addClass('deactivated');
};

function toggleMenuHandler(event) {
    if (!event) var event = window.event; // IE compatibility

    // terminate if we hit a non-compliant DOM implementation
    // returning true, so the link is still followed
    if (!W3CDOM){return true;}

    var container = $(this).parents(".actionMenu").get(0);
    if (!container) {
        return true;
    }
    
    container = $(container);

    // check if the menu is visible
    if (container.hasClass('activated')) {
        // it's visible - hide it
	    container.removeClass('activated');
	    container.addClass('deactivated');
    } else {
        // it's invisible - make it visible
        container.removeClass('deactivated');
        container.addClass('activated');
    }
    return false;
};

function hideMenusHandler(event) {
    if (!event) var event = window.event; // IE compatibility
    hideAllMenus();
    // we want to follow this link
    return true;
};

function actionMenuDocumentMouseDown(event) {
    if (!event) var event = window.event; // IE compatibility

    if (event.target)
        targ = event.target;
    else if (event.srcElement)
        targ = event.srcElement;

    var container = $(targ).parents(".actionMenu").get(0);
    if (container) {
        // targ is part of the menu, so just return and do the default
        return true;
    }

    hideAllMenus();

    return true;
};

function actionMenuMouseOver(event) {
    
    if (!event) var event = window.event; // IE compatibility

    if (!this.tagName && (this.tagName == 'A' || this.tagName == 'a')) {
        return true;
    }

    var container = $(this).parents(".actionMenu").get(0);
    
    if (!container) {
        return true;
    }
    var menu_id = container.id;

    var switch_menu = false;
    // hide all menus
    var menus = $('dl.actionMenu').each(function(i) {
        // check if the menu is visible
        var menu = $(this);
        if (menu.hasClass('activated')) {
            switch_menu = true;
        }
        // turn off menu when it's not the current one
        if (menu.attr('id') != menu_id) {
            menu.removeClass('activated');
            menu.addClass('deactivated');
        }
    });

    if (switch_menu) {
        $('#'+menu_id).removeClass('deactivated');
        $('#'+menu_id).addClass('activated');
    }
    
    return true;
};

function initializeMenus() {
    // terminate if we hit a non-compliant DOM implementation
    if (!W3CDOM) {return false;}

    document.onmousedown = actionMenuDocumentMouseDown;

    hideAllMenus();

    // add toggle function to header links
    var menu_headers = $('dl.actionMenu > dt.actionMenuHeader > a').click(toggleMenuHandler);
    var menu_headers = $('dl.actionMenu > dt.actionMenuHeader > a').mouseover(actionMenuMouseOver);

    // add hide function to all links in the dropdown, so the dropdown closes
    // when any link is clicked
    var menu_contents = $('dl.actionMenu > dd.actionMenuContent').click(hideMenusHandler);

};

$(initializeMenus);

function saveItemFromListing(anchor, itemURL) {
	var url = itemURL + "/saveAjax";
	var container = $(anchor).parents(".listing-item").get(0);
	container = $(".details-ct", container);
	var message = $("<div class=\"notification-message\"></div>");
	container.append(message);
	message.load(url, function(responseText, textStatus, request) {
		if (textStatus == "error") {
			$(this).html("Error occurred");
		} else {
			var container = $(this).parents(".listing-item").get(0);
//			$(".save-link", container).hide();
//			$(".unsave-link", container).show();
		}
		$(this).schedule("2s", function() {
			$(this).fadeOut("normal", function() {
				$(this).remove();
			});
		});
	});
}

function unsaveItemFromListing(anchor, itemURL) {
	var url = itemURL + "/unsaveAjax";
	var container = $(anchor).parents(".listing-item").get(0);
	container = $(".details-ct", container);
	var message = $("<div class=\"notification-message\"></div>");
	message.hide();
	container.append(message);
	message.load(url, function(responseText, textStatus, request) {
		if (textStatus == "error") {
			$(this).html("Error occurred");
		} else {
			var container = $(this).parents(".listing-item").get(0);
			$(".save-link", container).show();
			$(".unsave-link", container).hide();
		}
		$(this).show();
		$(this).schedule("2s", function() {
			$(this).fadeOut("normal", function() {
				$(this).remove();
			});
		});
	});
}

function goToWithCameFrom(url) {
	document.forms['came-from-form'].action = url;
	document.forms['came-from-form'].submit(); 
}

function showRateFormFromView(itemURL) {
	$("#rate-form-ct").load(itemURL+"/oer.rating.RateForm",
        {"came_from":document.forms['came-from-form']['came_from'].value},
        function(responseText, textStatus, request) {
        	$("#rate-btn").hide();
	});
}

function showRateFormFromListing(anchor, itemURL) {
	$("#rate-form").remove();
	var container = $(anchor).parents(".listing-item").get(0);
	container = $(".rate-form-ct", container);
	container.load(itemURL+"/oer.rating.RateForm",
		{"from_listing":"yes","came_from":document.forms['came-from-form']['came_from'].value}
	);
}

function rateItemFromView(itemURL) {
	var url = itemURL + "/rateAjax";
	var message = $("<div class=\"statusMessage\"></div>");
	var data = {'rate':document.forms['rate-form']['rate'].value};
	message.load(url, data, function(responseText, textStatus, request) {
		if (textStatus == "error") {
			$(this).html("Error occurred");
		}
		$("#main-column").prepend($(this));
		$(this).schedule("2s", function() {
			$(this).fadeOut("normal", function() {
				$(this).remove();
			});
		});
		$("#rate-form").hide();$("#rate-btn").show();
		$.get(itemURL+"/oer.rating.DisplayRating", function(data, textStatus) {
			if ($("#stars-ct .stars").length == 0)
				$("#stars-ct").prepend(data);
			else
				$("#stars-ct .stars").replaceWith(data);
		}, "html");
	});
}

function openRateFormInListing(anchor, itemURL, canRate) {
	var form = $("#rate-form");
	if (form.length == 0) { // Create form
		form = $('<form id="rate-form" name="rate-form" method="post"></form>');
		form.attr("action", itemURL+"/rate");
		form.append($('<input type="hidden" name="came_from" />').attr("value", document['forms']['came-from-form']['came_from'].value));
	}
}

function rateItemFromListing(anchor, itemURL) {
	var url = itemURL + "/rateAjax";
	var container = $(anchor).parents(".listing-item").get(0);
	container = $(".details-ct", container);
	var message = $("<div class=\"notification-message\"></div>");
	message.hide();
	container.append(message);
	var data = {'rate':document.forms['rate-form']['rate'].value};
	message.load(url, data, function(responseText, textStatus, request) {
		if (textStatus == "error") {
			$(this).html("Error occurred");
		}
		$(this).show();
		$(this).schedule("2s", function() {
			$(this).fadeOut("normal", function() {
				$(this).remove();
			});
		});
		$("#rate-form").remove();
		var container = $(this).parents(".listing-item").get(0);
		$(".rating-ct", container).load(itemURL+"/oer.rating.DisplayRating");
	});
}

$(function() {
	$(".statusMessage").schedule("5s", function() {
		$(this).fadeOut("normal", function() {
			$(this).remove();
		});
	});
});


function handleSwithLicenseType() {
    cc_standard_ct = $('#cc-ct');
    cc_standard_ct.hide();
    var cc_standard_old_ct = $('#cc-old-ct');
    cc_standard_old_ct.hide();
    var custom_ct = $('#custom-ct');
    custom_ct.hide();
    var checkbox = $(":radio:checked[name='license_type']");
    if (!isUndefinedOrNull(checkbox)) {
        var value = checkbox.attr('value');
        if (value == 'cc') {
            cc_standard_ct.show();
        } else if (value == 'cc-old') {
            cc_standard_old_ct.show();
        } else if (value == 'custom') {
            custom_ct.show();
        }
    }
}

function showCCQuestions() {
	$('#cc-license-name').hide();
	$('#cc-license-choose-link-ct').hide();
	$('#cc-license-questions-ct').show();
}

function getCCAnswers() {
    var answers = {}
    for (var i=0; i<document.forms.length; i++ ) {
        var form = document.forms[i];
        for (var j=0;j<form.elements.length;j++ ) {
            var el = form.elements[j];
            if (isUndefinedOrNull(el.name))
                continue;
            if (el.name.indexOf('cc-question-') != -1) {
                answers[el.name.slice(12)] = el.value;
            } 
        }
    }
    return answers;
}

var CC_LICENSE_LINK_TPL = $.template('<a href="${license_url}" target="_blank">${license_name}</a>');
CC_LICENSE_LINK_TPL.compile();

function issueCCLicense() {
    $('#cc-license-questions-ct').hide();
    $('#cc-license-name').html(LOADING_INDICATOR_HTML).show();
    $('#cc-license-choose-link-ct').hide();
    $('#cc-license-error').text('').hide();
    $.getJSON(
        SITE_URL+'/cc_picker_helper.issue',
        getCCAnswers(),
        function(data, textStatus) {
           if (data.status == 'failure') {
               $('#cc-license-questions-ct').show();
               $('#cc-license-name').text('');
               $('#cc-license-error').text('Failed to get license information').show();
               return;             
           }
           $('#cc-license-name').html(CC_LICENSE_LINK_TPL, data);
           $(":hidden[name='cc_license_url']").attr("value", data.license_url);
           
           $('#cc-license-choose-link').text('change...');
           $('#cc-license-choose-link-ct').show();
           $('#cc-license-name').show();
        }
    );
}