var language;
var itemCount = 0;
var map;
var lastLocation = 0;
var recording = false;

function changeLanguage(lang){
	switch(lang){
		case "es":
			language = LANG_ES;
			break;
		case "en":
			language = LANG_EN;
			break;
	}
}

function createMenu(){
	var menu = document.getElementById('menu');
	
	// Crear Menú
	var menuDiv = document.getElementById('menuDiv');
	menuDiv.innerHTML = "";
	
	var option1 = document.createElement('div');
	option1.className = 'option-div';	
	
	var option1Text = document.createElement('span');
	option1Text.className = 'option-text';
	option1Text.innerHTML = language.COMMON[0];
	
	option1.addEventListener('click', function(event) {
		guide(lastLocation, event);
	}, false);
	
	var option2 = document.createElement('div');
	option2.className = 'option-div';
	
	option2.addEventListener('click', listItems, false);
	
	var option2Text = document.createElement('span');
	option2Text.className = 'option-text';
	option2Text.innerHTML = language.COMMON[1];
	
	var option3 = document.createElement('div');
	option3.className = 'option-div';
	
	
	// Crear el input de tipo checkbox
	var option3ListInput = document.createElement('input');
	option3ListInput.setAttribute('type', 'checkbox');
	option3ListInput.setAttribute('id', 'section-list');
	option3ListInput.classList.add('section-menu-input');

	// Crear el menú de secciones
	var sectionMenuDiv = document.createElement('div');
	sectionMenuDiv.setAttribute('id', 'section-menu');
	sectionMenuDiv.classList.add('section-menu-div');
	
	for(i=0;i<LOCATION.length;i++){
		var section = document.createElement('div');
		section.className = "section-menu-item";
		
		section.sectionId = i;
		section.addEventListener('click', goToSection, false);
		
		var sectionNameText = document.createElement('span');
		sectionNameText.innerHTML = language.LOCATION[i];
		
		section.appendChild(sectionNameText);
		sectionMenuDiv.appendChild(section);
	}
	
	var option3Text = document.createElement('label');
	option3Text.className = 'option-text';
	option3Text.setAttribute('for', 'section-list');
	option3Text.innerHTML = language.COMMON[16];
	
	option1.appendChild(option1Text);
	option2.appendChild(option2Text);
	option3.appendChild(option3Text);
	
	menuDiv.appendChild(option1);
	menuDiv.appendChild(option2);
	menuDiv.appendChild(option3);
	
	menu.appendChild(option3ListInput);
	menu.appendChild(sectionMenuDiv);
	
}

function listItems(){
	var content = document.getElementById('content');
		
	var allInfo = document.getElementById('allInfo');
	allInfo.innerHTML = "";
	
	var locationHeaderDiv = document.getElementById('locationHeaderDiv');
	locationHeaderDiv.className = "section-header hidden";
	
	//HEADER ITEM LIST
	
	var sectionHeaderDiv = document.createElement('div');
	sectionHeaderDiv.className = "section-header";
	
	var sectionNameDIV = document.createElement('div');
	sectionNameDIV.className = "section-name";
				
	var sectionName = document.createElement('span');
	sectionName.innerHTML = language.COMMON[1];
	
	sectionNameDIV.appendChild(sectionName);
	sectionHeaderDiv.appendChild(sectionNameDIV);
	
	allInfo.appendChild(sectionHeaderDiv);
	
	//ITEM LIST
	
	var countExcluded = 0;
	
	for(i=0;i<language.ITEM.length;i++){
		if(i!=EXCLUDEDITEMS[countExcluded]){
			var itemListDIV = document.createElement('div');
			itemListDIV.className = "item-list";
						
			var item = document.createElement('div');
			item.className = "item";
						
			var itemImageDIV = document.createElement('div');
			itemImageDIV.className = "item-image-DIV";
			
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			
			switch(item_icon_type){
				case 0: 
					itemImage.setAttribute("src", './img/items/allicons/' + i + ".png");
					break;
				case 1:
					itemImage.setAttribute("src", './img/items/groupicons/' + GROUPICONS[i] + ".png");
					break;
				case 2:
					itemImage.setAttribute("src", './img/items/noicons/noicon.png');
			}
			
						
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name";
						
			var itemName = document.createElement('span');
			itemName.innerHTML = language.ITEM[i];
			//itemName.innerHTML = i + " - " + language.ITEM[i];
			
			var getDiv = document.createElement('div');
			getDiv.className = "item-get item-get-div";
						
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/common/get.png');
						
			get.num = i;
			get.localVariable = "item_list";
			get.status = localStorage.getItem("item_list_" + i);
			get.addEventListener('click', getItem, false);			
						
			if(get.status=="1"){
				get.className = "get1";
			}else{
				get.className = "get0";
			}
						
						
			var typeDiv = document.createElement('div');
			typeDiv.className = "type-item-div";
			
			var typeImgDiv = document.createElement('div');
			typeImgDiv.className = "type-img-div";
			
			var typeImg = document.createElement('img');
			typeImg.className = "item-image";
			
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
				
			for(x=0;x<LOCATION.length;x++){
				for(y=0;y<LOCATION[x].item_field.length;y++){
					if(LOCATION[x].item_field[y][0]==i){
						typeName.innerHTML = language.COMMON[10] + " " + language.LOCATION[x];
						typeImg.setAttribute("src", './img/common/chest.png');
						break;
					}
				}
				
				for(y=0;y<LOCATION[x].item_npc.length;y++){
					if(LOCATION[x].item_npc[y][0]==i){
						typeName.innerHTML = language.COMMON[11] + " " + language.NPC[LOCATION[x].item_npc[y][1]] + language.COMMON[12] + language.LOCATION[x];
						typeImg.setAttribute("src", './img/npc/' + LOCATION[x].item_npc[y][1] + '.png');
						break;
					}
				}
				
				for(y=0;y<LOCATION[x].item_buy.length;y++){
					if(LOCATION[x].item_buy[y][0]==i){
						typeName.innerHTML = language.COMMON[13] + language.LOCATION[x];
						typeImg.setAttribute("src", './img/common/shop.png');
						break;
					}
				}
				
				for(y=0;y<LOCATION[x].item_steal.length;y++){
					if(LOCATION[x].item_steal[y][0]==i){
						typeName.innerHTML = language.COMMON[14] + language.ENEMY[LOCATION[x].item_steal[y][1]] + language.COMMON[12] + language.LOCATION[x];
						typeImg.setAttribute("src", './img/enemies/' + LOCATION[x].item_steal[y][1] + '.png');
						break;
					}
				}
				
				for(y=0;y<LOCATION[x].item_drop.length;y++){
					if(LOCATION[x].item_drop[y][0]==i){
						typeName.innerHTML = language.COMMON[15] + language.ENEMY[LOCATION[x].item_drop[y][1]] + language.COMMON[12] + language.LOCATION[x];
						typeImg.setAttribute("src", './img/enemies/' + LOCATION[x].item_drop[y][1] + '.png');
						break;
					}
				}
				
				/*for(y=0;y<LOCATION[x].item_special.length;y++){
					if(LOCATION[x].item_special[y][0]==i){
						typeName.innerHTML = language.COMMON[LOCATION[x].item_special[y][2]];
						typeImg.setAttribute("src", './img/itemspecial/' + LOCATION[x].item_special[y][1] + '.png');
						break;
					}
				}*/
			}
						
			typeNameDiv.appendChild(typeName);
			typeDiv.appendChild(typeImgDiv);
			typeDiv.appendChild(typeNameDiv);				
			typeImgDiv.appendChild(typeImg);
			
			itemImageDIV.appendChild(itemImage);
			itemNameDIV.appendChild(itemName);
			getDiv.appendChild(get);
			itemListDIV.appendChild(itemImageDIV);
			itemListDIV.appendChild(itemNameDIV);
			
			itemListDIV.appendChild(typeDiv);
			
			itemListDIV.appendChild(getDiv);	
						
			allInfo.appendChild(itemListDIV);
		}else{
			countExcluded++;
		}
	}	
}

