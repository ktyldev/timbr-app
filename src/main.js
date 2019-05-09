function serverUrl() {
    return "./api/";
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

    function vote(dir) {
        var dismissedTree = trees[index];

        index++;

        var show = index < trees.length;
        if (!show) {
            setTreeCardsVisibility(false);
            return;
        }

        updateCard(trees[index]);

        var url = serverUrl() + "vote.php";
        $.post(url, {
            id:     dismissedTree.id,
            vote:   dir
        })
        .done(function () { console.log("voted successfully"); })
        .fail(function () { alert("voting unsuccessful"); });

        switch (dir) {
            case 1:
                console.log("upvoted tree " + dismissedTree.id);
                break;
            case -1:
                console.log("downboted tree " + dismissedTree.id);
                break;
            default:
                console.error("halp");
                break;
        }
    }

    function updateCard(tree) {
        console.log(tree);
        $("#tree-common-name").text(tree.commonname);  
        $("#tree-scientific-name").text(tree.scientificname);
        $("#tree-distance").text(tree.distance + " metres away");

        var rating = "this tree has no ratings yet - be the first!";
        if (tree.rating) {
            rating = tree.rating + "/5";
        }
        $("#tree-rating").text(rating);

        var pollution = "this tree has no pollution removal data, come back later!";
        if (tree.pollution) {
            pollution = tree.pollution + "g"; 
        }
        $("#tree-pollution").text(pollution);

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
    $("#upvote").click(() => vote(1));
    $("#downvote").click(() => vote(-1));

    // first load, nothing has been search yet so hide the cards 
    setTreeCardsVisibility(false);
});
