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
         cols.forEach((item) => {
            var th = document.createElement("th");
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
