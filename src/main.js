var server = "http://localhost:80";


function serverUrl() {
    return server + "/api/";
}

$(function() {

    var index = 0;
    var count = 0;
    var trees = [];

    function setTreeCardsVisibility(visibility) {
        var cardElements = [
            $("#swipe-left"),
            $("#swipe-right"),
            $("#tree-card")
        ];

        for (var i = 0; i < cardElements.length; i++) {
            var e = cardElements[i];
            if (visibility) {
                e.show(); 
            } else {
                e.hide();
            }
        }

        if (visibility) {
            $("#tree-cards-empty").hide(); 
        } else {
            $("#tree-cards-empty").show();
        }
    }

    function swipe() {
        index++;

        var show = index < trees.length;
        if (!show) {
            setTreeCardsVisibility(false);
            return;
        }

        updateCard(trees[index]);
    }

    function updateCard(tree) {
        console.log("showing tree " + tree.id);
        $("#tree-common-name").text(tree.commonname);  
        $("#tree-scientific-name").text(tree.scientificname);
        $("#tree-distance").text(tree.distance + " metres away");

        var rating = "this tree has no ratings yet - be the first!";
        if (tree.rating) {
            rating = tree.rating + "/5";
        }
        $("#tree-rating").text(rating);

        $("#tree-pollution").text(null + "");
        $("#tree-quote").text('"i guess you could say im branching out"');
    }

    function makeTrees(treeData) {

        trees = [];

        setTreeCardsVisibility(treeData.count != 0);

        for (var i = 0; i < treeData.count; i++) {
            trees.push(treeData.trees[i]);
        }

        updateCard(trees[0]);
    }

    function search() {

        var postcode = $("#postcode").val();
        var radius = $("#radius").val();

        postcode = postcode.replace(" ", "");

        var url = serverUrl() + "search.php?postcode=" + postcode + "&radius=" + radius;
        $.get(url)
            .done(makeTrees)
            .fail(function(status) { alert(":("); });
    }

    // add handlers
    $("#searchButton").click(search);
    $("#swipe-left").click(swipe);
    $("#swipe-right").click(swipe);

    // first load, nothing has been search yet so hide the cards 
    setTreeCardsVisibility(false);
});
