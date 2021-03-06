
function peopleResults(sort){
	$.getJSON( "js/people.json", function( data ) {
		var people = [], favorites = [];

		var cookie = $.cookie("favCookie");

		if(typeof cookie != 'undefined') {
			var cookie_vals = cookie.split(",");
			favorites = cookie_vals;
		} else {
			$.cookie("favCookie", "temp");
		}

		$.each( data.people, function( i, val ) {
			people.push( val );
		});

		people.sort(function(a, b){
		    return b.id - a.id;
		});

		if (sort === "old") {
			people.sort(function(a, b){
			    return a.id - b.id;
			});
		}
		
		$("#search_results").html("");

		$.each( people, function( i ) {
			var pID = people[ i ].id;
			var pName = people[ i ].name;
			var pLocation = people[ i ].location;
			var pPictureURL = people[ i ].picture;
			var pInterests = people[ i ].interests;

			JSON.stringify(pInterests);

			var pInterests_list = pInterests.split(",");

			$("<div class='person_card' id='" + pID + "' data-ID='" + pID + "'><div class='favorite icon-star'></div></div>").appendTo("#search_results");

			$("<div class='card_header'></div>").appendTo("#" + pID);

			if (pPictureURL === "") {
				$("<img class='photo' src='img/nopic.png'>").appendTo("#" + pID + " div.card_header");
			} else {
				$("<img class='photo' src='" + pPictureURL + "' onerror='this.src=\"img/nopic.png\"'>").appendTo("#" + pID + " div.card_header");
			}

			$("<h2 class='name'>" + pName + "</h2>").appendTo("#" + pID + " .card_header");
			$("<h3 class='location'><i class='icon-location'></i>" + pLocation + "</h3>").appendTo("#" + pID + " .card_header");
			$("<h3 class='interests_header'>Interests</h2>").appendTo("#" + pID);
			$("<div class='interests_list'><ul></ul></div>").appendTo("#" + pID);
			$.each( pInterests_list, function( interest ) {
				$("<li>" + pInterests_list[interest] + "</li>").appendTo("#" + pID + " .interests_list ul");
				var interests_content = $("#" + pID + " .interests_list ul").text().length;
				if (interests_content > 60){
					$("#" + pID + " .interests_list ul").addClass("long");
					console.log(pID + ": " + interests_content);
				}
			});

		});

		//let's set the favorites
		$.each( cookie_vals, function(star) {
			if (cookie_vals[star] != "") {
				$("#" + cookie_vals[star] + " .favorite").addClass("favorited");
			}
		});

		$( ".favorite" ).click( function() {
			var favID = $(this).parent().data( "id" );
			var index = favorites.indexOf(favID);

			if ($(this).hasClass( "favorited" )) {
				$(this).removeClass( "favorited" );
				favorites.splice(index, 1);
				$.cookie("favCookie", favorites);
			} else {
				$(this).addClass( "favorited" );
				favorites.push(favID);
				$.cookie("favCookie", favorites);
			}
		});
	});

}

$(document).ready(function(){
//	$.removeCookie('favCookie');

	peopleResults();

	$( "#sort_order" ).change(function() {
		peopleResults($( "#sort_order" ).val());
	});

});
 