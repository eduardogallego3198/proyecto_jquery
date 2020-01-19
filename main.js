function obtenerResultados(textoBusqueda, pagina, tipo) {
    /*  */
    let resultados = [];
    $.getJSON("http://www.omdbapi.com/?apikey=21ecbf8f&type=" + tipo + "&s=" 
        + textoBusqueda + "&page=" + pagina, function(resultado) {
        $.each(resultado.Search, function(ind, val) {
            resultados.push(val);
        });
        mostrarResultados(resultados);
    });
}

function mostrarResultados(resultados) {
    $.each(resultados, function(ind, val) {
        $("#contenido").append("<div class='card col-6 col-sm-4 col-md-3 col-lg-2'>"
            + "<img src='" + val.Poster + "'class='card-img-top'>"
            + "<div class='card-body'>" + "<p class='card-text'>" + val.Title 
            + "</p></div>"+ "</div>");
    });
}

function scrollInfinito(pagina) {
    $(document).on('scroll', function() {
        if($(document).height() - $(document).scrollTop() < $(document).height() * 0.8) {
            obtenerResultados($("#busqueda").val(), ++pagina);
        }
    });
}

let pagina = 1;

$("#buscar").click(function() {
    $("#contenido").html("");
    if($("#peliculas:checked").val() == "on")
        obtenerResultados($("#busqueda").val(), pagina, "movie");
    else
        obtenerResultados($("#busqueda").val(), pagina, "series");
});

scrollInfinito(pagina);