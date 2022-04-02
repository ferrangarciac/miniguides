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
	option1Text.innerHTML = language.OPTIONS[0];
	
	option1.addEventListener('click', fillItemLocation, false);
	
	var option2 = document.createElement('div');
	option2.className = 'option-div';
	
	option2.addEventListener('click', fillItems, false);
	
	var option2Text = document.createElement('span');
	option2Text.className = 'option-text';
	option2Text.innerHTML = language.OPTIONS[1];
	
	var option3 = document.createElement('div');
	option3.className = 'option-div';
	
	option3.addEventListener('click', fillDialyEvents, false);
	
	var option3Text = document.createElement('span');
	option3Text.className = 'option-text';
	option3Text.innerHTML = language.OPTIONS[2];
	
	option1.appendChild(option1Text);
	option2.appendChild(option2Text);
	option3.appendChild(option3Text);
	
	menuDiv.appendChild(option1);
	menuDiv.appendChild(option2);
	menuDiv.appendChild(option3);
	
	menu.appendChild(menuDiv);
}

function fillDialyEvents(){
	var content = document.getElementById('content');
	content.innerHTML="";
	
	for(i=0; i<PKMRS.DIALYEVENTS.length; i++){
		var locationHeaderDiv = document.createElement('div');
		locationHeaderDiv.className = "location-header-div";
		
		var locationNameDIV = document.createElement('div');
		locationNameDIV.className = "location-name-3gen-DIV";
				
		var locationName = document.createElement('span');
		locationName.innerHTML = language.LOCATION3GEN[PKMRS.DIALYEVENTS[i].Id];	
		
		locationNameDIV.appendChild(locationName);
		locationHeaderDiv.appendChild(locationNameDIV);
		
		var mapDiv = document.createElement('div');
		mapDiv.className = "location-map-div";
		
		content.appendChild(locationHeaderDiv);
		
		//npc
		for(x=0;x<PKMRS.DIALYEVENTS[i].NpcItem.length; x++){
			var itemListDIV = document.createElement('div');
			itemListDIV.className = "item-list-DIV";
			
			var item = document.createElement('div');
			item.className = "item";
			
			var itemImageDIV = document.createElement('div');
			itemImageDIV.className = "item-image-DIV";
			
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			itemImage.setAttribute("src", './img/pkm_rselgfr/items/' + PKMRS.DIALYEVENTS[i].NpcItem[x] + ".png");
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name-DIV";
			
			var itemName = document.createElement('span');
			itemName.innerHTML = language.ITEM3GEN[PKMRS.DIALYEVENTS[i].NpcItem[x]];
			
			var getDiv = document.createElement('div');
			getDiv.className = "item-get-DIV item-get-div-3gen";
			
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/pkm_rselgfr/get.png');
			
			get.num = i;
			get.itemIndex = PKMRS.DIALYEVENTS[i].NpcItem[x];
			get.localVariable = "pkmrs_dialy";
			get.status = localStorage.getItem("pkmrs_dialy_" + i);
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
			typeImg.setAttribute("src", './img/pkm_rselgfr/npc/' + PKMRS.DIALYEVENTS[i].Npc[x] + '.png');
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
			typeName.innerHTML = language.NPC3GEN[PKMRS.DIALYEVENTS[i].Npc[x]];		
			
			itemImageDIV.appendChild(itemImage);
			itemNameDIV.appendChild(itemName);
			typeNameDiv.appendChild(typeName);
			typeImgDiv.appendChild(typeImg);
			typeDiv.appendChild(typeImgDiv);
			typeDiv.appendChild(typeNameDiv);			
			getDiv.appendChild(get);
			itemListDIV.appendChild(itemImageDIV);
			itemListDIV.appendChild(itemNameDIV);
			itemListDIV.appendChild(typeDiv);
			itemListDIV.appendChild(getDiv);	

			content.appendChild(itemListDIV);
		}
	}
}

