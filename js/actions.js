var fn = {
    init: function (){
        /*if(!fn.estadoRegistro())
            window.location.href = "#reg";
        else
            window.location.href = "#home";
        */
        $('#btnEnviar').on('click', fn.OnSuccess);
        // $('#txtPrecio').on('click', fn.getPrice);

    },
    
    deviceready: function(){
        //document.addEventListener("load", fn.init, false);
       // window.addEventListener("deviceready", fn.init, false);
        window.addEventListener("load", fn.init, false);
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },

    onSuccess: function (position) {
        alert('hola pemiijumo');
    //    var element = document.getElementById('geolocation');
    //    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
    //'Longitude: ' + position.coords.longitude + '<br />' +
    //'Altitude: ' + position.coords.altitude + '<br />' +
    //'Accuracy: ' + position.coords.accuracy + '<br />' +
    //'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
    //'Heading: ' + position.coords.heading + '<br />' +
    //'Speed: ' + position.coords.speed + '<br />' +
    //'Timestamp: ' + position.timestamp + '<br />';
    },
    onError: function () {
        alert('error');
    },

    getUtilidad: function (){
        //alert ("Hola pemijumo");
        //var onSuccess = function (position) {
        //    alert('Latitude: ' + position.coords.latitude + '\n' +
        //        'Longitude: ' + position.coords.longitude + '\n' +
        //        'Altitude: ' + position.coords.altitude + '\n' +
        //        'Accuracy: ' + position.coords.accuracy + '\n' +
        //        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        //        'Heading: ' + position.coords.heading + '\n' +
        //        'Speed: ' + position.coords.speed + '\n' +
        //        'Timestamp: ' + position.timestamp + '\n');
        //};

    },

    getPrice: function (){
        var dUtilidad  = $("#txtUtilidad").val();
        var ItemCode  = $("#txtItemCode").val();

        if(dUtilidad  != "")
            fn.CalcPrice(ItemCode, dUtilidad);
    },

    getListaPecios: function(){
    },

    getStocks: function (){

    },

    CalcPrice: function(pItemCode, pUtilidad) {
        $.ajax({
            type: "POST",
            url: "http://192.168.2.204:90/CS.aspx/GetPrice",
            //data: { ItemCode: pItemCode, Utilidad: pUtilidad },
            data: "{ItemCode: '" + pItemCode + "', Utilidad: " + pUtilidad +"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: fn.OnSuccess,
            error: fn.OnError
        });
    },

    OnSuccess: function(response) {
        $('#txtPrecio').val(response.d);
    },
    OnError: function(response) {
        alert("Error connection: " + response.d);
    }
}

$(fn.deviceready);
