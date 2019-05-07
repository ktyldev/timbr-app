var server = "http://localhost:80";

function serverUrl() {
    return server + "/api/";
}

$(function() {
    function makeTrees(treeData) {

        var root = $("#searchResults");
        root.empty();

        console.log(treeData.count);
        for (var i = 0; i < treeData.count; i++) {
            var tree = treeData.trees[i];
            var name = tree.commonname;
            var distance = tree.distance;

            root.append("<li>" + name + " is " + distance + " metres away</li>");
        }
    }

    function search() {

        var postcode = $("#postcode").val();
        var radius = $("#radius").val();

        postcode = postcode.replace(" ", "");

        $.get(serverUrl() + "search.php?postcode=" + postcode + "&radius=" + radius)
            .done(makeTrees)
            .fail(function(status) { alert(":("); });
    }

    $("#searchButton").click(search);
});
