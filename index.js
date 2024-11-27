function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";
}

function fetchJSONData() {
    fetch('./testdata.json')
    .then((response) => response.json())
    .then((json) => console.log(json));
}