function goToSection(){
	var option3ListInput = document.getElementById('section-list');
	option3ListInput.checked = false;
	lastLocation = this.sectionId;
	guide(this.sectionId);
}

function guide(locationId){
	var itemCount = 0;
	
	var content = document.getElementById('content');
	
	var locationHeaderDiv = document.getElementById('locationHeaderDiv');
	locationHeaderDiv.className = "section-header";	
	
	var locationName = document.getElementById('locationName');	
	locationName.innerHTML="";
	locationName.innerHTML = language.LOCATION[locationId];
	
	var mapDiv = document.getElementById('mapDiv');
	mapDiv.location = LOCATION[locationId];
		
	if(!LOCATION[locationId].map){
		mapDiv.className = 'location-map-div hidden';
	}else{
		mapDiv.className = 'location-map-div';
		showMap(locationId);
	}
	
	var allInfo = document.getElementById('allInfo');
	allInfo.innerHTML = "";

	
	//LINKS
			
	if(LOCATION[locationId].link1){
		var link1Div = document.createElement('div');
		link1Div.className = "link-div";
		
		var link1 = document.createElement('a');
		link1.href = LOCATION[locationId].link1[1];	
		
		link1.innerText = LOCATION[locationId].link1[0];
		
		link1Div.appendChild(link1);
		allInfo.appendChild(link1Div);
	}
	
	if(LOCATION[locationId].link2){
		var link2Div = document.createElement('div');
		link2Div.className = "link-div";
		
		var link2 = document.createElement('a');
		link2.href = LOCATION[locationId].link2[1];	
		
		link2.innerText = LOCATION[locationId].link2[0];
		
		link2Div.appendChild(link2);
		allInfo.appendChild(link2Div);
	}
	
	//ENEMIES
		
	var enemiesGlobalDiv = document.createElement('div');
	enemiesGlobalDiv.className = "location-enemies-global-div";
	
	for(z=0; z<LOCATION[locationId].enemy.length; z++){
		createEnemy(locationId, z, enemiesGlobalDiv);
	}
	
	allInfo.appendChild(enemiesGlobalDiv);
	
	//ENTRIES
		
	var itemGlobalDiv = document.createElement('div');
	itemGlobalDiv.className = "location-item-global-div";
	//itemGlobalDiv.innerHTML = "";
	
	var entryCount = 0;		
	var itemFieldCount = 0;
	var itemNPCCount = 0;
	var itemBuyCount = 0;
	var itemStealCount = 0;
	var itemDropCount = 0;
	var itemSpecialCount = 0;
	var moneyFieldCount = 0;
	var moneyNPCCount = 0;
	var achivementCount = 0;
	var advicesCount = 0;
	
	for(z=0; z<LOCATION[locationId].entry_order.length; z++){
		switch(LOCATION[locationId].entry_order[z]){
			case 0:	//ITEM ICON
				createEntry(locationId, itemFieldCount, entryCount, 0, itemGlobalDiv);
				entryCount++;
				itemFieldCount++;
				break;
				
			case 1:	//NPC ITEM
				createEntry(locationId, itemNPCCount, entryCount, 1, itemGlobalDiv);
				entryCount++;
				itemNPCCount++;
				break;
				
			case 2:	//BUY ITEM
				createEntry(locationId, itemBuyCount, entryCount, 2, itemGlobalDiv);
				entryCount++;
				itemBuyCount++;
				break;
				
			case 3:	//STEAL ITEM
				createEntry(locationId, itemStealCount, entryCount, 3, itemGlobalDiv);
				entryCount++;
				itemStealCount++;
				break;
				
			case 4:	//DROP ITEM
				createEntry(locationId, itemDropCount, entryCount, 4, itemGlobalDiv);
				entryCount++;
				itemDropCount++;
				break;
				
			case 5:	//SPECIAL ITEM ICON
					createEntry(locationId, itemSpecialCount, entryCount, 5, itemGlobalDiv);
					entryCount++;
					itemSpecialCount++;
					break;
				
			case 6:	//MONEY FIELD
				createEntry(locationId, moneyFieldCount, entryCount, 6, itemGlobalDiv);
				entryCount++;
				moneyFieldCount++;
				break;
				
			case 7:	//MONEY NPC
				createEntry(locationId, moneyNPCCount, entryCount, 7, itemGlobalDiv);
				entryCount++;
				moneyNPCCount++;
				break;
				
			case 8:	//ACHIEVEMENTS
				createEntry(locationId, achivementCount, entryCount, 8, itemGlobalDiv);
				entryCount++;
				achivementCount++;
				break;
				
			case 9:	//ADVICES
				createEntry(locationId, advicesCount, entryCount, 9, itemGlobalDiv);
				entryCount++;
				advicesCount++;
				break;
		}
	}
	
	var navBackNext = document.createElement('div');
	navBackNext.className = "navigate-back-next";
	
	var navBack = document.createElement('div');
	navBack.className = "navigate-back";
	
	var navNext = document.createElement('div');
	navNext.className = "navigate-next";
	
	/*if(locationId > 0){
		var back = document.createElement('span');
		back.className = "navigate-back-text";
		back.innerHTML = "back";//language.COMMON[17] + " - " language.LOCATION[locationId-1];
		
		lastLocation = locationId-1;
		
		addEventListener('click', function(event) {
			guide(locationId-1, event);
		}, false);
		
		navBack.appendChild(back);
	}
	
	if(locationId < LOCATION.length){
		var next = document.createElement('span');
		next.className = "navigate-next-text";
		next.innerHTML = "next";//language.COMMON[18] + " - " language.LOCATION[locationId+1];
		
		lastLocation = locationId+1;
		
		addEventListener('click', function(event) {
			guide(locationId+1, event);
		}, false);
		
		navNext.appendChild(next);
	}
	
	navBackNext.appendChild(navBack);
	navBackNext.appendChild(navNext);
	allInfo.appendChild(navBackNext);*/

}

