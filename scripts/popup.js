


$(document).ready(
    function(){


      // ===== FUNCTIONS========================================================
      function addItem(indexToAdd,filters,enabled){

          //$('ol').append('<li id =' +   indexToAdd + ' >' + filters[0] + ',' + filters[1] + ',' + filters[2] + '</li>');
          var strFilterToAppend = '<li id =' +   indexToAdd + ' >'
          if (filters[0] != ''){
            strFilterToAppend = strFilterToAppend + '<div class="tagfilter">' + filters[0] + '</div>';
          }
          if (filters[1] != ''){
            strFilterToAppend = strFilterToAppend + '<div class="authorfilter">' + filters[1] + '</div>';
          }
          if (filters[2] != ''){
            strFilterToAppend = strFilterToAppend + '<div class="searchfilter">' + filters[2] + '</div>';
          }

          strFilterToAppend = strFilterToAppend + '</li>';

          $('ol').append(strFilterToAppend);

      };

      // -----------------------------------------------------------------

      function loadFilters(){

        $('ol').empty();

        chrome.storage.sync.get({'filters':[]},
          function(items){
            var filters_array = items['filters'];
            if (filters_array != null) {
              var i = 0;
              for (i = 0; i < filters_array.length; i++){
                addItem(i,filters_array[i].filters,filters_array[i].enabled);
              }
            }
          }
        );



      };

      // -----------------------------------------------------------------
      function addFilter(){

        var tagItemFilter = $('input[name=TagItem]').val();
        var authorItemFilter = $('input[name=AuthorItem]').val();
        var searchItemFilter = $('input[name=SearchItem]').val();


        var new_filter = {filters:[tagItemFilter,authorItemFilter,searchItemFilter],enabled: false};

        chrome.storage.sync.get({'filters':[]},
          function(items){
           var filters_array = items['filters'];

            filters_array.push(new_filter)

            chrome.storage.sync.set({'filters':filters_array});

            addItem(filters_array.length-1,new_filter.filters,new_filter.enabled);

          });

      };

      // -----------------------------------------------------------------

      function removeItem(i){
           chrome.storage.sync.get({'filters':[]},
             function(items){
               var filters_array = items['filters'];

               if (filters_array != null) {
                 filters_array.splice(i,1);
                 chrome.storage.sync.set({'filters':filters_array});
                 loadFilters();
               }
             });
      };

      // ===== HOOKUPS========================================================
       $('#button').click(
         function(){
           addFilter();
           $('input[name=TagItem]').val('');
           $('input[name=AuthorItem]').val('');
           $('input[name=SearchItem]').val('');
        });



      $(document).on('dblclick','li', function(){
        removeItem($(this).attr("id"));

      });



      $('#clear').click(
        function(){
        //  localStorage.clear();
          chrome.storage.sync.clear();
          $('ol').empty();
        });

        $('#help').click(
          function(){
            chrome.tabs.create({
              url: '/help.html'
            });
          });


      // =====================================================================

    loadFilters();

    }



);
