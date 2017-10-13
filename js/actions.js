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
        navigator.geolocation.getCurrentPosition(
            function (pocicion) {
                var cve = $("#cve").val();
                var LatitudCarga = pocicion.coords.longitude;
                var LongitudCarga = pocicion.coords.latitude;

                //$.ajax({
                //    url: "http://localhost:16125/Service1.svc/" + "RegistraBitacora",
                //    data: { Clave: cve, Latitud: LatitudCarga, Longitud: LongitudCarga},
                //    // data: { usuario : "LUISL" , latitud: LatitudComida , longitud : LongitudComida , idComidaReparto : 0},
                //    type: "GET",
                //    timeout: 3,
                //    contentType: "application/json; charset=utf-8",
                //    dataType: "jsonp",
                //    success: function (data) {
                //        $.mobile.loading('hide');
                //        alert("Buen Viaje");
                //    },
                //    error: function (err) {
                //        $.mobile.loading('hide');
                //        alert("Revise su conex�n a internet y vuelva a intentarlo");
                //    }
                //});
                //alert(LatitudCarga);
            });

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
