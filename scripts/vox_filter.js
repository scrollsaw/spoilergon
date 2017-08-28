

//===============================================================================================

function hideContent(parentElement){

  chrome.storage.sync.get({'filters':[]},
    function(items){
      var filters_array = items['filters'];
      if (filters_array != null) {
        var i = 0;
        for (i = 0; i < filters_array.length; i++){

          var strTag = filters_array[i].filters[0];
          var strAuthor = filters_array[i].filters[1];
          var strSearch = filters_array[i].filters[2];



          // entry-box
          hide_Block(
            parentElement,
            strTag,
            "li[class='c-entry-box--compact__label-primary']:contains_ignore_case('" + strTag + "')",
            "div[data-chorus-optimize-module='entry-box']",
            strAuthor,
            "span[class='c-byline__item']:contains_ignore_case('" + strAuthor + "')",
            "div[data-chorus-optimize-module='entry-box']",
            strSearch,
            "h2:contains_ignore_case('" + strSearch + "')",
            "p[data-chorus-optimize-field='dek']:contains_ignore_case('" + strSearch + "')",
            "div[data-chorus-optimize-module='entry-box']",
            false
          );


        }
      }
    });
};

//--------------------------------------------------------------------------------------------------------------------------------------
function hide_Block(parentElement, strTag, strTagFind, strTagHide, strAuthor, strAuthorFind, strAuthorHide, strSearch, strSearchFind, strSearchFind2, strSearchHide, bolHideNav){

  var matchedTagElements, matchedAuthorElements, matchedsearchElements, elementsToHide

  elementsToHide = $();

  if(strTag != '') {

    matchedTagElements = parentElement.find(strTagFind).closest(strTagHide);

    if (elementsToHide.length > 0){
      elementsToHide = elementsToHide.filter(matchedTagElements);
    }
    else {
      elementsToHide = matchedTagElements;

    }
  }

  //------------------------------
  if (strAuthor != '') {

    matchedAuthorElements = parentElement.find(strAuthorFind).closest(strAuthorHide);

    if (elementsToHide.length > 0){
      elementsToHide = elementsToHide.filter(matchedAuthorElements);
    }
    else {
      elementsToHide = matchedAuthorElements;

    }
  }

  //------------------------------
  if (strSearch != '') {
    if (strSearchFind2 != ''){
      matchedsearchElements = parentElement.find(strSearchFind).closest(strSearchHide)
        .add(parentElement.find(strSearchFind2).closest(strSearchHide))
    }
    else {
        matchedsearchElements = parentElement.find(strSearchFind).closest(strSearchHide)
    }

    if (elementsToHide.length > 0){
      elementsToHide = elementsToHide.filter(matchedsearchElements);
    }
    else {
      elementsToHide = matchedsearchElements;

    }
  }

  if (elementsToHide.length > 0){

    if (bolHideNav){
      hideNavElements(elementsToHide);
    }else {
      hideElements(elementsToHide);
    }

  }
}

//----------------------------------------------------------------------------------------------------------------------------------------------
function hideElements(elementsToHide){

  console.log("2");
  console.log(elementsToHide);
  elementsToHide.css({"background-color": "#4c4e4d"});
  elementsToHide.css({"background-image": "none"});
  elementsToHide.removeAttr("data-original"); // removes lazy loading, would overide background image = none
  elementsToHide.children().css({"visibility": "hidden"});
  elementsToHide.find($("q")).css({"visibility": "hidden"});
  elementsToHide.find($("a")).removeAttr('href');


}
//----------------------------------------------------------------------------------------------------------------------------------------------
function hideNavElements(elementsToHide){

  elementsToHide.css({"background-image": "none"});
  elementsToHide.removeAttr("data-original"); // removes lazy loading, would overide background image = none
  elementsToHide.children().css({"visibility": "hidden"});
  elementsToHide.find($("a")).removeAttr('href');

}

// === OBSERVERS ======================================================================

// var nav_observer = new MutationObserver(function(mutations) {
//   mutations.forEach(function(mutation) {
//     if (mutation.target == $("div[class='m-nav-dropdown__pane']").get(0)) {
//       hideContent($(mutation.target));
//     }
//   });
// });
//
// // Configuration of the observers
// var config = {childList: true, subtree: true };
//
// nav_observer.observe($("div[class='m-nav-dropdown__pane']").get(0), config);
// //=================================================================================================================================


hideContent($(document)); //initial call on load