function createEnemy(locationId, enemyId, parentDiv){
	var enemyIndividualDiv  = document.createElement('div');
	enemyIndividualDiv.className = "location-enemies-individual-div";
	switch (LOCATION[locationId].enemy[enemyId][2]){
		case 0:
			enemyIndividualDiv.style.background = 'linear-gradient(to bottom, rgba(0,0,0, 0), rgba(0,0,0, 100)), url("./img/battlefields/' + LOCATION[locationId].enemy[enemyId][1] + '.png")';
			break;
		case 1:
			enemyIndividualDiv.style.background = 'linear-gradient(to bottom, rgba(0,0,0, 0), rgba(255,0,0, 100)), url("./img/battlefields/' + LOCATION[locationId].enemy[enemyId][1] + '.png")';
			break;
		case 2:
			enemyIndividualDiv.style.background = 'linear-gradient(to bottom, rgba(0,0,0, 0), rgba(0,225,0, 100)), url("./img/battlefields/' + LOCATION[locationId].enemy[enemyId][1] + '.png")';
			break;
		case 3:
			enemyIndividualDiv.style.background = 'linear-gradient(to bottom, rgba(0,0,0, 0), rgba(0,0,255, 100)), url("./img/battlefields/' + LOCATION[locationId].enemy[enemyId][1] + '.png")';
			break;

	}
	enemyIndividualDiv.style.backgroundPosition = 'center';
	
	enemyIndividualDiv.style.backgroundSize = 'cover';
	
	var enemyImgDiv  = document.createElement('div');
	enemyImgDiv.className = "location-enemies-img-div";
	
	var enemyTextDiv = document.createElement('div');
	enemyTextDiv.className = "location-enemies-text-div";
	
	var enemyImg = document.createElement('img');
	enemyImg.className = "location-enemies-img";
	
	enemyImg.src = './img/enemies/' + LOCATION[locationId].enemy[enemyId][0] + '.png';
	
	var enemyText = document.createElement('span');
	enemyText.className = "location-enemies-text";
	
	enemyText.innerHTML = language.ENEMY[LOCATION[locationId].enemy[enemyId][0]];
		
	enemyTextDiv.appendChild(enemyText);
	enemyImgDiv.appendChild(enemyImg);
	
	enemyIndividualDiv.appendChild(enemyImgDiv);
	enemyIndividualDiv.appendChild(enemyTextDiv);
	
	parentDiv.appendChild(enemyIndividualDiv);
}

