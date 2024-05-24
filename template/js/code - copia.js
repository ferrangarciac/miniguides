var language;
var itemCount = 0;

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
	menu.innerHTML = "";
	
	var menuDiv = document.createElement('div');
	menuDiv.className = 'option-menu-div';
	
	var option1 = document.createElement('div');
	option1.className = 'option-div';
	
	
	var option1Text = document.createElement('span');
	option1Text.className = 'option-text';
	option1Text.innerHTML = language.MENU[0];
	
	option1.addEventListener('click', guide, false);
	
	var option2 = document.createElement('div');
	option2.className = 'option-div';
	
	option2.addEventListener('click', listItems, false);
	
	var option2Text = document.createElement('span');
	option2Text.className = 'option-text';
	option2Text.innerHTML = language.MENU[1];
	
	option1.appendChild(option1Text);
	option2.appendChild(option2Text);
	
	menuDiv.appendChild(option1);
	menuDiv.appendChild(option2);
	
	menu.appendChild(menuDiv);
}

function listItems(){
	var content = document.getElementById('content');
	content.innerHTML="";
	
	//HEADER ITEM LIST
	
	var sectionHeaderDiv = document.createElement('div');
	sectionHeaderDiv.className = "section-header";
	
	var sectionNameDIV = document.createElement('div');
	sectionNameDIV.className = "section-name";
				
	var sectionName = document.createElement('span');
	sectionName.innerHTML = language.MENU[1];
	
	sectionNameDIV.appendChild(sectionName);
	sectionHeaderDiv.appendChild(sectionNameDIV);
	
	content.appendChild(sectionHeaderDiv);
	
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
						//itemName.innerHTML = i + " - " + language.ITEM3GEN[i];				
						
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
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
			
			//if(nonLocation == true){
			//	typeName.innerHTML = language.NONLOCITEMGET[nonLocationIndex];
			//}else{
			//	typeName.innerHTML = language.NONLOCITEMGET[language.NONLOCITEMGET.length-1];
			//}
			
			typeName.innerHTML = "placeholder";
						
			typeNameDiv.appendChild(typeName);
			typeDiv.appendChild(typeImgDiv);
			typeDiv.appendChild(typeNameDiv);				
			
			itemImageDIV.appendChild(itemImage);
			itemNameDIV.appendChild(itemName);
			getDiv.appendChild(get);
			itemListDIV.appendChild(itemImageDIV);
			itemListDIV.appendChild(itemNameDIV);
			
			itemListDIV.appendChild(typeDiv);
			
			itemListDIV.appendChild(getDiv);	
						
			content.appendChild(itemListDIV);
		}else{
			countExcluded++;
		}
	}	
}

