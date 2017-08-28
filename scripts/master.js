//=== create a version of contains that ignores case ==========================================

jQuery.expr[":"].contains_ignore_case = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