function fillItems(){
	var content = document.getElementById('content');
	content.innerHTML="";
	
	var locationHeaderDiv = document.createElement('div');
	locationHeaderDiv.className = "location-header-div";
	
	var locationNameDIV = document.createElement('div');
	locationNameDIV.className = "location-name-3gen-DIV";
				
	var locationName = document.createElement('span');
	locationName.innerHTML = language.OPTIONS[1];
	
	locationNameDIV.appendChild(locationName);
	locationHeaderDiv.appendChild(locationNameDIV);
	
	content.appendChild(locationHeaderDiv);
	
	for(i=1; i<language.ITEM3GEN.length; i++){
			var excluded = false;
			var nonLocation = false;
			var nonLocationIndex;
			
			for(x=0; x<PKMRS.EXCLUDEDITEMS.length; x++){
				if(i == PKMRS.EXCLUDEDITEMS[x]){
					excluded = true;
				}
			}
			
			for(x=0; x<PKMRS.NONLOCATIONITEMS.length; x++){
				if(i == PKMRS.NONLOCATIONITEMS[x]){
					nonLocation = true;
					nonLocationIndex = x;
				}
			}
			
			if(excluded==false){
				var itemListDIV = document.createElement('div');
				itemListDIV.className = "item-list-DIV";
				
				var item = document.createElement('div');
				item.className = "item";
				
				var itemImageDIV = document.createElement('div');
				itemImageDIV.className = "item-image-DIV";
				
				var itemImage = document.createElement('img');
				itemImage.className = "item-image";
				itemImage.setAttribute("src", './img/pkm_rselgfr/items/' + i + ".png");
				
				var itemNameDIV = document.createElement('div');
				itemNameDIV.className = "item-name-DIV";
				
				var itemName = document.createElement('span');
				itemName.innerHTML = language.ITEM3GEN[i];
				//itemName.innerHTML = i + " - " + language.ITEM3GEN[i];				
				
				var getDiv = document.createElement('div');
				getDiv.className = "item-get-DIV item-get-div-3gen";
				
				var get = document.createElement('img');
				get.className = "get0";
				get.setAttribute("src", './img/pkm_rselgfr/get.png');
				
				get.num = i;
				get.localVariable = "pkmrs_item";
				get.status = localStorage.getItem("pkmrs_item_" + i);
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
				
				if(nonLocation == true){
					typeName.innerHTML = language.NONLOCITEMGET[nonLocationIndex];
				}else{
					typeName.innerHTML = language.NONLOCITEMGET[language.NONLOCITEMGET.length-1];
				}
				
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
			}
			
			itemCount+=1;
		}
	
}