function guide(){
	var itemCount = 0;
	var content = document.getElementById('content');
	content.innerHTML="";
	
	for(i=0; i<language.LOCATION.length; i++){
		var locationHeaderDiv = document.createElement('div');
		locationHeaderDiv.className = "section-header";
		
		var locationNameDIV = document.createElement('div');
		locationNameDIV.className = "section-name";
				
		var locationName = document.createElement('span');
		locationName.innerHTML = language.LOCATION[i];	
		
		locationNameDIV.appendChild(locationName);
		locationHeaderDiv.appendChild(locationNameDIV);
		
		var mapDiv = document.createElement('div');
		mapDiv.className = "location-map-div";
		
		for(z=0; z<LOCATION[i].map_number; z++){
			var mapIconDiv = document.createElement('div');
			mapIconDiv.className = "location-map-icon-div";	
			
			var mapIcon = document.createElement('img');
			mapIcon.className = "map-icon";
			mapIcon.setAttribute("src", './img/common/mapicon.png');

			mapIconDiv.path = './img/maps/' + i + '_' + z + map_image_extension;
			mapIconDiv.location = LOCATION[i];
			mapIconDiv.mapNumber = z;
			
			mapIconDiv.addEventListener('click', showMap, false);			
			
			mapIconDiv.appendChild(mapIcon);

			mapDiv.appendChild(mapIconDiv);
					
		}
		
		var imgMapDiv = document.getElementById('map-img-div-perma');
		imgMapDiv.addEventListener('click', hideMap, false);
		
		locationHeaderDiv.appendChild(mapDiv);
		content.appendChild(locationHeaderDiv);
		
		//LINKS
			
		if(LOCATION[i].link1){
			var link1Div = document.createElement('div');
			link1Div.className = "link-div";
			
			var link1 = document.createElement('a');
			link1.href = LOCATION[i].link1[1];	
			
			link1.innerText = LOCATION[i].link1[0];
			
			link1Div.appendChild(link1);
			content.appendChild(link1Div);
		}
		
		if(LOCATION[i].link2){
			var link2Div = document.createElement('div');
			link2Div.className = "link-div";
			
			var link2 = document.createElement('a');
			link2.href = LOCATION[i].link2[1];	
			
			link2.innerText = LOCATION[i].link2[0];
			
			link2Div.appendChild(link2);
			content.appendChild(link2Div);
		}
		
		//ENEMIES
		
		var enemiesGlobalDiv = document.createElement('div');
		enemiesGlobalDiv.className = "location-enemies-global-div";
		
		for(z=0; z<LOCATION[i].enemy.length; z++){
			createEnemy(i, z, enemiesGlobalDiv);
		}
		
		content.appendChild(enemiesGlobalDiv);
		
		//ENTRIES
		
		var itemGlobalDiv = document.createElement('div');
		itemGlobalDiv.className = "location-item-global-div";
		
		var entryCount = 0;		
		var itemFieldNoIconCount = 0;
		var itemFieldGroupCount = 0;
		var itemAllIconCount = 0;
		var itemNPCCount = 0;
		var itemStealCount = 0;
		var itemDropCount = 0;
		var moneyFieldCount = 0;
		var moneyNPCCount = 0;
		var achivementCount = 0;
		
		for(z=0; z<LOCATION[i].entry_order.length; z++){
			switch(LOCATION[i].entry_order[z]){
				case 0:	//ITEM FIELD NO ICON
					createEntry(i, itemFieldNoIconCount, entryCount, 0, itemGlobalDiv);
					entryCount++;
					itemFieldNoIconCount++;
					break;
					
				case 1:	//ITEM FIELD GROUP ICON
					createEntry(i, itemFieldGroupCount, entryCount, 1, itemGlobalDiv);
					entryCount++;
					itemFieldGroupCount++;
					break;
					
				case 2:	//ITEM FIELD UNIQUE ICON
					createEntry(i, itemAllIconCount, entryCount, 2, itemGlobalDiv);
					entryCount++;
					itemAllIconCount++;
					break;
					
				case 3:	//NPC ITEM
					createEntry(i, itemNPCCount, entryCount, 3, itemGlobalDiv);
					entryCount++;
					itemNPCCount++;
					break;
					
				case 4:	//STEAL ITEM
					createEntry(i, itemStealCount, entryCount, 4, itemGlobalDiv);
					entryCount++;
					itemStealCount++;
					break;
					
				case 5:	//DROP ITEM
					createEntry(i, itemDropCount, entryCount, 5, itemGlobalDiv);
					entryCount++;
					itemDropCount++;
					break;
					
				case 6:	//MONEY FIELD
					createEntry(i, moneyFieldCount, entryCount, 6, itemGlobalDiv);
					entryCount++;
					moneyFieldCount++;
					break;
					
				case 7:	//MONEY NPC
					createEntry(i, moneyNPCCount, entryCount, 7, itemGlobalDiv);
					entryCount++;
					moneyNPCCount++;
					break;
					
				case 8:	//ACHIEVEMENTS
					createEntry(i, achivementCount, entryCount, 8, itemGlobalDiv);
					entryCount++;
					achivementCount++;
					break;
			}
		}
	}
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
	
	
	switch (typeEntry){
		//NO ICON
		case 0:
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			itemImage.setAttribute("src", './img/items/noicons/noicon.png');
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name";
			
			var itemName = document.createElement('span');
			itemName.innerHTML = (itemPos + 1) + " - " + language.ITEM[LOCATION[locationId].item_field_noicon[itemPos][0]];
			
			var getDiv = document.createElement('div');
			getDiv.className = "item-get item-get-div";
			
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/common/get.png');
			
			get.num = itemCount;
			get.itemIndex = LOCATION[locationId].item_field_noicon[itemPos][0];
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
			typeImg.setAttribute("src", './img/origin/chest.png');
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
			typeName.innerHTML = language.ITEM_ORIGIN[0];
			
			if(LOCATION[locationId].item_field_noicon[itemPos][4] == true){
				var missable = document.createElement("div");
				missable.className = "missable-container";
				
				var missableText = document.createElement('span');
				missableText.className = "missable-text";
				missableText.innerHTML = language.MENU[2];
				
				missable.appendChild(missableText);
				itemListDIV.appendChild(missable);
			}
			
			break;
		
		//ICON GROUP		
		case 1:
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			itemImage.setAttribute("src", './img/items/groupicons/' + GROUPICONS[LOCATION[locationId].item_field_gropuicon[itemPos][0]] + '.png');
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name";
			
			var itemName = document.createElement('span');
			itemName.innerHTML = (itemPos + 1) + " - " + language.ITEM[LOCATION[locationId].item_field_gropuicon[itemPos][0]];
			
			var getDiv = document.createElement('div');
			getDiv.className = "item-get item-get-div";
			
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/common/get.png');
			
			get.num = itemCount;
			get.itemIndex = LOCATION[locationId].item_field_gropuicon[itemPos][0];
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
			typeImg.setAttribute("src", './img/origin/chest.png');
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
			typeName.innerHTML = language.ITEM_ORIGIN[0];
			
			if(LOCATION[locationId].item_field_gropuicon[itemPos][4] == true){
				var missable = document.createElement("div");
				missable.className = "missable-container";
				
				var missableText = document.createElement('span');
				missableText.className = "missable-text";
				missableText.innerHTML = language.MENU[2];
				
				missable.appendChild(missableText);
				itemListDIV.appendChild(missable);
			}
			
			break;
		
		//ALL ICON
		case 2:
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			itemImage.setAttribute("src", './img/items/allicons/' + LOCATION[locationId].item_field_allicon[itemPos][0] + '.png');
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name";
			
			var itemName = document.createElement('span');
			itemName.innerHTML = language.ITEM[LOCATION[locationId].item_field_allicon[itemPos][0]];
			
			var getDiv = document.createElement('div');
			getDiv.className = "item-get item-get-div";
			
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/common/get.png');
			
			get.num = itemCount;
			get.itemIndex = LOCATION[locationId].item_field_allicon[itemPos][0];
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
			typeImg.setAttribute("src", './img/origin/chest.png');
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
			typeName.innerHTML = language.ITEM_ORIGIN[0];
			
			if(LOCATION[locationId].item_field_allicon[itemPos][4] == true){
				var missable = document.createElement("div");
				missable.className = "missable-container";
				
				var missableText = document.createElement('span');
				missableText.className = "missable-text";
				missableText.innerHTML = language.MENU[2];
				
				missable.appendChild(missableText);
				itemListDIV.appendChild(missable);
			}
			
			break;
		
		//NPC ITEMS
		case 3:
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			var imagePath = './img/items/allicons/' + LOCATION[locationId].item_npc[itemPos][0] + '.png';

			//Colocamos la imágen del objecto correcta, mirando si primero existe en allitems, después en group y sino noicon.
			correctImage(imagePath,itemImage,itemPos);
				
						
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name";
			
			var itemName = document.createElement('span');
			itemName.innerHTML = language.ITEM[LOCATION[locationId].item_npc[itemPos][0]];
			
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
			typeName.innerHTML = language.MENU[3] + language.NPC[LOCATION[locationId].item_npc[itemPos][1]];
			
			if(LOCATION[locationId].item_npc[itemPos][4] == true){
				var missable = document.createElement("div");
				missable.className = "missable-container";
				
				var missableText = document.createElement('span');
				missableText.className = "missable-text";
				missableText.innerHTML = language.MENU[2];
				
				missable.appendChild(missableText);
				itemListDIV.appendChild(missable);
			}
			
			break;
			
			//STEAL ITEMS
			case 4:
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				var imagePath = './img/items/allicons/' + LOCATION[locationId].item_steal[itemPos][0] + '.png';

				//Colocamos la imágen del objecto correcta, mirando si primero existe en allitems, después en group y sino noicon.
				correctImage(imagePath,itemImage,itemPos);
					
							
				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "item-name";
				
				var itemName = document.createElement('span');
				itemName.innerHTML = language.ITEM[LOCATION[locationId].item_steal[itemPos][0]];
				
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
				typeName.innerHTML = language.MENU[4] + language.ENEMY[LOCATION[locationId].item_steal[itemPos][1]];
				
				if(LOCATION[locationId].item_steal[itemPos][2] == true){
					var missable = document.createElement("div");
					missable.className = "missable-container";
					
					var missableText = document.createElement('span');
					missableText.className = "missable-text";
					missableText.innerHTML = language.MENU[2];
					
					missable.appendChild(missableText);
					itemListDIV.appendChild(missable);
				}
				
				break;
			
			//DROP ITEM
			case 5:
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				var imagePath = './img/items/allicons/' + LOCATION[locationId].item_drop[itemPos][0] + '.png';

				//Colocamos la imágen del objecto correcta, mirando si primero existe en allitems, después en group y sino noicon.
				correctImage(imagePath,itemImage,itemPos);
					
							
				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "item-name";
				
				var itemName = document.createElement('span');
				itemName.innerHTML = language.ITEM[LOCATION[locationId].item_drop[itemPos][0]];
				
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
				typeName.innerHTML = language.MENU[5] + language.ENEMY[LOCATION[locationId].item_drop[itemPos][1]];
				
				if(LOCATION[locationId].item_drop[itemPos][2] == true){
					var missable = document.createElement("div");
					missable.className = "missable-container";
					
					var missableText = document.createElement('span');
					missableText.className = "missable-text";
					missableText.innerHTML = language.MENU[2];
					
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
				itemName.innerHTML = LOCATION[locationId].money_field[itemPos][0] + " " + language.MENU[6];
				
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
				typeImg.setAttribute("src", './img/origin/chest.png');
				
				var typeNameDiv = document.createElement('div');
				typeNameDiv.className = "type-name-div";
				
				var typeName = document.createElement('span');
				typeName.className = "type-name";
				typeName.innerHTML = language.ITEM_ORIGIN[0];
				
				break;
			
			//NPC MONEY
			case 7:
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				itemImage.setAttribute("src", './img/common/money.png');

				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "item-name";
				
				var itemName = document.createElement('span');
				itemName.innerHTML = LOCATION[locationId].money_npc[itemPos][0] + " " + language.MENU[6];
				
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
				typeName.innerHTML = language.MENU[3] + language.NPC[LOCATION[locationId].money_npc[itemPos][1]];
				
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
			
			
	}	
	
	itemImageDIV.appendChild(itemImage);
	itemNameDIV.appendChild(itemName);
	typeNameDiv.appendChild(typeName);
	typeImgDiv.appendChild(typeImg);
	typeDiv.appendChild(typeImgDiv);
	typeDiv.appendChild(typeNameDiv);	
	getDiv.appendChild(get);	
	itemListDIV.appendChild(itemImageDIV);
	if(typeEntry!=8){
		itemListDIV.appendChild(itemNameDIV);
	}	
	itemListDIV.appendChild(typeDiv);
	itemListDIV.appendChild(getDiv);	
				
	content.appendChild(itemListDIV);
	
	itemCount++;
}

function checkImageExists(imagePath,successCallback, errorCallback) {
    let testImage = new Image();
	var state;
    
    testImage.onload = function() {
        successCallback();
    };
    
    testImage.onerror = function() {
        errorCallback();
    };
    
    testImage.src = imagePath;
}

function correctImage(imagePath,itemImage,itemPos){
	checkImageExists(imagePath,
		function(){
			//Si existe ponemos el icono de allicons
			itemImage.setAttribute("src", imagePath);
		},
		function(){
			//Si no existe ponemos el icono de groupicons y lo miramos de nuevo
			imagePath = './img/items/groupicons/' + GROUPICONS[LOCATION[locationId].item_npc[itemPos][0]] + '.png';
			
			checkImageExists(imagePath,
				function(){
					//Si existe ponemos el icono de groupicons
					itemImage.setAttribute("src", imagePath);
				},
				function(){
					//Si no existe ponemos el noicons/noicon
					imagePath = './img/items/noicons/noicon.png';
					itemImage.setAttribute("src", imagePath);
				}
			);
		}
	);
}

function showMap(evt) {
  var canvas = document.getElementById('map-img-perma');
  var mapDiv = document.getElementById('map-img-div-perma');

  canvas.src = this.path;

  var location = this.location;
  var mapNumber = this.mapNumber;

  var map = new Image();
  map.src = this.path;
  
  canvas.addEventListener("mousedown", function(e) { 
        getMousePosition(canvas, e); 
    }); 

  map.onload = function () {
    canvas.width = map.width;
    canvas.height = map.height;
    var ctx = canvas.getContext('2d');

	var itemsGroupIcon = new Array();
    var iteamAllIcon = new Array();
    var itemNPCIcon = new Array();
    var moneyNPCIcon = new Array();
    var connections = new Array();

    var itemsNoIcon = new Image();
    itemsNoIcon.src = './img/items/noicons/noicon.png';
	
	var moneyFieldIcon = new Image();
	moneyFieldIcon.src = './img/common/money.png';
	
	for (i = 0; i < location.item_field_gropuicon.length; i++) {
		itemsGroupIcon[i] = new Image();
		itemsGroupIcon[i].setAttribute("src", './img/items/groupicons/' + GROUPICONS[location.item_field_gropuicon[i][0]] + '.png');
    }
	
	for (i = 0; i < location.item_field_allicon.length; i++) {
		iteamAllIcon[i] = new Image();
		iteamAllIcon[i].setAttribute("src", './img/items/allicons/' + location.item_field_allicon[i][0] + '.png');
    }
	
	for (i = 0; i < location.item_npc.length; i++) {
		itemNPCIcon[i] = new Image();
		itemNPCIcon[i].setAttribute("src", './img/npc/' + location.item_npc[i][1] + '.png');
		
    }
	
	//MONEY NPC
	for (i = 0; i < location.money_npc.length; i++) {
		moneyNPCIcon[i] = new Image();
		moneyNPCIcon[i].setAttribute("src", './img/npc/' + location.money_npc[i][1] + '.png');
		
    }
	
    	
	//for (i = 0; i < location.Hidden.length; i++) {
    //  hidden[i] = new Image();
    //  hidden[i].src = './img/items/' + location.Hidden[i] + '.png';
    //}
	//
	//for (i = 0; i < location.NPCItems.length; i++) {
    //  npcItems[i] = new Image();
    //  npcItems[i].src = './img/npc/' + location.NPC[i] + ".png";
    //}
	//
	//for (i = 0; i < location.Connections.length; i++) {
    //  connections[i] = new Image();
    //  connections[i].src = './img/common/connection.png';
    //}

    var showItems = true; // Variable para alternar entre mostrar y ocultar los items
    var showHidden = true; // Variable para alternar entre mostrar y ocultar los hidden items

    // Función para manejar el parpadeo
    function parpadear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas en cada iteración
      ctx.drawImage(map, 0, 0);
	
	//NO ICON
    if (showItems) {
       for (i = 0; i < location.item_field_noicon.length; i++) {
         if (mapNumber == location.item_field_noicon[i][1]) {
           ctx.drawImage(itemsNoIcon, location.item_field_noicon[i][2] - (itemsNoIcon.width/2), location.item_field_noicon[i][3] - (itemsNoIcon.height/2));
         }
       }
	}
	
	//ICON GROUP
	if (showItems) {	
	   for (i = 0; i < location.item_field_gropuicon.length; i++) {
         if (mapNumber == location.item_field_gropuicon[i][1]) {
			ctx.drawImage(itemsGroupIcon[i], location.item_field_gropuicon[i][2] - (itemsGroupIcon[i].width/2), location.item_field_gropuicon[i][3] - (itemsGroupIcon[i].height/2));
         }
       }
     }
	
	//ALL ICON
	if (showItems) {
       for (i = 0; i < location.item_field_allicon.length; i++) {
         if (mapNumber == location.item_field_allicon[i][1]) {
           ctx.drawImage(iteamAllIcon[i], location.item_field_allicon[i][2] - (iteamAllIcon[i].width/2), location.item_field_allicon[i][3] - (iteamAllIcon[i].height/2));
         }
       }
	}
	
	//NPC ICON
	if (showItems) {
       for (i = 0; i < location.item_npc.length; i++) {
         if (mapNumber == location.item_npc[i][2]) {
           ctx.drawImage(itemNPCIcon[i], location.item_npc[i][3] - (itemNPCIcon[i].width/2), location.item_npc[i][4] - (itemNPCIcon[i].height/2));
         }
       }
	}
	
	//MONEY FIELD
	if (showItems) {
       for (i = 0; i < location.money_field.length; i++) {
         if (mapNumber == location.money_field[i][1]) {
           ctx.drawImage(moneyFieldIcon, location.money_field[i][2] - (moneyFieldIcon.width/2), location.money_field[i][3] - (moneyFieldIcon.height/2));
         }
       }
	}
	
	//NPC MONEY
	if (showItems) {
       for (i = 0; i < location.money_npc.length; i++) {
         if (mapNumber == location.money_npc[i][2]) {
           ctx.drawImage(moneyNPCIcon[i], location.money_npc[i][3] - (moneyNPCIcon[i].width/2), location.money_npc[i][4] - (moneyNPCIcon[i].height/2));
         }
       }
	}
	  
	  //if (showItems) {
      //  for (i = 0; i < location.NPCItems.length; i++) {
      //    if (mapNumber == location.NPCItemsCoord[i][0]) {
      //      ctx.drawImage(npcItems[i], location.NPCItemsCoord[i][1] - (npcItems[i].width/2), location.NPCItemsCoord[i][2] - (npcItems[i].height/2));
      //    }
      //  }
      //}
	  //
	  //if (showItems) {
      //  for (i = 0; i < location.Hidden.length; i++) {
      //    if (mapNumber == location.HiddenCoord[i][0]) {
      //      ctx.drawImage(hidden[i], location.HiddenCoord[i][1] - (hidden[i].width/2), location.HiddenCoord[i][2] - (hidden[i].height/2));
      //    }
      //  }
      //}
	  //
	  //if (showItems) {
      //  for (i = 0; i < location.Connections.length; i++) {
      //    if (mapNumber == location.ConectionsCoord[i][0]) {
      //      ctx.drawImage(connections[i], location.ConectionsCoord[i][1] - (connections[i].width/2), location.ConectionsCoord[i][2] - (connections[i].height/2));
		//	ctx.font = `16px "Helvetica"`;
		//	ctx.fillText(location.Connections[i], location.ConectionsCoord[i][1] - (connections[i].width/2) +6, location.ConectionsCoord[i][2] - (connections[i].height/2) +12);
      //    }
      //  }
      //}

      showItems = !showItems; // Alterna el valor de showItems
      showHidden = !showHidden; // Alterna el valor de showHidden
    }

    var intervalId = setInterval(parpadear, 500); // Cambia 500 por el intervalo de parpadeo que desees (en milisegundos)

    // Limpia el intervalo anterior antes de configurar uno nuevo
    function limpiarInterval() {
      clearInterval(intervalId);
    }

    // Limpia el intervalo anterior antes de configurar uno nuevo al cambiar de mapa
    mapDiv.addEventListener('click', limpiarInterval);

  };

  mapDiv.className = "map-img-div";
}

