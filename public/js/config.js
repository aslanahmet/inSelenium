window.smartSelector = function() {
    sQuery('.smartIframe').pm(function() {
        sQuery.fn.extend({
            im: function(pmFunction, success, data) {
                return this.each(function() {
                    if (Boolean(sQuery(window).get(0).window)) {
                        pm({
                            target: window.parent,
                            type: 'sQueryPM',
                            data: {
                                data: JSON.stringify(data),
                                callback: encodeURI(pmFunction),
                                campId: 238
                            },
                            success: function(data) {
                                if (Boolean(success)) {
                                    try {
                                        success(data);
                                    } catch (err) {
                                        sQuery(window).pm(function(data) {
                                            spApi.errLog(data.err, {
                                                logType: 'PM Success Error (from iframe)',
                                                bugType: 'partner',
                                                /* partner or product */
                                                extraData: {
                                                    campId: 238,
                                                    params: data.param,
                                                    callback: String(data.callback)
                                                }
                                            });
                                        }, undefined, {
                                            err: err,
                                            callback: success.toString(),
                                            param: JSON.stringify(data) || ""
                                        });
                                    }
                                }
                            }
                        });
                    }
                });
            }
        });

        function getPath(element) {
            var path, node = element;
            while (node.length) {
                var realNode = node[0],
                    name = realNode.localName;
                if (!name) break;
                name = name.toLowerCase();

                var parent = node.parent();

                var sameTagSiblings = parent.children(name);
                if (sameTagSiblings.length > 1) {
                    allSiblings = parent.children();
                    var index = allSiblings.index(realNode) + 1;
                    if (index > 1) {
                        name += ':nth-child(' + index + ')';
                    }
                }

                path = name + (path ? '>' + path : '');
                node = parent;
            }

            return path;
        }

        function clickHandler(event) {
            var result = getPath(sQuery(event.target));
            sQuery(window).im(function(data) {
                if (window.result)
                    window.result.push('$this->clickSelectedElement("' + data.result + ':first")');
                else
                    window.result = ['$this->clickSelectedElement("' + data.result + ':first")'];
            }, undefined, {
                result: result
            });
        }

        window.document.addEventListener('click', clickHandler, true);
        ///////////////////////////////////////////////////////////////////////////////////
        function changeHandler(event) {
            var result = getPath(event);
            var value = event.val();
            sQuery(window).im(function(data) {
                if (window.result)
                    window.result.push('$this->setInputValue("' + data.result + ':first","' + data.value + '")');
                else
                    window.result = ['$this->setInputValue("' + data.result + ':first","' + data.value + '")'];
            }, undefined, {
                result: result,
                value: value
            });
        }

        jQuery(window.document).find('input').change("input", function() {
            changeHandler(jQuery(this))
        });
        //////////////////////////////////////////////////////////////////////////////////////
        function selectHandler(event) {
            var result = getPath(event);
            sQuery(window).im(function(data) {
                if (window.result)
                    window.result.push('$this->webdriver->selectOptionValue("' + data.result + ':first")');
                else
                    window.result = ['$this->webdriver->selectOptionValue("' + data.result + ':first")'];
            }, undefined, {
                result: result
            });
        }

        jQuery(window.document).find('select').change(function() {
            selectHandler(jQuery(this).find(':selected'));
        });
        ////////////////////////////////////////////////////////////////////////////////////////
    });

}
window.loadSmart=function(){
    $('.smartIframe').load(function() {
        window.smartSelector();
    });

}

/**
 * butona tiklandiginda eger kampanya var ise kampanya icin islem yap�labilecek kodlar yuklenir.
 */
window.searchCampaign=function() {
    var campId = Number(jQuery('#checkCampId').val());
    sQuery.cookie('insCampId',campId);
    sQuery('.smartIframe').pm(function (data) {
        if (sQuery('.sp-fancybox-iframe').exists()) {
            var campId = data.campId;
            sQuery(window).im(function (data) {
                if (window.result) window.result.push("$this->webdriver->waitForCamp(" + data.campId + ")");
                else window.result = ["$this->webdriver->waitForCamp(" + data.campId + ")"];
            }, undefined, {
                campId: campId
            });
            sQuery('.sp-fancybox-iframe').pm(function () {
                function getPath(element) {
                    var path, node = element;
                    while (node.length) {
                        var realNode = node[0],
                            name = realNode.localName;
                        if (!name) break;
                        name = name.toLowerCase();

                        var parent = node.parent();

                        var sameTagSiblings = parent.children(name);
                        if (sameTagSiblings.length > 1) {
                            allSiblings = parent.children();
                            var index = allSiblings.index(realNode) + 1;
                            if (index > 1) {
                                name += ':nth-child(' + index + ')';
                            }
                        }

                        path = name + (path ? '>' + path : '');
                        node = parent;
                    }

                    return path;
                }

                function clickHandler(event) {
                    var result = getPath(sQuery(event.target));
                    sQuery(window).pm(function (data) {
                        sQuery(window).im(function (data) {
                            if (window.result)
                                window.result.push('$this->clickSelectedElemntInIframe("' + data.result + ':first")');
                            else
                                window.result = ['$this->clickSelectedElemntInIframe("' + data.result + ':first")'];
                        }, undefined, {
                            result: data.result
                        });
                    }, undefined, {
                        result: result
                    });
                }

                window.document.addEventListener('click', clickHandler, true);

                function changeHandler(event) {
                    var result = getPath(event);
                    var value = event.val();
                    sQuery(window).pm(function (data) {
                        sQuery(window).im(function (data) {
                            if (window.result)
                                window.result.push('$this->setInputValueInIframe(".sp-fancybox-iframe","' + data.result + ':first","' + data.value + '")');
                            else
                                window.result = ['$this->setInputValueInIframe(".sp-fancybox-iframe","' + data.result + ':first","' + data.value + '")'];
                        }, undefined, {
                            result: data.result,
                            value: data.value
                        });
                    }, undefined, {
                        result: result,
                        value: value
                    });
                }

                jQuery(window.document).find('input').focusout("input", function () {
                    changeHandler(jQuery(this))
                });
                //////////////////////////////////////////////////////////////////////////////////////
                function selectHandler(event) {
                    var result = getPath(event);
                    sQuery(window).pm(function (data) {
                        sQuery(window).im(function (data) {
                            if (window.result)
                                window.result.push('$this->selectOptionValueInInfo("' + data.result + ':first")');
                            else
                                window.result = ['$this->selectOptionValueInInfo("' + data.result + ':first")'];
                        }, undefined, {
                            result: data.result
                        });
                    }, undefined, {
                        result: result
                    });
                }

                jQuery(window.document).find('select').change(function () {
                    selectHandler(jQuery(this).find(':selected'));
                });
            })
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            alert("Kampanya bulundu icerisinde islem yapip kayit edebilirsiniz.");
        } else
            alert("Kampanya bulunamadi!")
    }, undefined, {
        campId: campId
    });
}