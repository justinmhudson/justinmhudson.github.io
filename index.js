window.addEventListener('load', convert);

// API to convert Google Sheet to JSON taken from here: https://github.com/benborgers/opensheet#readme
// JS to convert JSON to HTML table taken from here: https://www.tutorialspoint.com/how-to-convert-json-data-to-a-html-table-using-javascript-jquery

function convert() {
   fetch('https://opensheet.elk.sh/1Z5EQYdTPNFcXeprpHtMC5HAr0T-HitPwWWYS3hHzpiY/Sheet1')
      .then(response => response.json())
      .then(data => {
         // Get the container element where the table will be inserted
         var container = document.getElementById("player-table");
    
         // Create the table element
         var table = document.createElement("table");
         
         // Get the keys (column names) of the first object in the JSON data
         var cols = Object.keys(data[0]);
         
         // Create the header element
         var thead = document.createElement("thead");
         var tr = document.createElement("tr");
         
         // Loop through the column names and create header cells
         cols.forEach((item, i) => {
            var th = document.createElement("th");
            th.setAttribute("onclick", "sortTable" + "(" + i + ")");
            th.innerText = item; // Set the column name as the text of the header cell
            tr.appendChild(th); // Append the header cell to the header row
         });
         thead.appendChild(tr); // Append the header row to the header
         table.append(tr) // Append the header to the table
         
         // Loop through the JSON data and create table rows
         data.forEach((item) => {
            var tr = document.createElement("tr");
            
            // Get the values of the current object in the JSON data
            var vals = Object.values(item);
            
            // Loop through the values and create table cells
            vals.forEach((elem) => {
               var td = document.createElement("td");
               td.innerText = elem; // Set the value as the text of the table cell
               tr.appendChild(td); // Append the table cell to the table row
            });
            table.appendChild(tr); // Append the table row to the table
         });
         container.appendChild(table) // Append the table to the container element
      }); 
}


//sort function taken from: https://www.w3schools.com/howto/howto_js_sort_table.asp

function sortTable(n) {
   var table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
   table = document.getElementById("player-table");
   switching = true;
   // Set the sorting direction to ascending:
   dir = "asc";
   /* Make a loop that will continue until
   no switching has been done: */
   while (switching) {
     // Start by saying: no switching is done:
     switching = false;
     rows = table.rows;
     /* Loop through all table rows (except the
     first, which contains table headers): */
     for (i = 1; i < (rows.length - 1); i++) {
       // Start by saying there should be no switching:
       shouldSwitch = false;
       /* Get the two elements you want to compare,
       one from current row and one from the next: */
       x = rows[i].getElementsByTagName("TD")[n];
       y = rows[i + 1].getElementsByTagName("TD")[n];
       /* Check if the two rows should switch place,
       based on the direction, asc or desc: */
       if (dir == "asc") {
         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
           // If so, mark as a switch and break the loop:
           shouldSwitch = true;
           break;
         }
       } else if (dir == "desc") {
         if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
           // If so, mark as a switch and break the loop:
           shouldSwitch = true;
           break;
         }
       }
     }
     if (shouldSwitch) {
       /* If a switch has been marked, make the switch
       and mark that a switch has been done: */
       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
       switching = true;
       // Each time a switch is done, increase this count by 1:
       switchCount ++;
     } else {
       /* If no switching has been done AND the direction is "asc",
       set the direction to "desc" and run the while loop again. */
       if (switchCount == 0 && dir == "asc") {
         dir = "desc";
         switching = true;
       }
     }
   }
 }

