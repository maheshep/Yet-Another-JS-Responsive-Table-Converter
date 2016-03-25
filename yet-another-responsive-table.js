var newTable;
var newTableBody;
var oldTable;
var oldTableHeaders;
var k;
$(document).ajaxComplete(function() {
  console.log("Ajax Completed");
  $('.responsive-table:visible').each(function(i){
    $('.unresponsive-table-' + i).show();
    $('.responsive-table-' + i).remove();
  });
  renderResponsiveTable();
});
function renderResponsiveTable() {
  console.log("calling renderResponsiveTable");
  $('table:visible').each(function(i){
    /* create new table */
    newTable = $('<table>');
    oldTable = $(this);
    newTableBody = $('<tbody></tbody>');
    oldTableHeaders = {};
    oldTable.children('thead').children('tr').each(function(j){
      /* fetch the headers from first row and remove spaces and br */
      k = 0;
      $(this).children('th').each(function(){
        oldTableHeaders[k] = $(this).html().replace(/(?:&nbsp;|<br>)/g,' ');
        k++;
      });
      $(this).children('td').each(function(){
        oldTableHeaders[k] = $(this).html().replace(/(?:&nbsp;|<br>)/g,' ');
        k++;
      });
    });
    oldTable.children('tbody').children('tr').each(function(j){
      k = 0;
      if(j == 0 && $.isEmptyObject(oldTableHeaders)) {
        /* fetch the headers from first row of tbody and remove spaces and br */
        $(this).children('th').each(function(){
          oldTableHeaders[k] = $(this).html().replace(/(?:&nbsp;|<br>)/g,' ');
          k++;
        });
        $(this).children('td').each(function(){
          oldTableHeaders[k] = $(this).html().replace(/(?:&nbsp;|<br>)/g,' ');
          k++;
        });
      }
      else {
        /* If the column is colHeader */
        $(this).children('th').each(function(){
          /* create new rows */
          if(oldTableHeaders[k].trim() == "") {
              newTableBody.append($('<tr></tr>').append($('<th></th>').attr('colspan', 2).append($(this).html())));
          }
          else {
            newTableBody.append($('<tr></tr>').append($('<th></th>').append(oldTableHeaders[k])).append($('<th></th>').append($(this).html())).addClass('EvenRow'));
          }
          k++;
        });
        $(this).children('td').each(function(){
          /* create new rows */
          if(oldTableHeaders[k].trim() == "") {
              newTableBody.append($('<tr></tr>').append($('<td></td>').attr('colspan', 2).css('text-align', 'center').append($(this).html())));
          }
          else {
            newTableBody.append($('<tr></tr>').append($('<th></th>').append(oldTableHeaders[k])).append($('<td></td>').append($(this).html())).addClass('EvenRow'));
          }
          k++;
        });
        newTableBody.append($('<tr></tr>').append($('<td>&nbsp;</td>')));
      }
    });
    /* append newTable and hide oldTable */
    newTable.append(newTableBody);
    $('.responsive-table-' + i).remove();
    newTable.addClass('responsive-table-' + i);
    newTable.addClass('responsive-table');
    oldTable.addClass('unresponsive-table-' + i);
    oldTable.addClass('unresponsive-table');
    newTable.css('display', 'none');
    newTable.css('width', '100%');
    oldTable.after(newTable);
    $(window).resize();
  });
}
$(window).resize(function() {
  $('.unresponsive-table').each(function(i){
    $(this).show();
    if($(this).parent().get(0).scrollWidth > $(this).parent().get(0).clientWidth) {
      $('.unresponsive-table-' + i).hide();
      $('.responsive-table-' + i).show();
    } else {
      $('.responsive-table-' + i).hide();
      $('.unresponsive-table-' + i).show();
    }
});
});
renderResponsiveTable();
