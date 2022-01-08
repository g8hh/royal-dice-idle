/*
	(c) KONGREGATE API for GameMaker:Studio 2 (v1.0)

--	Written by Stephen Tresler (February 12, 2018)
--	Feel free to redistribute this extension.
	
*/

var version = "1.0";

function kongGetAPI() {
	try {
		if (typeof parent.kongregate === 'undefined') {
			throw "APIUndefinedException";
		}
		return (parent.kongregate);
	} catch (e) {
		if (e = "APIUndefinedException") {
			logError();
		}
		return -1;
	}
}

function kongInit() {

	// Connect to Kongregate
	try {
		parent.kongregate.services.connect();
		console.log("GameMaker:Studio 2 (KongAPI v"+version+" by Trezla) - Initialised Kongregate API successfully!");
		console.log("GameMaker:Studio 2 (KongAPI v"+version+" by Trezla) - Connected to Kongregate services!");
	} catch(e) {
		console.error("GameMaker:Studio 2 (KongAPI v"+version+" by Trezla) - ERROR! Kongregate API not initialised!");
		console.error("GameMaker:Studio 2 (KongAPI v"+version+" by Trezla) - You are not playing on kongregate.com!");
		return -1;
	}
};

function logError() {
	console.error("GameMaker:Studio 2<KongAPI Extension "+version+" by Afrodynamics> - Kongregate API not loaded!");
	console.error("Play the game on Kongregate's website in a preview window to avoid this error.");
};

 // -------------- GENERAL KONGREGATE FUNCTIONS --------------
 
function kongSubmitStat(argument0, argument1) {
	// arg0 = String (stat name)
	// arg1 = Number (stat)
	try {
		kongregate = kongGetAPI();
		kongregate.stats.submit(argument0, argument1);
		return 1;
	} catch(e) {
		logError();
		return -1;
	}
};

function kongGetUsername() {
	try {
		return kongGetAPI().services.getUsername();
	} catch(e) {
		logError();
		return "";
	}
};

function kongGetUserID() {
	try {
		var id = kongGetAPI().services.getUserID();
		console.log( id );
		if ( id == 0 ) {
			return ""
		} else {
			return id;
		}
	} catch (e) {
		logError();
		return "";
	}
}

function kongIsGuest() {
	try {
		if (kongGetAPI().services.isGuest()) {
			return 1;
		}
		else {
			return 0;
		}
	} catch(e) {
		logError();
		return -1;
	}

};

function kongShowRegistrationBox() {
	try {
		if (kongIsGuest()) {
			kongGetAPI().services.showRegistrationBox();
			return 1;
		} else {
			return 0;
		}
	} catch (e) {
		logError();
		return -1;
	}
}

// ----------- KONGREGATE CHAT API FUNCTIONS -------------

function kongChatDisplayMessage(argument0, argument1) {
	// arg0 = message, arg1 = username
	try {
		kongGetAPI().chat.displayMessage(argument0, argument1);
	} catch(e) {
		logError();
		return -1;
	}
}

function kongChatClearMessages() {
	try {
		kongGetAPI().chat.clearMessages();
		return 1;
	} catch(e) {
		logError();
		return -1;
	}
}

function kongChatShowTab(argument0, argument1, argument2) {
	// arg0 - Name of the tab (word in tab itself)
	// arg1 - Description of the tab
	// arg2 - Relative size of the canvas, 0 being the smallest, 1 being the largest (default 0.5)
	try {
		kongGetAPI().chat.showTab(argument0, argument1, {size:argument2});
		return 1;
	} catch (e) {
		logError();
		return -1;
	}
}

function kongChatCloseTab() {
	try {
		kongGetAPI().chat.closeTab();
		return 1;
	} catch (e) {
		logError();
		return -1;
	}
}

// -------------- GENERAL KONGREGATE CLIENT FUNCTIONS --------------

function showFeedPostBox(argument0 , argument1) {
	// arg0 - Content of the news feed post
	// arg1 - Image URI to be displayed in the post (including format .png)
	try {
		kongregate = kongGetAPI();
		if (!kongIsGuest()){
			kongregate.services.showFeedPostBox({content: argument0,image_uri: argument1});
			return 1;
		} else {
			return 0;
		}
	} catch(e) {
		logError();
		return -1;
	}
};

function showInvitationBox(argument0 , argument1) {
	// arg0 - Content of the invitation message
	// arg1 - Filter of the invitation ('played', 'not_played' selects users from either category)
	try {
		kongregate = kongGetAPI();
		if (!kongIsGuest()){
			kongregate.services.showInvitationBox({content: argument0,filter: argument1});
			return 1;
		} else {
			return 0;
		}
	} catch(e) {
		logError();
		return -1;
	}
};

function showShoutBox(argument0) {
	// arg0 - Content of the shout
	try {
		kongregate = kongGetAPI();
		if (!kongIsGuest()){
			kongregate.services.showShoutBox(argument0);
			return 1;
		} else {
			return 0;
		}
	} catch(e) {
		logError();
		return -1;
	}
};

// showKredPurchaseDialog
function showKredPurchaseDialog(argument0) {
	// arg0 - Filter of the box, what to show by default ('offers', 'mobile', 'default')
	try {
		kongregate = kongGetAPI();
		if (!kongIsGuest()){
			kongregate.mtx.showKredPurchaseDialog(argument0);
			return 1;
		} else {
			return 0;
		}
	} catch(e) {
		logError();
		return -1;
	}
};

function privateMessage(argument0) {
	// arg0 - Content of the private message
	try {
		kongregate = kongGetAPI();
		if (!kongIsGuest()){
			kongregate.services.privateMessage({content: argument0});
			return 1;
		} else {
			return 0;
		}
	} catch(e) {
		logError();
		return -1;
	}
};