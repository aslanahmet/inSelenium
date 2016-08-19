/**
 * Created by DELL1 on 3.2.2016.
 */
var SaveTest=function (testName) {
    this.testCode=jQuery('#testCase').val();
    this.testName=testName;
}
SaveTest.prototype.save=function () {
    jQuery.ajax({
        type: "POST",
        url: location.protocol + "//" + location.host + "/webSelenium/panel/php/savetest.php",
        //url:"localhost/webSelenium/panel/php/savetest.php",
        data: {
            testCode: this.testCode,
            testName: this.testName,
            campId: 1,
        },
        success: function (veri) {
            alert("Test Kaydedildi!");
        }
    });
}
var data={
    saveTest : function(){
        var campId=null;
        if(sQuery.cookie('insCampId') != null)
            campId=Number(sQuery.cookie('insCampId'));
        else
            campId=0;
        var testName=jQuery('.form-control:first').val();
        var testCode="";
        if(window.result) {
            window.result.forEach(function (code) {
                testCode += code + ";";
            });
            jQuery.ajax({
                type: "POST",
                url: location.protocol + "//" + location.host + "/webSelenium/panel/php/savetest.php",
                //url:"localhost/webSelenium/panel/php/savetest.php",
                data: {
                    testCode: testCode,
                    testName: testName,
                    campId: campId,
                },
                success: function (veri) {
                    alert("Test Kaydedildi!");
                }
            });
        }
        else
            alert("Hicbir islem gerceklestirmediniz?");
    }
}
$( document ).ready(function() {
    jQuery('#saveTest').click(function () {
        var saveTest=new SaveTest(jQuery('#testName').val());
        saveTest.save();
    })
    var inSelenium={
        saveTest : function(){
            var campId=null;
            if(sQuery.cookie('insCampId') != null)
             campId=Number(sQuery.cookie('insCampId'));
            else
             campId=0;
            var testName=jQuery('.form-control:first').val();
            var testCode="";
            if(window.result) {
                window.result.forEach(function (code) {
                    testCode += code + ";";
                });
                jQuery.ajax({
                    type: "POST",
                    url: location.protocol + "//" + location.host + "/webSelenium/panel/php/savetest.php",
                    //url:"localhost/webSelenium/panel/php/savetest.php",
                    data: {
                        testCode: testCode,
                        testName: testName,
                        campId: campId
                    },
                    success: function (veri) {
                        alert("Test Kaydedildi!");
                    }
                });
            }
            else
                alert("Hicbir islem gerceklestirmediniz?");
        }

    }

    jQuery('#saveSmartTest').click(function(){
        inSelenium.saveTest();
    });

    jQuery('#insChecBox').change(function(){
        if(jQuery(this).is(":checked"))
        jQuery('#searchTest').css('display','block');
        else
            jQuery('#searchTest').css('display','none');
    });

});


