//var UrlWCF = "http://localhost:8732/Design_Time_Addresses/HNTService/Service1/";
var UrlWCF = "http://192.168.2.100:70/WS/HNTService.Service1.svc/";
var ms = '';
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 1000
};

var fn = {
    init: function (){
        /*if(!fn.estadoRegistro())
            window.location.href = "#reg";
        else
            window.location.href = "#home";
        */
        $('#btnEnviar').on('click', fn.getUtilidad);
        // $('#txtPrecio').on('click', fn.getPrice);

    },
    
    deviceready: function(){
        //document.addEventListener("load", fn.init, false);
       // window.addEventListener("deviceready", fn.init, false);
        window.addEventListener("load", fn.init, false);
        //navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },

    getUtilidad: function (){
        navigator.geolocation.getCurrentPosition(success, error, options);
        //    //function (pocicion) {
        //    //    var cve = $("#cve").val();
        //    //    var LatitudCarga = pocicion.coords.latitude;
        //    //    var LongitudCarga = pocicion.coords.longitude;
        //    //    $.ajax({
        //    //        url: "http://localhost:8732/Design_Time_Addresses/HNTService/Service1/RegistraBitacora",
        //    //        data: { clave: cve, latitud: LatitudCarga, longitud: LongitudCarga},
        //    //        // data: { usuario : "LUISL" , latitud: LatitudComida , longitud : LongitudComida , idComidaReparto : 0},
        //    //        type: "GET",
        //    //        //timeout: 10000,
        //    //        contentType: "application/json; charset=utf-8",
        //    //        dataType: "jsonp",
        //    //        success: function (data) {
        //    //           // $.mobile.loading('hide');
        //    //            alert(data);
        //    //        },
        //    //        error: function (err) {
        //    //            //$.mobile.loading('hide');
        //    //            alert("Revise su conex�n a internet y vuelva a intentarlo");
        //    //        }
        //    //    });

        //    //});
        //    success, error, options
        //);

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

function success(pocicion) {
    var cve = $("#cve").val();
    var LatitudCarga = pocicion.coords.latitude;
    var LongitudCarga = pocicion.coords.longitude;
    $.ajax({
        url: UrlWCF + "RegistraBitacora",
        data: { clave: cve, latitud: LatitudCarga, longitud: LongitudCarga},
        // data: { usuario : "LUISL" , latitud: LatitudComida , longitud : LongitudComida , idComidaReparto : 0},
        type: "GET",
        //timeout: 10000,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            // $.mobile.loading('hide');
            alert(data);
        },
        error: function (err) {
            //$.mobile.loading('hide');
            alert("Revise su conex�n a internet y vuelva a intentarlo");
        }
    });
    //console.log('Your current position is:');
    //console.log('Latitude : ' + crd.latitude);
    //console.log('Longitude: ' + crd.longitude);
    //console.log('More or less ' + crd.accuracy + ' meters.');
};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};

$(fn.deviceready);