function hideMap(evt){
	var map = document.getElementById('map-img-div-perma');
	map.className = "map-img-div hidden";
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

function getMousePosition(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left; 
    let y = event.clientY - rect.top; 
    console.log(x + ", " + y); 
	//console.log("Items: " + (x-16) + ", " + (y-16)); 
	//console.log("NPCs: " + (x-10) + ", " + (y-16)); 
}

window.onload = function(){
	var langIcon = document.getElementById('lang-icon');
	var es = document.getElementById('es');
	var en = document.getElementById('en');
	var content = document.getElementById('content');
	var logo = document.getElementById('banner');
	var logoImage = document.createElement('img');
	logoImage.id = "game-logo";
	//logoImage.setAttribute("src", './img/pkm_rselgfr/banner_es.png');
	logo.appendChild(logoImage);
	
	es.addEventListener('click', function(){
			logo.innerHTML="";
			//logoImage.setAttribute("src", './img/pkm_rselgfr/banner_es.png');
			logo.appendChild(logoImage);
			changeLanguage("es");
			createMenu();
			guide();
		}, false);	
	en.addEventListener('click', function(){
			logo.innerHTML="";
			//logoImage.setAttribute("src", './img/pkm_rselgfr/banner_en.png');
			logo.appendChild(logoImage);
			changeLanguage("en");
			createMenu();
			guide();
		}, false);
	changeLanguage("es");
	createMenu();
	guide();
}