function createEntry(locationId, itemPos, entryCount, typeEntry, parentDiv){ //typeEntry: 0=no icon, 1=group icon, 2=all icon, 3=npc, 4=steal
	var itemListDIV = document.createElement('div');
	itemListDIV.className = "item-list";
			
	var item = document.createElement('div');
	item.className = "item";
	
	var itemImageDIV = document.createElement('div');
	itemImageDIV.className = "item-image-DIV";
	
	var allInfo = document.getElementById('allInfo');
	
	switch (typeEntry){
		//ITEM FIELD
		case 0:
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name";
			
			var itemName = document.createElement('span');
			
			var itemText;
			
			switch (item_icon_type){
				case 0:
					itemImage.setAttribute("src", './img/items/allicons/' + LOCATION[locationId].item_field[itemPos][0] + '.png');
					break;
				case 1:
					itemImage.setAttribute("src", './img/items/groupicons/' + GROUPICONS[LOCATION[locationId].item_field[itemPos][0]] + '.png');
					break;
				case 2:
					itemImage.setAttribute("src", './img/items/noicons/noicon.png');
					break;
			}
			
			if(LOCATION[locationId].item_field[itemPos][4]!==undefined){
				
				if(LOCATION[locationId].item_field[itemPos][4].startsWith("/com/")){
					const match = LOCATION[locationId].item_field[itemPos][4].match(/^\/com\/(\d+)/);
					if (match) {
						const number = parseInt(match[1], 10);
						itemText = language.ITEM[LOCATION[locationId].item_field[itemPos][0]] + " " + language.COMMON[number];
					}else{
						itemText = language.ITEM[LOCATION[locationId].item_field[itemPos][0]] + LOCATION[locationId].item_field[itemPos][4];
					}				
				}else{
					itemText = language.ITEM[LOCATION[locationId].item_field[itemPos][0]] + LOCATION[locationId].item_field[itemPos][4];
				}
			}else{
				itemText = language.ITEM[LOCATION[locationId].item_field[itemPos][0]];
			}
			
			itemName.innerHTML = itemText;
						
			var getDiv = document.createElement('div');
			getDiv.className = "item-get item-get-div";
			
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/common/get.png');
			
			get.num = itemCount;
			get.itemIndex = LOCATION[locationId].item_field[itemPos][0];
			get.localVariable = "locationItem";
			get.status = localStorage.getItem("locationItem_" + itemCount);
			get.addEventListener('click', getItem, false);			
			
			if(get.status=="1"){
				get.className = "get1";
			}else{
				get.className = "get0";
			}
			
			var typeDiv = document.createElement('div');
			typeDiv.className = "type-item-div";
			
			var typeImgDiv = document.createElement('div');
			typeImgDiv.className = "type-img-div";
			
			var typeImg = document.createElement('img');
			typeImg.className = "item-image";
			typeImg.setAttribute("src", './img/common/chest.png');
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
			typeName.innerHTML = language.COMMON[8];
			
			if(LOCATION[locationId].item_field[itemPos][3] == true){
				var missable = document.createElement("div");
				missable.className = "missable-container";
				
				var missableText = document.createElement('span');
				missableText.className = "missable-text";
				missableText.innerHTML = language.COMMON[2];
				
				missable.appendChild(missableText);
				itemListDIV.appendChild(missable);
			}
			
			break;
		
		//NPC ITEMS
		case 1:
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			
			switch (item_icon_type){
				case 0:
					itemImage.setAttribute("src", './img/items/allicons/' + LOCATION[locationId].item_npc[itemPos][0] + '.png');
					break;
				case 1:
					itemImage.setAttribute("src", './img/items/groupicons/' + GROUPICONS[LOCATION[locationId].item_npc[itemPos][0]] + '.png');
					break;
				case 2:
					itemImage.setAttribute("src", './img/items/noicons/noicon.png');
					break;
			}
						
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name";
			
			var itemText;
			
			var itemName = document.createElement('span');
			
			if(LOCATION[locationId].item_npc[itemPos][4]!==undefined){
				
				if(LOCATION[locationId].item_npc[itemPos][5].startsWith("/com/")){
						const match = LOCATION[locationId].item_npc[itemPos][5].match(/^\/com\/(\d+)/);
						if (match) {
							const number = parseInt(match[1], 10);
							itemText = language.ITEM[LOCATION[locationId].item_npc[itemPos][0]] + " " + language.COMMON[number];
						}
					}else{
						itemText = language.ITEM[LOCATION[locationId].item_npc[itemPos][0]] + LOCATION[locationId].item_npc[itemPos][5];
					}
				
				
			}else{
				itemText = language.ITEM[LOCATION[locationId].item_npc[itemPos][0]];
			}

			
			if(LOCATION[locationId].item_npc[itemPos][6]!==undefined){
				itemText = itemText + " " + LOCATION[locationId].item_npc[itemPos][6];
			}
			itemName.innerHTML = text;
			
			var getDiv = document.createElement('div');
			getDiv.className = "item-get item-get-div";
			
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/common/get.png');
			
			get.num = itemCount;
			get.itemIndex = LOCATION[locationId].item_npc[itemPos][0];
			get.localVariable = "locationItem";
			get.status = localStorage.getItem("locationItem_" + itemCount);
			get.addEventListener('click', getItem, false);			
			
			if(get.status=="1"){
				get.className = "get1";
			}else{
				get.className = "get0";
			}
			
			var typeDiv = document.createElement('div');
			typeDiv.className = "type-item-div";
			
			var typeImgDiv = document.createElement('div');
			typeImgDiv.className = "type-img-div";
			
			var typeImg = document.createElement('img');
			typeImg.className = "item-image";
			typeImg.setAttribute("src", './img/npc/' + LOCATION[locationId].item_npc[itemPos][1] + '.png');
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
			typeName.innerHTML = language.COMMON[3] + language.NPC[LOCATION[locationId].item_npc[itemPos][1]];
			
			if(LOCATION[locationId].item_npc[itemPos][4] == true){
				var missable = document.createElement("div");
				missable.className = "missable-container";
				
				var missableText = document.createElement('span');
				missableText.className = "missable-text";
				missableText.innerHTML = language.COMMON[2];
				
				missable.appendChild(missableText);
				itemListDIV.appendChild(missable);
			}
			
			break;
			
		//ITEM BUY
		case 2:
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name";
			
			var itemName = document.createElement('span');
			
			var itemText;
			
			switch (item_icon_type){
				case 0:
					itemImage.setAttribute("src", './img/items/allicons/' + LOCATION[locationId].item_buy[itemPos][0] + '.png');
					break;
				case 1:
					itemImage.setAttribute("src", './img/items/groupicons/' + GROUPICONS[LOCATION[locationId].item_buy[itemPos][0]] + '.png');
					break;
				case 2:
					itemImage.setAttribute("src", './img/items/noicons/noicon.png');
					break;
			}
			
			if(LOCATION[locationId].item_buy[itemPos][3]!==undefined){
				
				if(LOCATION[locationId].item_buy[itemPos][3].startsWith("/com/")){
					const match = LOCATION[locationId].item_buy[itemPos][3].match(/^\/com\/(\d+)/);
					if (match) {
						const number = parseInt(match[1], 10);
						itemText = language.ITEM[LOCATION[locationId].item_buy[itemPos][0]] + " x" + LOCATION[locationId].item_buy[itemPos][1] + " " + language.COMMON[number];
					}else{
						itemText = language.ITEM[LOCATION[locationId].item_buy[itemPos][0]] + " x" + LOCATION[locationId].item_buy[itemPos][1] + " " + LOCATION[locationId].item_buy[itemPos][3];
					}				
				}else{
					itemText = language.ITEM[LOCATION[locationId].item_buy[itemPos][0]] + " x" + LOCATION[locationId].item_buy[itemPos][1] + " " + LOCATION[locationId].item_buy[itemPos][3];
				}
			}else{
				itemText = language.ITEM[LOCATION[locationId].item_buy[itemPos][0]] + " x" + LOCATION[locationId].item_buy[itemPos][1];
			}
			
			itemName.innerHTML = itemText;
						
			var getDiv = document.createElement('div');
			getDiv.className = "item-get item-get-div";
			
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/common/get.png');
			
			get.num = itemCount;
			get.itemIndex = LOCATION[locationId].item_buy[itemPos][0];
			get.localVariable = "locationItem";
			get.status = localStorage.getItem("locationItem_" + itemCount);
			get.addEventListener('click', getItem, false);			
			
			if(get.status=="1"){
				get.className = "get1";
			}else{
				get.className = "get0";
			}
			
			var typeDiv = document.createElement('div');
			typeDiv.className = "type-item-div";
			
			var typeImgDiv = document.createElement('div');
			typeImgDiv.className = "type-img-div";
			
			var typeImg = document.createElement('img');
			typeImg.className = "item-image";
			typeImg.setAttribute("src", './img/common/shop.png');
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
			typeName.innerHTML = language.COMMON[9];
			
			if(LOCATION[locationId].item_buy[itemPos][2] == true){
				var missable = document.createElement("div");
				missable.className = "missable-container";
				
				var missableText = document.createElement('span');
				missableText.className = "missable-text";
				missableText.innerHTML = language.COMMON[2];
				
				missable.appendChild(missableText);
				itemListDIV.appendChild(missable);
			}
			
			break;
			
			//STEAL ITEMS
			case 3:
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				
				switch (item_icon_type){
					case 0:
						itemImage.setAttribute("src", './img/items/allicons/' + LOCATION[locationId].item_steal[itemPos][0] + '.png');
						break;
					case 1:
						itemImage.setAttribute("src", './img/items/groupicons/' + GROUPICONS[LOCATION[locationId].item_steal[itemPos][0]] + '.png');
						break;
					case 2:
						itemImage.setAttribute("src", './img/items/noicons/noicon.png');
						break;
				}
				
				var itemText;
				
				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "item-name";
				
				var itemName = document.createElement('span');
				itemName.innerHTML = language.ITEM[LOCATION[locationId].item_steal[itemPos][0]];
				
				if(LOCATION[locationId].item_steal[itemPos][3]!==undefined){
				
					if(LOCATION[locationId].item_steal[itemPos][3].startsWith("/com/")){
						const match = LOCATION[locationId].item_steal[itemPos][3].match(/^\/com\/(\d+)/);
						if (match) {
							const number = parseInt(match[1], 10);
							itemText = language.ITEM[LOCATION[locationId].item_steal[itemPos][0]] + " " + language.COMMON[number];
						}else{
							itemText = language.ITEM[LOCATION[locationId].item_steal[itemPos][0]] + LOCATION[locationId].item_steal[itemPos][3];
						}				
					}else{
						itemText = language.ITEM[LOCATION[locationId].item_steal[itemPos][0]] + LOCATION[locationId].item_steal[itemPos][3];
					}
				}else{
					itemText = language.ITEM[LOCATION[locationId].item_steal[itemPos][0]];
				}
				
				itemName.innerHTML = itemText;
				
				var getDiv = document.createElement('div');
				getDiv.className = "item-get item-get-div";
				
				var get = document.createElement('img');
				get.className = "get0";
				get.setAttribute("src", './img/common/get.png');
				
				get.num = itemCount;
				get.itemIndex = LOCATION[locationId].item_steal[itemPos][0];
				get.localVariable = "locationItem";
				get.status = localStorage.getItem("locationItem_" + itemCount);
				get.addEventListener('click', getItem, false);			
				
				if(get.status=="1"){
					get.className = "get1";
				}else{
					get.className = "get0";
				}
				
				var typeDiv = document.createElement('div');
				typeDiv.className = "type-item-div";
				
				var typeImgDiv = document.createElement('div');
				typeImgDiv.className = "type-img-div";
				
				var typeImg = document.createElement('img');
				typeImg.className = "item-image";
				typeImg.setAttribute("src", './img/enemies/' + LOCATION[locationId].item_steal[itemPos][1] + '.png');
				
				var typeNameDiv = document.createElement('div');
				typeNameDiv.className = "type-name-div";
				
				var typeName = document.createElement('span');
				typeName.className = "type-name";
				typeName.innerHTML = language.COMMON[4] + language.ENEMY[LOCATION[locationId].item_steal[itemPos][1]];
				
				if(LOCATION[locationId].item_steal[itemPos][2] == true){
					var missable = document.createElement("div");
					missable.className = "missable-container";
					
					var missableText = document.createElement('span');
					missableText.className = "missable-text";
					missableText.innerHTML = language.COMMON[2];
					
					missable.appendChild(missableText);
					itemListDIV.appendChild(missable);
				}
				
				break;
			
			//DROP ITEM
			case 4:
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				
				switch (item_icon_type){
					case 0:
						itemImage.setAttribute("src", './img/items/allicons/' + LOCATION[locationId].item_drop[itemPos][0] + '.png');
						break;
					case 1:
						itemImage.setAttribute("src", './img/items/groupicons/' + GROUPICONS[LOCATION[locationId].item_drop[itemPos][0]] + '.png');
						break;
					case 2:
						itemImage.setAttribute("src", './img/items/noicons/noicon.png');
						break;
				}					
							
				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "item-name";
				
				var itemName = document.createElement('span');
				var itemText;
				
				if(LOCATION[locationId].item_drop[itemPos][3]!==undefined){
				
					if(LOCATION[locationId].item_drop[itemPos][3].startsWith("/com/")){
						const match = LOCATION[locationId].item_drop[itemPos][3].match(/^\/com\/(\d+)/);
						if (match) {
							const number = parseInt(match[1], 10);
							itemText = language.ITEM[LOCATION[locationId].item_drop[itemPos][0]] + " " + language.COMMON[number];
						}else{
							itemText = language.ITEM[LOCATION[locationId].item_drop[itemPos][0]] + LOCATION[locationId].item_drop[itemPos][3];
						}				
					}else{
						itemText = language.ITEM[LOCATION[locationId].item_drop[itemPos][0]] + LOCATION[locationId].item_drop[itemPos][3];
					}
				}else{
					itemText = language.ITEM[LOCATION[locationId].item_drop[itemPos][0]];
				}
				
				itemName.innerHTML = itemText;
				
				var getDiv = document.createElement('div');
				getDiv.className = "item-get item-get-div";
				
				var get = document.createElement('img');
				get.className = "get0";
				get.setAttribute("src", './img/common/get.png');
				
				get.num = itemCount;
				get.itemIndex = LOCATION[locationId].item_drop[itemPos][0];
				get.localVariable = "locationItem";
				get.status = localStorage.getItem("locationItem_" + itemCount);
				get.addEventListener('click', getItem, false);			
				
				if(get.status=="1"){
					get.className = "get1";
				}else{
					get.className = "get0";
				}
				
				var typeDiv = document.createElement('div');
				typeDiv.className = "type-item-div";
				
				var typeImgDiv = document.createElement('div');
				typeImgDiv.className = "type-img-div";
				
				var typeImg = document.createElement('img');
				typeImg.className = "item-image";
				typeImg.setAttribute("src", './img/enemies/' + LOCATION[locationId].item_drop[itemPos][1] + '.png');
				
				var typeNameDiv = document.createElement('div');
				typeNameDiv.className = "type-name-div";
				
				var typeName = document.createElement('span');
				typeName.className = "type-name";
				typeName.innerHTML = language.COMMON[5] + language.ENEMY[LOCATION[locationId].item_drop[itemPos][1]];
				
				if(LOCATION[locationId].item_drop[itemPos][2] == true){
					var missable = document.createElement("div");
					missable.className = "missable-container";
					
					var missableText = document.createElement('span');
					missableText.className = "missable-text";
					missableText.innerHTML = language.COMMON[2];
					
					missable.appendChild(missableText);
					itemListDIV.appendChild(missable);
				}
				
				break;
				
			// SPECIAL ITEMS
			case 5:
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				
				switch (item_icon_type){
					case 0:
						itemImage.setAttribute("src", './img/items/allicons/' + LOCATION[locationId].item_special[itemPos][0] + '.png');
						break;
					case 1:
						itemImage.setAttribute("src", './img/items/groupicons/' + GROUPICONS[LOCATION[locationId].item_special[itemPos][0]] + '.png');
						break;
					case 2:
						itemImage.setAttribute("src", './img/items/noicons/noicon.png');
						break;
				}	
							
				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "item-name";
				
				var text;
				
				var itemName = document.createElement('span');
				text = language.ITEM[LOCATION[locationId].item_special[itemPos][0]];
				
				if(LOCATION[locationId].item_special[itemPos][4]!==undefined){
					text = text + " " + LOCATION[locationId].item_special[itemPos][4];
				}
				itemName.innerHTML = text;
				
				var getDiv = document.createElement('div');
				getDiv.className = "item-get item-get-div";
				
				var get = document.createElement('img');
				get.className = "get0";
				get.setAttribute("src", './img/common/get.png');
				
				get.num = itemCount;
				get.itemIndex = LOCATION[locationId].item_special[itemPos][0];
				get.localVariable = "locationItem";
				get.status = localStorage.getItem("locationItem_" + itemCount);
				get.addEventListener('click', getItem, false);			
				
				if(get.status=="1"){
					get.className = "get1";
				}else{
					get.className = "get0";
				}
				
				var typeDiv = document.createElement('div');
				typeDiv.className = "type-item-div";
				
				var typeImgDiv = document.createElement('div');
				typeImgDiv.className = "type-img-div";
				
				var typeImg = document.createElement('img');
				typeImg.className = "item-image";
				typeImg.setAttribute("src", './img/itemspecial/' + LOCATION[locationId].item_special[itemPos][1] + '.png');
				
				var typeNameDiv = document.createElement('div');
				typeNameDiv.className = "type-name-div";
				
				var typeName = document.createElement('span');
				typeName.className = "type-name";
				typeName.innerHTML = language.COMMON[LOCATION[locationId].item_special[itemPos][2]];
				
				if(LOCATION[locationId].item_special[itemPos][3] == true){
					var missable = document.createElement("div");
					missable.className = "missable-container";
					
					var missableText = document.createElement('span');
					missableText.className = "missable-text";
					missableText.innerHTML = language.COMMON[2];
					
					missable.appendChild(missableText);
					itemListDIV.appendChild(missable);
				}
				
				break;
			
			//FIELD MONEY
			case 6:
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				itemImage.setAttribute("src", './img/common/money.png');
				
				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "item-name";
				
				var itemName = document.createElement('span');
				itemName.innerHTML = LOCATION[locationId].money_field[itemPos][0] + " " + language.COMMON[6];
				
				var itemText;
				
				if(LOCATION[locationId].money_field[itemPos][3]!==undefined){
				
					if(LOCATION[locationId].money_field[itemPos][3].startsWith("/com/")){
						const match = LOCATION[locationId].money_field[itemPos][3].match(/^\/com\/(\d+)/);
						if (match) {
							const number = parseInt(match[1], 10);
							itemText = LOCATION[locationId].money_field[itemPos][0] + " " + language.COMMON[6] + " " + language.COMMON[number];
						}else{
							itemText = LOCATION[locationId].money_field[itemPos][0] + " " + language.COMMON[6] + LOCATION[locationId].money_field[itemPos][3];
						}				
					}else{
						itemText = LOCATION[locationId].money_field[itemPos][0] + " " + language.COMMON[6] + LOCATION[locationId].money_field[itemPos][3];
					}
				}else{
					itemText = LOCATION[locationId].money_field[itemPos][0] + " " + language.COMMON[6];
				}
				
				itemName.innerHTML = itemText;
				
				var getDiv = document.createElement('div');
				getDiv.className = "item-get item-get-div";
				
				var get = document.createElement('img');
				get.className = "get0";
				//get.setAttribute("src", './img/common/get.png');
				
				var typeDiv = document.createElement('div');
				typeDiv.className = "type-item-div";
				
				var typeImgDiv = document.createElement('div');
				typeImgDiv.className = "type-img-div";
				
				var typeImg = document.createElement('img');
				typeImg.className = "item-image";
				typeImg.setAttribute("src", './img/common/chest.png');
				
				var typeNameDiv = document.createElement('div');
				typeNameDiv.className = "type-name-div";
				
				var typeName = document.createElement('span');
				typeName.className = "type-name";
				typeName.innerHTML = language.COMMON[8];
				
				break;
			
			//NPC MONEY
			case 7:
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				itemImage.setAttribute("src", './img/common/money.png');

				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "item-name";
				
				var itemName = document.createElement('span');
				itemName.innerHTML = LOCATION[locationId].money_npc[itemPos][0] + " " + language.COMMON[6];
				
				var itemText;
				
				if(LOCATION[locationId].money_npc[itemPos][4]!==undefined){
				
					if(LOCATION[locationId].money_npc[itemPos][4].startsWith("/com/")){
						const match = LOCATION[locationId].money_npc[itemPos][4].match(/^\/com\/(\d+)/);
						if (match) {
							const number = parseInt(match[1], 10);
							itemText = LOCATION[locationId].money_npc[itemPos][0] + " " + language.COMMON[6] + " " + language.COMMON[number];
						}else{
							itemText = LOCATION[locationId].money_npc[itemPos][0] + " " + language.COMMON[6] + LOCATION[locationId].money_npc[itemPos][4];
						}				
					}else{
						itemText = LOCATION[locationId].money_npc[itemPos][0] + " " + language.COMMON[6] + LOCATION[locationId].money_npc[itemPos][4];
					}
				}else{
					itemText = LOCATION[locationId].money_npc[itemPos][0] + " " + language.COMMON[6];
				}
				
				itemName.innerHTML = itemText;
				
				var getDiv = document.createElement('div');
				getDiv.className = "item-get item-get-div";
				
				var get = document.createElement('img');
				get.className = "get0";
				//get.setAttribute("src", './img/common/get.png');
				
				var typeDiv = document.createElement('div');
				typeDiv.className = "type-item-div";
				
				var typeImgDiv = document.createElement('div');
				typeImgDiv.className = "type-img-div";
				
				var typeImg = document.createElement('img');
				typeImg.className = "item-image";
				typeImg.setAttribute("src", './img/npc/' + LOCATION[locationId].money_npc[itemPos][1] + '.png');
				
				var typeNameDiv = document.createElement('div');
				typeNameDiv.className = "type-name-div";
				
				var typeName = document.createElement('span');
				typeName.className = "type-name";
				typeName.innerHTML = language.COMMON[3] + language.NPC[LOCATION[locationId].money_npc[itemPos][1]];
				
				break;
				
			//ACHIEVEMENT
			case 8:
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				itemImage.setAttribute("src", './img/achievements/' + LOCATION[locationId].achievement[itemPos] + '.png');
				
				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "item-name";
				
				var itemName = document.createElement('span');
				itemName.innerHTML = language.ACHIEVEMENTNAME[LOCATION[locationId].achievement[itemPos]];
				
				var getDiv = document.createElement('div');
				getDiv.className = "item-get item-get-div";
				
				var get = document.createElement('img');
				get.className = "get0";
				//get.setAttribute("src", './img/common/get.png');
				
				var typeDiv = document.createElement('div');
				typeDiv.className = "achievement-div";
				
				var typeImgDiv = document.createElement('div');
				typeImgDiv.className = "type-img-div";
				
				var typeImg = document.createElement('span');
				typeImg.innerHTML = language.ACHIEVEMENTNAME[LOCATION[locationId].achievement[itemPos]];
				
				var typeNameDiv = document.createElement('div');
				typeNameDiv.className = "type-name-div";
				
				var typeName = document.createElement('span');
				typeName.className = "type-name";
				typeName.innerHTML = language.ACHIEVEMENTDESCRIPTION[LOCATION[locationId].achievement[itemPos]]
				
				break;
				
			case 9:
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				//itemImage.setAttribute("src", './img/common/advices.png');
				
				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "advice-name";
				
				var itemName = document.createElement('span');
				itemName.innerHTML = language.ADVICES[LOCATION[locationId].advice[itemPos]];
				
				var getDiv = document.createElement('div');
				getDiv.className = "item-get item-get-div";
				
				var get = document.createElement('img');
				get.className = "get0";
				//get.setAttribute("src", './img/common/get.png');
				
				var typeDiv = document.createElement('div');
				typeDiv.className = "type-advice-div";
				
				var typeImgDiv = document.createElement('div');
				typeImgDiv.className = "type-img-div";
				
				var typeImg = document.createElement('img');
				typeImg.className = "item-image";
				typeImg.setAttribute("src", './img/common/advices.png');
				
				var typeNameDiv = document.createElement('div');
				typeNameDiv.className = "type-name-div";
				
				var typeName = document.createElement('span');
				typeName.className = "type-name";
				typeName.innerHTML = language.COMMON[7];
				
				break;
			
			
	}	
	
	itemImageDIV.appendChild(itemImage);
	itemNameDIV.appendChild(itemName);
	typeNameDiv.appendChild(typeName);
	typeImgDiv.appendChild(typeImg);
	
	if(typeEntry==9){
		itemListDIV.appendChild(typeDiv);
	}
	
	typeDiv.appendChild(typeImgDiv);
	typeDiv.appendChild(typeNameDiv);	
	getDiv.appendChild(get);	
	
	if(typeEntry!=9){
		itemListDIV.appendChild(itemImageDIV);
	}
	
	if(typeEntry!=8){
		itemListDIV.appendChild(itemNameDIV);
	}	
	
	if(typeEntry!=9){
		itemListDIV.appendChild(typeDiv);;
	}
	
	
	itemListDIV.appendChild(getDiv);	
				
	allInfo.appendChild(itemListDIV);
	
	itemCount++;
}

