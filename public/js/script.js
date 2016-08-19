/**
 * author    : oguzhandemiroz
 * project   : inSelenium
 */
(function() {
    'use strict';
    var $ = jQuery;
    $.fn.extend({
        filterTable: function() {
            return this.each(function() {
                $(this).on('keyup', function(e) {
                    $('.filterTable_no_results').remove();
                    var $this = $(this),
                        search = $this.val().toLowerCase(),
                        target = $this.attr('data-filters'),
                        $target = $(target),
                        $rows = $target.find('tbody tr');

                    if (search == '') {
                        $rows.show();
                    } else {
                        $rows.each(function() {
                            var $this = $(this);
                            $this.text().toLowerCase().indexOf(search) === -1 ? $this.hide() : $this.show();
                        })
                        if ($target.find('tbody tr:visible').size() === 0) {
                            var col_count = $target.find('tr').first().find('td').size();
                            var no_results = $('<tr class="filterTable_no_results"><td colspan="' + col_count + '">No results found...</td></tr>')
                            $target.find('tbody').append(no_results);
                        }
                    }
                });
            });
        }
    });
    $('[data-action="filter"]').filterTable();
})(jQuery);

$(function() {
        // attach table filter plugin to inputs
        $('[data-action="filter"]').filterTable();

        $('.container').on('click', '.panel-heading span.filter', function(e) {
            var $this = $(this),
                $panel = $this.parents('.panel');

            $panel.find('.panel-body').slideToggle();
            if ($this.css('display') != 'none') {
                $panel.find('.panel-body input').focus();
            }
        });
        $('[data-toggle="tooltip"]').tooltip();
    })
    /* ################################ myFunctions ################################ */


var inSelenium = {
    frameResize: function() {
        var frameHeight = jQuery(window).height() - 102;
        jQuery('#iframeContainer').height(frameHeight);
    },
    systemRulesTests: function() {
        if ($('#panelRow').attr('class').split(' ')[1] == "isHidden")
            $('#panelRow').removeClass('isHidden');
        $('nav#navbar-smartSelector').remove();
        $('#iframeContainer').remove();
    },
    notify2Test: function() {
        $('#resultTable .panel-title span').text("Notify v2")
        if (testAjax === false) {
            jQuery.ajax({
                type: "POST",
                url: "",
                success: function(veri) {
                    jsonResult = JSON.parse(veri);
                    console.log(jsonResult);
                    console.log(JSON.parse(jsonResult['dbCampLogs']).impression);
                    $('#campId').text(jsonResult['campId']);
                    testAjax = false;
                }
            });
            testAjax = true;
        }
    },
    stopSelector: function() {
        var testName = '<li style="width: 250px;"> <div class="input-group"> <input id="testNameSmart" type="text" class="form-control" placeholder="Test Name..."> <span id="saveSmart" class="input-group-btn"> <button class="btn btn-default" type="button" onclick="data.saveTest();">Save</button> </span> </div></li>';
        if ($('#navbar-smartSelector li a:last').text() == "Stop ") {
            $('#navbar-smartSelector li:last').remove();
            $('#navbar-smartSelector li:last').after(testName);
            $('#navbar-smartSelector li input#checkCampId').parent().parent().remove();
        }
    },
    smartSelector: function() {
        if ($('nav#navbar-smartSelector').length == 0) {
            $('nav').append('<nav class="navbar navbar-inverse navbar-static-top mgRm" style="z-index: 9;" id="navbar-smartSelector"> <div class="container"> <div class="collapse navbar-collapse openClose"> <ul class="nav navbar-right navbar-nav"><li><a id="testListSmart" href="/tests">Test Lists <span class="glyphicon glyphicon-th-list"></span></a> </li><li><a id="startSmart" href="#" onclick="window.smartSelector();window.loadSmart();">Start <span class="glyphicon glyphicon-play"></span></a> </li></ul> </div></div></nav><div id="iframeContainer"> <iframe src="http://shoppbagg.com?insiderselenium/?insiderselenium" id="iframeView" class="smartIframe"></iframe></div>');
            this.frameResize();
        }
        var checkCampaign = '<li onclick="inSelenium.checkCamp();"><a id="checkCampaign" href="#">Check Campaign <span class="glyphicon glyphicon-ok"></span></a> </li>';
        $('#navbar-smartSelector li a:last').click(function() {
            $('#navbar-smartSelector li:last').html('<a href="#">Stop <span class="glyphicon glyphicon-stop"></span></a>');
            $('#navbar-smartSelector li a:last').attr('onclick', 'inSelenium.stopSelector();').attr('id', 'stopSmart');
            $('#navbar-smartSelector li:last').before(checkCampaign);
        });
    },
    checkCamp: function() {
        var checkCampInput = '<li style="width: 170px;"><div class="input-group"><input id="checkCampId" type="text" class="form-control" placeholder="Camp Id"> <span id="checkCamp" class="input-group-btn"> <button class="btn btn-default" type="button" onclick="window.searchCampaign();">Check</button></span></div></li>';
        if ($('#navbar-smartSelector li a#checkCampaign').length>0) {
            $('#navbar-smartSelector li a#checkCampaign').parent().remove();
            $('#navbar-smartSelector li:first').after(checkCampInput);
        }
    },
    systemRules: function() {
        jQuery.ajax({
            type: "POST",
            url: "",
            data: $('#systemRulesLinks').serialize(),
            success: function(veri) {
                //$('#panelRow').append(jQuery(veri));
                console.log(jQuery(veri));
                jQuery('#progressBar').css('display', 'none');
                progressBar = false;
            }
        });
    }

};
/* smartSelector iframe height */
jQuery(this).on('resize', function() {
    inSelenium.frameResize();
});

$(document).ready(function() {
    inSelenium.smartSelector();
    var progressBar = false;
    var testAjax = false;
    var jsonResult = null;
    var campLogs = null;
    $('button').click(function() {
        if (progressBar === false) {
            jQuery('#progressBar').css('display', 'block');
            progressBar = true;
        }
    });
    $('.dropdown li a[onclick]').click(function() {
        if (progressBar === false) {
            jQuery('#progressBar').css('display', 'block');
            progressBar = true;
        }
    });

    //----------------------------

    var _text = Number($('.progress-bar-striped').text().replace('%', ''));
    var _width = $('.progress-bar-striped').width();
    var timer = null;
    var count = function(timer) {
        if (typeof(timer) === 'undefined') timer = 1000;
        console.log(timer, _text);
        var myInterval = setInterval(function() {
            _text++;
            _width += 19;
            $('.progress-bar-striped').text(_text + "%");
            $('.progress-bar-striped').css('width', _width + 'px');
            if (_text > 100) {
                $('.progress-bar-striped').text("Testin sonuçları hazırlanıyor...");
                clearInterval(myInterval);
            }
        }, timer);
        return _text;
    }
});
