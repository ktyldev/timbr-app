var server = "http://localhost:80";

function serverUrl() {
    return server + "/api/";
}

$(function() {
    function makeTrees(treeData) {
        console.log(treeData.count);
        for (var i = 0; i < treeData.count; i++) {
            var tree = treeData.trees[i];
            var name = tree.commonname;
            var distance = tree.distance;

            console.log(name + " is " + distance + " metres away");
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