function showMap(locationId) {

	// Si el mapa ya está inicializado, destrúyelo
    if (map !== undefined) {
        map.remove();
	}
	
	document.getElementById('map').style.backgroundColor = map_background_color;
	
	// Define las dimensiones de las imágenes en píxeles automáticamente
	var mapTemp = new Image();
	mapTemp.src = './img/maps/' + locationId + map_image_extension;
	
	mapTemp.onload = function() {
		var imageWidth = mapTemp.width;
		var imageHeight = mapTemp.height;

		var bounds = [[0, 0], [imageHeight, imageWidth]]; // Dimensiones automáticas de la imagen

		// Inicializa el mapa centrado en el área total que abarcan las imágenes
		map = L.map('map', {
			crs: L.CRS.Simple, // Sistema de coordenadas simple, adecuado para imágenes
			minZoom: map_minZoom,       // Permite hacer más zoom out si es necesario
			maxZoom: map_maxZoom         // Puedes ajustar según tus necesidades
		});

		// Agrega la imagen al mapa con los límites definidos
		L.imageOverlay('./img/maps/' + locationId + map_image_extension, bounds).addTo(map);

		// Ajusta la vista del mapa para que se ajuste a los límites de la imagen
		map.fitBounds(bounds);
		
		var icon = new Array();
		
		// ITEMS FIELD
		switch (item_icon_type){
			case 0:
				for (i = 0; i < LOCATION[locationId].item_field.length; i++) {
					icon[i] = L.icon({
						iconUrl: './img/items/allicons/' + LOCATION[locationId].item_field[i][0] + '.png', // Ruta a la imagen del icono
						iconSize: [map_icon_size[0], map_icon_size[1]], // Tamaño del icono (ancho, alto)
						iconAnchor: [map_icon_size[0]/2, map_icon_size[1]], // Punto del icono que corresponderá a la posición del marcador
						popupAnchor: [0, map_icon_size[1]*-1] // Punto desde donde se abrirá el popup en relación al icono
					});
				}
				break;
			case 1:
				for (i = 0; i < LOCATION[locationId].item_field.length; i++) {
					icon[i] = L.icon({
						iconUrl: './img/items/groupicons/' + GROUPICONS[LOCATION[locationId].item_field[i][0]] + '.png', // Ruta a la imagen del icono
						iconSize: [map_icon_size[0], map_icon_size[1]], // Tamaño del icono (ancho, alto)
						iconAnchor: [map_icon_size[0]/2, map_icon_size[1]], // Punto del icono que corresponderá a la posición del marcador
						popupAnchor: [0, map_icon_size[1]*-1] // Punto desde donde se abrirá el popup en relación al icono
					});
				}
				break;
			case 2:
					icon[0] = L.icon({
						iconUrl: './img/items/noicons/noicon.png', // Ruta a la imagen del icono
						iconSize: [map_icon_size[0], map_icon_size[1]], // Tamaño del icono (ancho, alto)
						iconAnchor: [map_icon_size[0]/2, map_icon_size[1]], // Punto del icono que corresponderá a la posición del marcador
						popupAnchor: [0, map_icon_size[1]*-1] // Punto desde donde se abrirá el popup en relación al icono
					});
				break;
		}
		
		var marker;
		
		
		switch (item_icon_type) {
			case 0:
			case 1:
				for (i = 0; i < LOCATION[locationId].item_field.length; i++) {
					marker = L.marker(
							[LOCATION[locationId].item_field[i][1], LOCATION[locationId].item_field[i][2]],
							{ icon: icon[i] }
						).addTo(map);
						marker.bindPopup(language.ITEM[LOCATION[locationId].item_field[i][0]]);
				}
				break;
			case 2:
				for (i = 0; i < LOCATION[locationId].item_field.length; i++) {
					marker = L.marker(
							[LOCATION[locationId].item_field[i][1], LOCATION[locationId].item_field[i][2]],
							{ icon: icon[0] }
						).addTo(map);
						marker.bindPopup(language.ITEM[LOCATION[locationId].item_field[i][0]]);
				}
				break;
		}
		
		// NPC ITEMS
		
		
		for (i = 0; i < LOCATION[locationId].item_npc.length; i++) {
			icon[i] = L.icon({
				iconUrl: './img/npc/' + LOCATION[locationId].item_npc[i][1] + '.png', // Ruta a la imagen del icono
				iconSize: [map_npc_size[0], map_npc_size[1]], // Tamaño del icono (ancho, alto)
				iconAnchor: [map_npc_size[0]/2, map_npc_size[1]], // Punto del icono que corresponderá a la posición del marcador
				popupAnchor: [0, map_npc_size[1]*-1] // Punto desde donde se abrirá el popup en relación al icono
			});
		}
		
		for (i = 0; i < LOCATION[locationId].item_npc.length; i++) {
			marker = L.marker(
					[LOCATION[locationId].item_npc[i][2], LOCATION[locationId].item_npc[i][3]],
					{ icon: icon[i] }
				).addTo(map);
				marker.bindPopup(language.ITEM[LOCATION[locationId].item_npc[i][0]]);
		}
		
		// MONEY FIELD
		
		var moneyIcon = new Array();
		for (i = 0; i < LOCATION[locationId].money_field.length; i++) {
			icon[i] = L.icon({
				iconUrl: './img/common/money.png', // Ruta a la imagen del icono
				iconSize: [map_icon_size[0], map_icon_size[1]], // Tamaño del icono (ancho, alto)
				iconAnchor: [map_icon_size[0]/2, map_icon_size[1]], // Punto del icono que corresponderá a la posición del marcador
				popupAnchor: [0, map_icon_size[1]*-1] // Punto desde donde se abrirá el popup en relación al icono
			});
		}
		
		for (i = 0; i < LOCATION[locationId].money_field.length; i++) {
			marker = L.marker(
					[LOCATION[locationId].money_field[i][1], LOCATION[locationId].money_field[i][2]],
					{ icon: icon[i] }
				).addTo(map);
				marker.bindPopup(LOCATION[locationId].money_field[i][0] + " " + language.COMMON[6]);
		}
		
		// NPC MONEY
		
		
		for (i = 0; i < LOCATION[locationId].money_npc.length; i++) {
			icon[i] = L.icon({
				iconUrl: './img/npc/' + LOCATION[locationId].money_npc[i][1] + '.png', // Ruta a la imagen del icono
				iconSize: [map_npc_size[0], map_npc_size[1]], // Tamaño del icono (ancho, alto)
				iconAnchor: [map_npc_size[0]/2, map_npc_size[1]], // Punto del icono que corresponderá a la posición del marcador
				popupAnchor: [0, map_npc_size[1]*-1] // Punto desde donde se abrirá el popup en relación al icono
			});
		}
		
		for (i = 0; i < LOCATION[locationId].money_npc.length; i++) {
			marker = L.marker(
					[LOCATION[locationId].money_npc[i][2], LOCATION[locationId].money_npc[i][3]],
					{ icon: icon[i] }
				).addTo(map);
				marker.bindPopup(LOCATION[locationId].money_npc[i][0] + " " + language.COMMON[6]);
		}
		
		// SPECIAL MARKS
		
		
		for (i = 0; i < LOCATION[locationId].map_special_mark.length; i++) {
			icon[i] = L.icon({
				iconUrl: './img/marks/' + LOCATION[locationId].map_special_mark[i][1] + '.png', // Ruta a la imagen del icono
				iconSize: [map_icon_size[0], map_icon_size[1]], // Tamaño del icono (ancho, alto)
				iconAnchor: [map_icon_size[0]/2, map_icon_size[1]], // Punto del icono que corresponderá a la posición del marcador
				popupAnchor: [0, map_icon_size[1]*-1] // Punto desde donde se abrirá el popup en relación al icono
			});
		}
		
		for (i = 0; i < LOCATION[locationId].map_special_mark.length; i++) {
			marker = L.marker(
					[LOCATION[locationId].map_special_mark[i][2], LOCATION[locationId].map_special_mark[i][3]],
					{ icon: icon[i] }
				).addTo(map);
				if(LOCATION[locationId].map_special_mark[i][0] !== ""){
					if(LOCATION[locationId].map_special_mark[i][0].startsWith("/loc/")){
						const match = LOCATION[locationId].map_special_mark[i][0].match(/^\/loc\/(\d+)/);
						if (match) {
							const number = parseInt(match[1], 10);
							marker.bindPopup(language.LOCATION[number]);
						}
					}else{
						marker.bindPopup(LOCATION[locationId].map_special_mark[i][0]);
					}
				}
				
		}
			
		// CONNECTIONS
		
		for (i = 0; i < LOCATION[locationId].map_connections.length; i++) {
			var color = 'red';
			
			//Detecta si hay un color seleccionado
			if(typeof LOCATION[locationId].map_connections[i] === "string"){
				color = LOCATION[locationId].map_connections[i];
				i++;
			}
			
			//Guardando todos los puntos
			var vertex = new Array();
			
			for(x=0;x<LOCATION[locationId].map_connections[i].length;x++){
				vertex[x] = LOCATION[locationId].map_connections[i][x];
			}
			
			// Coordenadas de los dos puntos
			var pointA = vertex[0];
			var pointB = vertex[vertex.length-1]; // misma latitud para una línea horizontal
			
			// Crear un círculo en el punto A
			var circleA = L.circle(pointA, {
				color: color,
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 8
			}).addTo(map);

			
			
			// Crear una línea que conecta los puntos A y B
			for(x=0;x<LOCATION[locationId].map_connections[i].length-1;x++){
				
					
				if(LOCATION[locationId].map_connections[i].length>2){
					//crear rectas
					
					var h = vertex[x][0] - vertex[x+1][0];
					var v = vertex[x][1] - vertex[x+1][1];
					
					if(Math.abs(h)<Math.abs(v)){
						vertex[x+1][0] = vertex[x][0];
					}else{
						vertex[x+1][1] = vertex[x][1];
					}
				}
								
				var polyline = L.polyline([vertex[x], vertex[x+1]], {
					color: color,
					weight: map_connection_line_weight
				}).addTo(map);
			}
			
			pointB = vertex[vertex.length-1]; // misma latitud para una línea horizontal
			// Crear un círculo en el punto B
			var circleB = L.circle(pointB, {
				color: color,
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 8
			}).addTo(map);
			
			
		}
		
				
		// Evento para capturar clics en el mapa
		map.on('click', function(e) {
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;

			// Muestra las coordenadas en la consola
			console.log(lat + ", " + lng);
			
			
			var textArea = document.getElementById("mapDebugText");
			
			if(recording){
				textArea.innerHTML += "[" + lat + ", " + lng + "],"
			}else{
				textArea.innerHTML = lat + ", " + lng;
			}
		});
	};
}