function fillItemLocation(){
	itemCount = 0;
	var content = document.getElementById('content');
	content.innerHTML="";
	
	for(i=0; i<language.LOCATION3GEN.length; i++){
		var locationHeaderDiv = document.createElement('div');
		locationHeaderDiv.className = "location-header-div";
		
		var locationNameDIV = document.createElement('div');
		locationNameDIV.className = "location-name-3gen-DIV";
				
		var locationName = document.createElement('span');
		locationName.innerHTML = language.LOCATION3GEN[i];	
		
		locationNameDIV.appendChild(locationName);
		locationHeaderDiv.appendChild(locationNameDIV);
		
		var mapDiv = document.createElement('div');
		mapDiv.className = "location-map-div";
		
		for(z=0; z<PKMRS.LOCATION[i].Maps; z++){
			var mapIconDiv = document.createElement('div');
			mapIconDiv.className = "location-map-icon-div";	
			
			var mapIcon = document.createElement('img');
			mapIcon.className = "map-icon";
			mapIcon.setAttribute("src", './img/pkm_rselgfr/mapicon.png');
			
			
			
			// var imgMapDiv = document.createElement('div');
			// imgMapDiv.className = "map-img-div hidden";	
			
			// var imgMapContainer = document.createElement('div');
			// imgMapContainer.className = "map-img-container";
			
			// var mapImg = document.createElement('img');
			// mapImg.className = "map-img";
			// mapImg.src = './img/pkm_rselgfr/maps/' + i + "_" + z + ".gif";
			
			//mapIconDiv.map = imgMapDiv;
			mapIconDiv.path = './img/pkm_rselgfr/maps/' + i + '_' + z + '.gif';
			
			mapIconDiv.addEventListener('click', showMap, false);			
			
			mapIconDiv.appendChild(mapIcon);
			//imgMapContainer.appendChild(mapImg);
			//imgMapDiv.appendChild(imgMapContainer);
			mapDiv.appendChild(mapIconDiv);
			
			//document.body.appendChild(imgMapDiv);
			
		}
		
		var imgMapDiv = document.getElementById('map-img-div-perma');
		imgMapDiv.addEventListener('click', hideMap, false);
		
		locationHeaderDiv.appendChild(mapDiv);
		content.appendChild(locationHeaderDiv);
		
		
		
		
		//items
		for(x=0;x<PKMRS.LOCATION[i].Items.length; x++){
			var itemListDIV = document.createElement('div');
			itemListDIV.className = "item-list-DIV";
			
			var item = document.createElement('div');
			item.className = "item";
			
			var itemImageDIV = document.createElement('div');
			itemImageDIV.className = "item-image-DIV";
			
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			itemImage.setAttribute("src", './img/pkm_rselgfr/items/' + PKMRS.LOCATION[i].Items[x] + ".png");
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name-DIV";
			
			var itemName = document.createElement('span');
			itemName.innerHTML = language.ITEM3GEN[PKMRS.LOCATION[i].Items[x]];
			//itemName.innerHTML = PKMRS.LOCATION[i].Items[x] + " " + PKMRS.LOCATION[i].Items[x].toString(16);
			
			var getDiv = document.createElement('div');
			getDiv.className = "item-get-DIV item-get-div-3gen";
			
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/pkm_rselgfr/get.png');
			
			get.num = itemCount;
			get.itemIndex = PKMRS.LOCATION[i].Items[x];
			get.localVariable = "pkmrs";
			get.status = localStorage.getItem("pkmrs_" + itemCount);
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
			typeImg.setAttribute("src", './img/pkm_rselgfr/npc/0.png');
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
			typeName.innerHTML = language.NPC3GEN[0];
			
			itemImageDIV.appendChild(itemImage);
			itemNameDIV.appendChild(itemName);
			typeNameDiv.appendChild(typeName);
			typeImgDiv.appendChild(typeImg);
			typeDiv.appendChild(typeImgDiv);
			typeDiv.appendChild(typeNameDiv);			
			getDiv.appendChild(get);
			itemListDIV.appendChild(itemImageDIV);
			itemListDIV.appendChild(itemNameDIV);
			itemListDIV.appendChild(typeDiv);
			itemListDIV.appendChild(getDiv);	
						
			content.appendChild(itemListDIV);
			
			itemCount+=1;
		}
		
		//hidden
		for(x=0;x<PKMRS.LOCATION[i].Hidden.length; x++){
			var itemListDIV = document.createElement('div');
			itemListDIV.className = "item-list-DIV";
			
			var item = document.createElement('div');
			item.className = "item";
			
			var itemImageDIV = document.createElement('div');
			itemImageDIV.className = "item-image-DIV";
			
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			itemImage.setAttribute("src", './img/pkm_rselgfr/items/' + PKMRS.LOCATION[i].Hidden[x] + ".png");
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name-DIV";
			
			var itemName = document.createElement('span');
			itemName.innerHTML = language.ITEM3GEN[PKMRS.LOCATION[i].Hidden[x]];
			//itemName.innerHTML = PKMRS.LOCATION[i].Hidden[x] + " " + PKMRS.LOCATION[i].Hidden[x].toString(16);
			
			var getDiv = document.createElement('div');
			getDiv.className = "item-get-DIV item-get-div-3gen";
			
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/pkm_rselgfr/get.png');
			
			get.num = itemCount;
			get.itemIndex = PKMRS.LOCATION[i].Hidden[x];
			get.localVariable = "pkmrs";
			get.status = localStorage.getItem("pkmrs_" + itemCount);
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
			typeImg.setAttribute("src", './img/pkm_rselgfr/npc/1.png');
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
			typeName.innerHTML = language.NPC3GEN[1];
			
			itemImageDIV.appendChild(itemImage);
			itemNameDIV.appendChild(itemName);
			typeNameDiv.appendChild(typeName);
			typeImgDiv.appendChild(typeImg);
			typeDiv.appendChild(typeImgDiv);
			typeDiv.appendChild(typeNameDiv);			
			getDiv.appendChild(get);
			itemListDIV.appendChild(itemImageDIV);
			itemListDIV.appendChild(itemNameDIV);
			itemListDIV.appendChild(typeDiv);
			itemListDIV.appendChild(getDiv);	
						
			content.appendChild(itemListDIV);
			
			itemCount+=1;
		}
		
		//npc
		for(x=0;x<PKMRS.LOCATION[i].NpcItem.length; x++){
			var itemListDIV = document.createElement('div');
			itemListDIV.className = "item-list-DIV";
			
			var item = document.createElement('div');
			item.className = "item";
			
			var itemImageDIV = document.createElement('div');
			itemImageDIV.className = "item-image-DIV";
			
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			itemImage.setAttribute("src", './img/pkm_rselgfr/items/' + PKMRS.LOCATION[i].NpcItem[x] + ".png");
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name-DIV";
			
			var itemName = document.createElement('span');
			itemName.innerHTML = language.ITEM3GEN[PKMRS.LOCATION[i].NpcItem[x]];
			
			var getDiv = document.createElement('div');
			getDiv.className = "item-get-DIV item-get-div-3gen";
			
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/pkm_rselgfr/get.png');
			
			get.num = itemCount;
			get.itemIndex = PKMRS.LOCATION[i].NpcItem[x];
			get.localVariable = "pkmrs";
			get.status = localStorage.getItem("pkmrs_" + itemCount);
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
			typeImg.setAttribute("src", './img/pkm_rselgfr/npc/' + PKMRS.LOCATION[i].Npc[x] + '.png');
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
			typeName.innerHTML = language.NPC3GEN[PKMRS.LOCATION[i].Npc[x]];		
			
			itemImageDIV.appendChild(itemImage);
			itemNameDIV.appendChild(itemName);
			typeNameDiv.appendChild(typeName);
			typeImgDiv.appendChild(typeImg);
			typeDiv.appendChild(typeImgDiv);
			typeDiv.appendChild(typeNameDiv);			
			getDiv.appendChild(get);
			itemListDIV.appendChild(itemImageDIV);
			itemListDIV.appendChild(itemNameDIV);
			itemListDIV.appendChild(typeDiv);
			itemListDIV.appendChild(getDiv);	

			content.appendChild(itemListDIV);
			
			itemCount+=1;
		}
		
		//Pokemon
		for(x=0;x<PKMRS.LOCATION[i].Pokemon.length; x++){
			var itemListDIV = document.createElement('div');
			itemListDIV.className = "item-list-DIV";
			
			var item = document.createElement('div');
			item.className = "item";
			
			var itemImageDIV = document.createElement('div');
			itemImageDIV.className = "item-image-DIV";
			
			var itemImage = document.createElement('img');
			itemImage.className = "item-image pkm-img";
			itemImage.setAttribute("src", './img/pkm_rselgfr/pkm/' + PKMRS.LOCATION[i].Pokemon[x] + ".png");
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name-DIV";
			
			var itemName = document.createElement('span');
			itemName.innerHTML = language.POKEMON[PKMRS.LOCATION[i].Pokemon[x]];
			
			var getDiv = document.createElement('div');
			getDiv.className = "item-get-DIV item-get-div-3gen";
			
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/pkm_rselgfr/get.png');
			
			get.num = itemCount;
			get.localVariable = "pkmrs";
			get.status = localStorage.getItem("pkmrs_" + itemCount);
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
			typeImg.setAttribute("src", './img/pkm_rselgfr/npc/51.png');
			
			var typeNameDiv = document.createElement('div');
			typeNameDiv.className = "type-name-div";
			
			var typeName = document.createElement('span');
			typeName.className = "type-name";
			typeName.innerHTML = language.NPC3GEN[51];		
			
			itemImageDIV.appendChild(itemImage);
			itemNameDIV.appendChild(itemName);
			typeNameDiv.appendChild(typeName);
			typeImgDiv.appendChild(typeImg);
			typeDiv.appendChild(typeImgDiv);
			typeDiv.appendChild(typeNameDiv);			
			getDiv.appendChild(get);
			itemListDIV.appendChild(itemImageDIV);
			itemListDIV.appendChild(itemNameDIV);
			itemListDIV.appendChild(typeDiv);
			itemListDIV.appendChild(getDiv);	
						
			content.appendChild(itemListDIV);
			
			itemCount+=1;
		}
		
	}
}

