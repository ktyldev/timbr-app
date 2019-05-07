var server = "http://localhost:80";


function serverUrl() {
    return server + "/api/";
}

$(function() {

    var index = 0;
    var count = 0;
    var trees = [];

    function swipe()
    {
        index++;
        updateCard(trees[index]);
    }

    function updateCard(tree) {
        console.log(tree);

        $("#tree-name").text(tree.name);  
        $("#tree-info").text(tree.distance + " metres away");
    }

    function makeTrees(treeData) {

        trees = [];

        for (var i = 0; i < treeData.count; i++) {
            var tree = treeData.trees[i];
            trees.push({
                name:       tree.commonname,
                distance:   tree.distance
            });
        }

        updateCard(trees[0]);
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
    $("#swipe-left").click(swipe);
    $("#swipe-right").click(swipe);
});