function getItem(evt){
	if(this.status){
		this.className = "get0";
		localStorage.setItem(this.localVariable + "_" + this.num, 0);
	}else{
		this.className = "get1";
		localStorage.setItem(this.localVariable + "_" + this.num, 1);
	}
	
	if(this.localVariable == "locationItem"){
		localStorage.setItem("item_list_" + this.itemIndex, 1);
	}
	
	this.status = !this.status;
}

function parseString(input) {
    // Definimos el patrón de la expresión regular
    
	input=input.toString();
	
	var regex = /^(\/(loc|com)\/:)(\d{1,3})$/;
    var match = input.match(regex);

    if (match) {
        const type = match[2]; // 'loc' o 'com'
        const number = match[3]; // El número de una a tres cifras
        return {
            type: `/${type}/:`,
            number: parseInt(number, 10)
        };
    } else {
        return ""; // Retorna null si la cadena no cumple con el patrón esperado
    }
}

function mapDebugControls(){
	var mapDebug = document.getElementById("mapDebug");
	mapDebug.className = "map-debug";
	
	//Cordenadas Mapa
	var buttonRecord = document.getElementById("mapDebugRecord");
	var buttonNext = document.getElementById("mapDebugNext");
	var buttonStopRecord = document.getElementById("mapDebugStopRecord");
	var copy = document.getElementById("mapDebugCopy");
	var clear = document.getElementById("mapDebugClear");
	var textArea = document.getElementById("mapDebugText");
	
	buttonRecord.addEventListener('click', function(){
		recording = true;
		textArea.innerHTML += "\n[";
	}, false);
	
	buttonNext.addEventListener('click', function(){
		textArea.innerHTML = textArea.innerHTML.slice(0, -1);
		textArea.innerHTML += "],";
		textArea.innerHTML += "\n[";
	}, false);
	
	buttonStopRecord.addEventListener('click', function(){
		recording = false;
		textArea.innerHTML = textArea.innerHTML.slice(0, -1);
		textArea.innerHTML += "]";
	}, false);
	
	copy.addEventListener('click', function(){
		navigator.clipboard.writeText(textArea.innerHTML);
	}, false);
	
	clear.addEventListener('click', function(){
		textArea.innerHTML = "";
	}, false);
	
	//Cordenadas Items
	var ddItems = document.getElementById("ddItems");
	
	// Eliminar todas las opciones existentes
	while (ddItems.firstChild) {
		ddItems.removeChild(ddItems.firstChild);
	}
	
	for(i=0;i<language.ITEM.length;i++){
		var nuevaOpcion = document.createElement('option');
        
        // Establecer el valor y el texto del option
        nuevaOpcion.value = i;
        nuevaOpcion.textContent = language.ITEM[i];
        
        // Añadir la opción al select
        ddItems.appendChild(nuevaOpcion);
	}
	
	//List Enemies
	var ddEnemies = document.getElementById("ddEnemies");
	
	// Eliminar todas las opciones existentes
	while (ddEnemies.firstChild) {
		ddEnemies.removeChild(ddEnemies.firstChild);
	}
	
	for(i=0;i<language.ENEMY.length;i++){
		var nuevaOpcion = document.createElement('option');
        
        // Establecer el valor y el texto del option
        nuevaOpcion.value = i;
        nuevaOpcion.textContent = language.ENEMY[i];
        
        // Añadir la opción al select
        ddEnemies.appendChild(nuevaOpcion);
	}

	
}

window.onload = function(){
	var langIcon = document.getElementById('lang-icon');
	var es = document.getElementById('es');
	var en = document.getElementById('en');
	var content = document.getElementById('content');
	var logo = document.getElementById('banner');
	var logoImage = document.createElement('img');
	logoImage.id = "game-logo";
	logoImage.setAttribute("src", './img/common/banner.png');
	logo.appendChild(logoImage);
	
	es.addEventListener('click', function(){
			logo.innerHTML="";
			//logoImage.setAttribute("src", './img/pkm_rselgfr/banner_es.png');
			logo.appendChild(logoImage);
			changeLanguage("es");
			createMenu();
			guide(lastLocation);
			if(map_debugging){
				mapDebugControls();
			}
		}, false);	
	en.addEventListener('click', function(){
			logo.innerHTML="";
			//logoImage.setAttribute("src", './img/pkm_rselgfr/banner_en.png');
			logo.appendChild(logoImage);
			changeLanguage("en");
			createMenu();
			guide(lastLocation);
			if(map_debugging){
				mapDebugControls();
			}
		}, false);
	changeLanguage("es");
	createMenu();
	guide(lastLocation);
	
	if(map_debugging){
		mapDebugControls();
	}
}