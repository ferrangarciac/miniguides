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
	option1Text.innerHTML = language.COMMON[0];
	
	option1.addEventListener('click', guide, false);
	
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
		
		section.sectionId = "location-" + i;
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
	
	menu.appendChild(menuDiv);
	menu.appendChild(option3ListInput);
	menu.appendChild(sectionMenuDiv);
	
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
	sectionName.innerHTML = language.COMMON[1];
	
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
						typeImg.setAttribute("src", './img/item/npc/' + LOCATION[x].item_npc[y][1] + '.png');
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
						
			content.appendChild(itemListDIV);
		}else{
			countExcluded++;
		}
	}	
}

function goToSection(){
	var option3ListInput = document.getElementById('section-list');
	option3ListInput.checked = false;
	
	var section = document.getElementById(this.sectionId);
    window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
    });
}

function guide(){
	var itemCount = 0;
	var content = document.getElementById('content');
	content.innerHTML="";
	
	for(i=0; i<language.LOCATION.length; i++){
		var locationHeaderDiv = document.createElement('div');
		locationHeaderDiv.className = "section-header";
		locationHeaderDiv.id = "location-" + i;
		
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
		var itemFieldCount = 0;
		var itemNPCCount = 0;
		var itemBuyCount = 0;
		var itemStealCount = 0;
		var itemDropCount = 0;
		var moneyFieldCount = 0;
		var moneyNPCCount = 0;
		var achivementCount = 0;
		var advicesCount = 0;
		
		for(z=0; z<LOCATION[i].entry_order.length; z++){
			switch(LOCATION[i].entry_order[z]){
				case 0:	//ITEM ICON
					createEntry(i, itemFieldCount, entryCount, 0, itemGlobalDiv);
					entryCount++;
					itemFieldCount++;
					break;
					
				case 1:	//NPC ITEM
					createEntry(i, itemNPCCount, entryCount, 1, itemGlobalDiv);
					entryCount++;
					itemNPCCount++;
					break;
					
				case 2:	//BUY ITEM
					createEntry(i, itemBuyCount, entryCount, 2, itemGlobalDiv);
					entryCount++;
					itemBuyCount++;
					break;
					
				case 3:	//STEAL ITEM
					createEntry(i, itemStealCount, entryCount, 3, itemGlobalDiv);
					entryCount++;
					itemStealCount++;
					break;
					
				case 4:	//DROP ITEM
					createEntry(i, itemDropCount, entryCount, 4, itemGlobalDiv);
					entryCount++;
					itemDropCount++;
					break;
					
				case 5:	//MONEY FIELD
					createEntry(i, moneyFieldCount, entryCount, 5, itemGlobalDiv);
					entryCount++;
					moneyFieldCount++;
					break;
					
				case 6:	//MONEY NPC
					createEntry(i, moneyNPCCount, entryCount, 6, itemGlobalDiv);
					entryCount++;
					moneyNPCCount++;
					break;
					
				case 7:	//ACHIEVEMENTS
					createEntry(i, achivementCount, entryCount, 7, itemGlobalDiv);
					entryCount++;
					achivementCount++;
					break;
					
				case 8:	//ADVICES
					createEntry(i, advicesCount, entryCount, 8, itemGlobalDiv);
					entryCount++;
					advicesCount++;
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
		//ITEM ICON
		case 0:
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name";
			
			var itemName = document.createElement('span');
			
			switch (item_icon_type){
				case 0:
					itemImage.setAttribute("src", './img/items/allicons/' + LOCATION[locationId].item_field[itemPos][0] + '.png');
					itemName.innerHTML = language.ITEM[LOCATION[locationId].item_field[itemPos][0]];
					break;
				case 1:
					itemImage.setAttribute("src", './img/items/groupicons/' + GROUPICONS[LOCATION[locationId].item_field[itemPos][0]] + '.png');
					itemName.innerHTML = (itemPos + 1) + " - " + language.ITEM[LOCATION[locationId].item_field[itemPos][0]];
					break;
				case 2:
					itemImage.setAttribute("src", './img/items/noicons/noicon.png');
					itemName.innerHTML = (itemPos + 1) + " - " + language.ITEM[LOCATION[locationId].item_field[itemPos][0]];
					break;
			}
						
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
			
			if(LOCATION[locationId].item_field[itemPos][4] == true){
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
			
			switch (item_icon_type){
				case 0:
					itemImage.setAttribute("src", './img/items/allicons/' + LOCATION[locationId].item_buy[itemPos][0] + '.png');
					itemName.innerHTML = language.ITEM[LOCATION[locationId].item_buy[itemPos][0]] + " " + LOCATION[locationId].item_buy[itemPos][1];
					break;
				case 1:
					itemImage.setAttribute("src", './img/items/groupicons/' + GROUPICONS[LOCATION[locationId].item_buy[itemPos][0]] + '.png');
					itemName.innerHTML = language.ITEM[LOCATION[locationId].item_buy[itemPos][0]] + " " + LOCATION[locationId].item_buy[itemPos][1];
					break;
				case 2:
					itemImage.setAttribute("src", './img/items/noicons/noicon.png');
					itemName.innerHTML = language.ITEM[LOCATION[locationId].item_buy[itemPos][0]] + " " + LOCATION[locationId].item_buy[itemPos][1];
					break;
			}
						
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
			
			if(LOCATION[locationId].item_buy[itemPos][4] == true){
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
			
			//FIELD MONEY
			case 5:
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				itemImage.setAttribute("src", './img/common/money.png');
				
				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "item-name";
				
				var itemName = document.createElement('span');
				itemName.innerHTML = LOCATION[locationId].money_field[itemPos][0] + " " + language.COMMON[6];
				
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
			case 6:
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				itemImage.setAttribute("src", './img/common/money.png');

				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "item-name";
				
				var itemName = document.createElement('span');
				itemName.innerHTML = LOCATION[locationId].money_npc[itemPos][0] + " " + language.COMMON[6];
				
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
			case 7:
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
				
			case 8:
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
	
	if(typeEntry==8){
		itemListDIV.appendChild(typeDiv);
	}
	
	typeDiv.appendChild(typeImgDiv);
	typeDiv.appendChild(typeNameDiv);	
	getDiv.appendChild(get);	
	
	if(typeEntry!=8){
		itemListDIV.appendChild(itemImageDIV);
	}
	
	if(typeEntry!=7){
		itemListDIV.appendChild(itemNameDIV);
	}	
	
	if(typeEntry!=8){
		itemListDIV.appendChild(typeDiv);;
	}
	
	
	itemListDIV.appendChild(getDiv);	
				
	content.appendChild(itemListDIV);
	
	itemCount++;
}

function showMap(evt) {
  var canvas = document.getElementById('map-img-perma');
  var mapDiv = document.getElementById('map-img-div-perma');

  canvas.src = this.path;

  var location = this.location;
  var mapNumber = this.mapNumber;
	
	canvas.mapNumber = mapNumber;

  var map = new Image();
  map.src = this.path;
  
  canvas.addEventListener("mousedown", function(e) { 
        getMousePosition(canvas, e); 
    }); 

  map.onload = function () {
    canvas.width = map.width;
    canvas.height = map.height;
    var ctx = canvas.getContext('2d');

    var itemNPCIcon = new Array();
    var moneyNPCIcon = new Array();
    var connections = new Image();
	var markIcon = new Array();
	
	switch (item_icon_type){
		case 0:
			var itemIcon = new Array();
			for (i = 0; i < location.item_field.length; i++) {
				itemIcon[i] = new Image();
				itemIcon[i].setAttribute("src", './img/items/allicons/' + location.item_field[i][0] + '.png');
			}
			break;
		case 1:
			var itemIcon = new Array();
			for (i = 0; i < location.item_field.length; i++) {
				itemIcon[i] = new Image();
				itemIcon[i].setAttribute("src", './img/items/groupicons/' + GROUPICONS[location.item_field[i][0]] + '.png');
			}
			break;
		case 2:
			var itemsNoIcon = new Image();
			itemsNoIcon.src = './img/items/noicons/noicon.png';
			break;
	}
	
	var moneyFieldIcon = new Image();
	moneyFieldIcon.src = './img/common/money.png';	
	
	//NPC ITEMS
	for (i = 0; i < location.item_npc.length; i++) {
		itemNPCIcon[i] = new Image();
		itemNPCIcon[i].setAttribute("src", './img/npc/' + location.item_npc[i][1] + '.png');
		
    }
	
	//MONEY NPC
	for (i = 0; i < location.money_npc.length; i++) {
		moneyNPCIcon[i] = new Image();
		moneyNPCIcon[i].setAttribute("src", './img/npc/' + location.money_npc[i][1] + '.png');
		
    }
	
	//SPECIAL MAP MARKS
	for (i = 0; i < location.map_special_mark.length; i++) {
		markIcon[i] = new Image();
		markIcon[i].setAttribute("src", './img/marks/' + location.map_special_mark[i][1] + '.png');
		
    }

     connections.src = './img/common/connection.png';
	
    var showItems = true; // Variable para alternar entre mostrar y ocultar los items
    var showHidden = true; // Variable para alternar entre mostrar y ocultar los hidden items

    // Función para manejar el parpadeo
    function parpadear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas en cada iteración
      ctx.drawImage(map, 0, 0);
	
	//ICON FIELD
    if (showItems) {
		switch (item_icon_type){
			case 0:
				for (i = 0; i < location.item_field.length; i++) {
					if (mapNumber == location.item_field[i][1]) {
						ctx.drawImage(itemIcon[i], location.item_field[i][2] - (itemIcon[i].width/2), location.item_field[i][3] - (itemIcon[i].height/2));
					}
				}			
				break;
			case 1:
				for (i = 0; i < location.item_field.length; i++) {
					if (mapNumber == location.item_field[i][1]) {
						ctx.drawImage(itemIcon[i], location.item_field[i][2] - (itemIcon[i].width/2), location.item_field[i][3] - (itemIcon[i].height/2));
						
						ctx.font = `16px "Helvetica"`;
						ctx.textAlign = "center"; 
						ctx.fillStyle = "rgb(0,0,0)";
						ctx.fillText(i, location.item_field[i][2]-1, location.item_field[i][3]-1);//
						ctx.fillText(i, location.item_field[i][2]+1, location.item_field[i][3]-1);//
						ctx.fillText(i, location.item_field[i][2]-1, location.item_field[i][3]);//
						ctx.fillText(i, location.item_field[i][2]+1, location.item_field[i][3]);//
						ctx.fillText(i, location.item_field[i][2]-1, location.item_field[i][3]+1);//
						ctx.fillText(i, location.item_field[i][2]+1, location.item_field[i][3]+1);//
						ctx.fillStyle = "rgb(255,255,255)";
						ctx.fillText(i, location.item_field[i][2], location.item_field[i][3]);//
					}
				}		
				break;
			case 2:
				for (i = 0; i < location.item_field.length; i++) {
					if (mapNumber == location.item_field[i][1]) {
						ctx.drawImage(itemsNoIcon, location.item_field[i][2] - (itemsNoIcon.width/2), location.item_field[i][3] - (itemsNoIcon.height/2));
						
						ctx.font = `16px "Helvetica"`;
						ctx.textAlign = "center"; 
						ctx.fillStyle = "rgb(0,0,0)";
						ctx.fillText(i, location.item_field[i][2]-1, location.item_field[i][3]-1);//
						ctx.fillText(i, location.item_field[i][2]+1, location.item_field[i][3]-1);//
						ctx.fillText(i, location.item_field[i][2]-1, location.item_field[i][3]);//
						ctx.fillText(i, location.item_field[i][2]+1, location.item_field[i][3]);//
						ctx.fillText(i, location.item_field[i][2]-1, location.item_field[i][3]+1);//
						ctx.fillText(i, location.item_field[i][2]+1, location.item_field[i][3]+1);//
						ctx.fillStyle = "rgb(255,255,255)";
						ctx.fillText(i, location.item_field[i][2], location.item_field[i][3]);//
					}
				}
				break;
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
	
	//CONNECTIONS
 	if (showItems) {
      for (i = 0; i < location.map_connections.length; i++) {
        if (mapNumber == location.map_connections[i][1]) {
          ctx.drawImage(connections, location.map_connections[i][2] - (connections.width/2), location.map_connections[i][3] - (connections.height/2));
			ctx.font = `11px "Helvetica"`;
			ctx.textAlign = "center"; 
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.fillText(location.map_connections[i][0], location.map_connections[i][2]-1, location.map_connections[i][3]-1);//
			ctx.fillText(location.map_connections[i][0], location.map_connections[i][2]+1, location.map_connections[i][3]-1);//
			ctx.fillText(location.map_connections[i][0], location.map_connections[i][2]-1, location.map_connections[i][3]);//
			ctx.fillText(location.map_connections[i][0], location.map_connections[i][2]+1, location.map_connections[i][3]);//
			ctx.fillText(location.map_connections[i][0], location.map_connections[i][2]-1, location.map_connections[i][3]+1);//
			ctx.fillText(location.map_connections[i][0], location.map_connections[i][2]+1, location.map_connections[i][3]+1);//
			ctx.fillStyle = "rgb(255,255,255)";
			ctx.fillText(location.map_connections[i][0], location.map_connections[i][2], location.map_connections[i][3]);//
        }
      }
    }
	
	//SPECIAL MAP MARKS
	if (showItems) {
      for (i = 0; i < location.map_special_mark.length; i++) {
        if (mapNumber == location.map_special_mark[i][2]) {
          ctx.drawImage(markIcon[i], location.map_special_mark[i][3] - (markIcon[i].width/2), location.map_special_mark[i][4] - (markIcon[i].height/2));
			ctx.font = `11px "Helvetica"`;
			ctx.textAlign = "center"; 
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.fillText(location.map_special_mark[i][0], location.map_special_mark[i][3]-1, location.map_special_mark[i][4]-1);//
			ctx.fillText(location.map_special_mark[i][0], location.map_special_mark[i][3]+1, location.map_special_mark[i][4]-1);//
			ctx.fillText(location.map_special_mark[i][0], location.map_special_mark[i][3]-1, location.map_special_mark[i][4]);//
			ctx.fillText(location.map_special_mark[i][0], location.map_special_mark[i][3]+1, location.map_special_mark[i][4]);//
			ctx.fillText(location.map_special_mark[i][0], location.map_special_mark[i][3]-1, location.map_special_mark[i][4]+1);//
			ctx.fillText(location.map_special_mark[i][0], location.map_special_mark[i][3]+1, location.map_special_mark[i][4]+1);//
			ctx.fillStyle = "rgb(255,255,255)";
			ctx.fillText(location.map_special_mark[i][0], location.map_special_mark[i][3], location.map_special_mark[i][4]);//
        }
      }
    }

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
	if(map_debugging){
		let rect = canvas.getBoundingClientRect(); 
		let x = event.clientX - rect.left; 
		let y = event.clientY - rect.top; 
		console.log(canvas.mapNumber + ", " + x + ", " + y); 
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