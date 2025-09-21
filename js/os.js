(function (window, Constructor, undefined) {
  DRSAX_INIT = {};
  var RequiredDataCheck = function () {
    requiredDataCheckObj = this;
  };
  RequiredDataCheck.prototype = {
    checkHttpsForMediaStream: function (stringUrl) {
      var regularExpressionUrl =
        /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regularExpressionUrl.test(stringUrl);
    },
    getLocationHref: function () {
      return document.location.href;
    },
    getUserInfo: function () {
      requiredDataCheckObj.getJquery();
      DRSAX_INIT.OS = navigator.userAgent.toLowerCase();
    },
    getJquery: function () {
      var head = document.getElementsByTagName("head")[0];
      var script = document.createElement("script");

      script.type = "text/javascript";
      script.src =
        "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
      head.appendChild(script);
    },

    getTotalCount: function () {
      $.get(
        "https://antaresax.cafe24.com/app/api/drsaxtuto/getTotalCount",
        function (data, status) {
          if (status === "success") {
            TOTAL_COUNT = data.user_count;
            $("#getCount").text(TOTAL_COUNT);
            console.log(TOTAL_COUNT);
          }
        }
      );
    },
  };
  (function () {
    requiredDataCheck = new RequiredDataCheck();
    requiredDataCheck.getUserInfo();
    if (
      !requiredDataCheck.checkHttpsForMediaStream(
        requiredDataCheck.getLocationHref()
      )
    ) {
      console.error(
        ">>>>>> http is not able MediaStream  " +
          requiredDataCheck.getLocationHref()
      );
    } else {
      console.warn(
        ">>>>>> https is able MediaStream  " +
          requiredDataCheck.getLocationHref()
      );
    }
  })();
})(window);