function showMap(evt){
	var img = document.getElementById('map-img-perma');
	var map = document.getElementById('map-img-div-perma');
	img.src = this.path;
	map.className = "map-img-div";
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
	
	if(this.localVariable == "pkmrs"){
		localStorage.setItem("pkmrs_item_" + this.itemIndex, 1);
	}
	
	this.status = !this.status;
}

window.onload = function(){
	var langIcon = document.getElementById('lang-icon');
	var es = document.getElementById('es');
	var en = document.getElementById('en');
	var content = document.getElementById('content');
	var logo = document.getElementById('banner');
	var logoImage = document.createElement('img');
	logoImage.id = "game-logo";
	logoImage.setAttribute("src", './img/pkm_rselgfr/banner_es.png');
	logo.appendChild(logoImage);
	
	es.addEventListener('click', function(){
			logo.innerHTML="";
			logoImage.setAttribute("src", './img/pkm_rselgfr/banner_es.png');
			logo.appendChild(logoImage);
			changeLanguage("es");
			createMenu();
			fillItemLocation();
		}, false);	
	en.addEventListener('click', function(){
			logo.innerHTML="";
			logoImage.setAttribute("src", './img/pkm_rselgfr/banner_en.png');
			logo.appendChild(logoImage);
			changeLanguage("en");
			createMenu();
			fillItemLocation();
		}, false);
	changeLanguage("es");
	createMenu();
	fillItemLocation();
}