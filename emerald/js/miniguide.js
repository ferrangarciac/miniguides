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

function fillLocations(){
	var itemCount = 0;
	var content = document.getElementById('content');
	content.innerHTML="";
	
	for(i=0; i<language.LOCATION.length; i++){
		//HEADER (NAME+MAP)
		var locationHeaderDiv = document.createElement('div');
		locationHeaderDiv.className = "location-header-div";
		
		var locationNameDIV = document.createElement('div');
		locationNameDIV.className = "location-name-div";
				
		var locationName = document.createElement('span');
		locationName.innerHTML = language.LOCATION[i];	
		
		locationNameDIV.appendChild(locationName);
		locationHeaderDiv.appendChild(locationNameDIV);
		
		var mapDiv = document.createElement('div');
		mapDiv.className = "location-map-div";
		
		for(z=0; z<DB.LOCATION[i].Maps; z++){
			var mapIconDiv = document.createElement('div');
			mapIconDiv.className = "location-map-icon-div";	
			
			var mapIcon = document.createElement('img');
			mapIcon.className = "map-icon";
			mapIcon.setAttribute("src", './img/typeimages/map.png');

			mapIconDiv.path = './img/maps/' + i + '_' + z + '.png';
			mapIconDiv.location = DB.LOCATION[i];
			mapIconDiv.mapNumber = z;
			
			mapIconDiv.addEventListener('click', showMap, false);			
			
			mapIconDiv.appendChild(mapIcon);

			mapDiv.appendChild(mapIconDiv);
					
		}
		
		var imgMapDiv = document.getElementById('map-img-div-perma');
		imgMapDiv.addEventListener('click', hideMap, false);
		
		locationHeaderDiv.appendChild(mapDiv);
		content.appendChild(locationHeaderDiv);
		
		var minidexDiv = document.createElement('div');
		minidexDiv.className = "location-item-global-div minidex";
		
		var minidexLink = document.createElement('a');
		minidexLink.href = 'https://www.marcrobledo.com/minidex/rse/' + DB.LOCATION[i].MinidexLink;	
		
		minidexLink.innerText = "Pokémon Locations (Minidex)";
		
		minidexDiv.appendChild(minidexLink);
		content.appendChild(minidexDiv);
		
		//ENEMIES
		var enemiesGlobalDiv = document.createElement('div');
		enemiesGlobalDiv.className = "location-enemies-global-div";
		
		//ENEMIES
		for(z=0; z<DB.LOCATION[i].Enemies.length; z++){
			createEnemy(i, z, enemiesGlobalDiv);
		}
		
		//ITEMS
		var itemGlobalDiv = document.createElement('div');
		itemGlobalDiv.className = "location-item-global-div";
		
		var mapItemCount = 0;
		var stolenItemCount = 0;
		var adviceCount = 0;
		var buyCount = 0;
		var npcCount = 0;
		var hiddenCount = 0;
		
		for(z=0; z<DB.LOCATION[i].EntryOrder.length; z++){
			switch(DB.LOCATION[i].EntryOrder[z]){
				case 5:	//MAP ITEMS
					createItem(i, mapItemCount, itemCount, 0, itemGlobalDiv);
					itemCount++;
					mapItemCount++;
					break;
					
				case 6:	//STEAL
					createItem(i, stolenItemCount, itemCount, 1, itemGlobalDiv);
					itemCount++;
					stolenItemCount++;
					break;
					
				case 7: //ADVICES
					createItem(i, adviceCount, itemCount, 2, itemGlobalDiv);
					itemCount++;
					adviceCount++;
					break;
				
				case 8: //BUY
					createItem(i, buyCount, itemCount, 3, itemGlobalDiv);
					itemCount++;
					buyCount++;
					break;
					
				case 9: //NPC ITEMS
					createItem(i, npcCount, itemCount, 4, itemGlobalDiv);
					itemCount++;
					npcCount++;
					break;
				
				case 10: //HIDDEN
					createItem(i, hiddenCount, itemCount, 5, itemGlobalDiv);
					itemCount++;
					hiddenCount++;
					break;
					
			}
		}

		
		
		
		content.appendChild(enemiesGlobalDiv);
		content.appendChild(itemGlobalDiv);
		
		
	}
}

/*
function createEnemy(locationId, enemyId, parentDiv){
	var enemyIndividualDiv  = document.createElement('div');
	enemyIndividualDiv.className = "location-enemies-individual-div";
	enemyIndividualDiv.style.background = 'linear-gradient(to bottom, rgba(0,0,0, 0), rgba(0,0,0, 100)), url("./img/battlefields/' + DB.ENEMYFIELD[DB.LOCATION[locationId].EnemyField[enemyId]] + '.png")';
	enemyIndividualDiv.style.backgroundPosition = 'center';
	
	enemyIndividualDiv.style.backgroundSize = 'cover';
	
	var enemyImgDiv  = document.createElement('div');
	enemyImgDiv.className = "location-enemies-img-div";
	
	var enemyTextDiv = document.createElement('div');
	enemyTextDiv.className = "location-enemies-text-div";
	
	var enemyImg = document.createElement('img');
	enemyImg.className = "location-enemies-img";
	
	enemyImg.src = './img/enemies/' + DB.LOCATION[locationId].Enemies[enemyId] + '.png';
	
	var enemyText = document.createElement('span');
	enemyText.className = "location-enemies-text";
	
	enemyText.innerHTML = language.ENEMIES[DB.LOCATION[locationId].Enemies[enemyId]];
		
	enemyTextDiv.appendChild(enemyText);
	enemyImgDiv.appendChild(enemyImg);
	
	enemyIndividualDiv.appendChild(enemyImgDiv);
	enemyIndividualDiv.appendChild(enemyTextDiv);
	
	parentDiv.appendChild(enemyIndividualDiv);
}
*/

function createItemAll(locationId, itemId, itemCount, typeEntry, parentDiv){
	var itemIndividualDiv  = document.createElement('div');
	itemIndividualDiv.className = "location-item-individual-div";
	
	var typeDiv = document.createElement('div');
	typeDiv.className = "location-type-div";
	
	var typeImgDiv = document.createElement('div');
	typeImgDiv.className = "location-type-img-div";
	
	var typeImg = document.createElement('img');
	typeImg.className = "location-type-img";
	
	//ICONOS INDIVIDUALES DE OBJETOS
	typeImg.src = './img/items/' + itemId + '.png';
		
	
	var typeNameDiv = document.createElement('div');
	typeNameDiv.className = "location-type-name-div";
	
	var typeName = document.createElement('span');
	typeName.className = "location-type-name";
	typeName.innerHTML = language.TYPEENTRY[typeEntry];
	
	var itemTextDiv = document.createElement('div');
	itemTextDiv.className = "location-item-text-div";
	
	var itemText = document.createElement('span');
	itemText.className = "";
	
	itemText.innerHTML = language.ITEMS[itemId];
	
	var getDiv = document.createElement('div');
	getDiv.className = "item-get-div";
	
	var get = document.createElement('img');
	get.className = "get0";
	get.setAttribute("src", './img/get.png');
	
	
	get.num = i;
	get.localVariable = "DB_item_all";
	get.status = localStorage.getItem("DB_item_all_" + i);
	get.addEventListener('click', getItem, false);			
	
	if(get.status=="1"){
		get.className = "get1";
	}else{
		get.className = "get0";
	}
	
	getDiv.appendChild(get);
	
	typeImgDiv.appendChild(typeImg);
	typeNameDiv.appendChild(typeName);	
	typeDiv.appendChild(typeImgDiv);
	typeDiv.appendChild(typeNameDiv);
	
	itemTextDiv.appendChild(itemText);
	
	itemIndividualDiv.appendChild(typeDiv);
	itemIndividualDiv.appendChild(itemTextDiv);
	
	if(typeEntry == 0 || typeEntry == 1 || typeEntry == 3 || typeEntry == 4 || typeEntry == 5){
		itemIndividualDiv.appendChild(getDiv);
	}
		
	parentDiv.appendChild(itemIndividualDiv);
}

function createItem(locationId, itemId, itemCount, typeEntry, parentDiv){ //typeEntry: 0=map item, 1=steal, 2=advices, 3=Buy, 4=NPC Item, 5=Hidden item
	var itemIndividualDiv  = document.createElement('div');
	itemIndividualDiv.className = "location-item-individual-div";
	
	var typeDiv = document.createElement('div');
	typeDiv.className = "location-type-div";
	
	var typeImgDiv = document.createElement('div');
	typeImgDiv.className = "location-type-img-div";
	
	var typeImg = document.createElement('img');
	typeImg.className = "location-type-img";
	
	//ICONOS GRUPALES DE OBJETOS
	/*
	if(typeEntry==0){
		typeImg.src = './img/items/item_' + DB.ITEMS[DB.LOCATION[locationId].Items[itemId]].Icon + '.png';
	}else{
		typeImg.src = './img/typeimages/' + typeEntry + '.png';
	}
	*/
	
	
	//ICONOS INDIVIDUALES DE OBJETOS
	if(typeEntry==0){
		typeImg.src = './img/items/' + DB.LOCATION[locationId].Items[itemId] + '.png';
	}else if(typeEntry==4){
		typeImg.src = './img/npc/' + DB.LOCATION[locationId].NPC[itemId] + '.png';
	}else{
		typeImg.src = './img/typeimages/' + typeEntry + '.png';
	}
	
	
	var typeNameDiv = document.createElement('div');
	typeNameDiv.className = "location-type-name-div";
	
	var typeName = document.createElement('span');
	typeName.className = "location-type-name";
	if(typeEntry==4){
		typeName.innerHTML = language.NPC[DB.LOCATION[locationId].NPC[itemId]];
	}else{
		typeName.innerHTML = language.TYPEENTRY[typeEntry];
	}
	
	var itemTextDiv = document.createElement('div');
	itemTextDiv.className = "location-item-text-div";
	
	var itemText = document.createElement('span');
	itemText.className = "";
	
	var itemIndex;
	
	
	switch(typeEntry){
		case 0:
			itemText.innerHTML = language.ITEMS[DB.LOCATION[locationId].Items[itemId]];
			itemIndex = DB.LOCATION[locationId].Items[itemId];
			break;
		case 1:
			itemText.innerHTML = language.ITEMS[DB.LOCATION[locationId].Steal[itemId]] + ' <img src="./img/typeimages/leftarrow.png"></img> ' + language.ENEMIES[DB.LOCATION[locationId].EnemyStolen[itemId]];
			itemIndex = DB.LOCATION[locationId].Steal[itemId];
			break;			
		case 2:
			itemText.innerHTML = language.ADVICES[DB.LOCATION[locationId].Advice[itemId]];
			break;	
		case 3:
			itemText.innerHTML = language.ITEMS[DB.LOCATION[locationId].Buy[itemId]] + " x" + DB.LOCATION[locationId].BuyAmount[itemId];
			itemIndex = DB.LOCATION[locationId].Buy[itemId];
			break;
		case 4:
			itemText.innerHTML = language.ITEMS[DB.LOCATION[locationId].NPCItems[itemId]];
			itemIndex = DB.LOCATION[locationId].NPCItems[itemId];
			break;
		case 5:
			itemText.innerHTML = language.ITEMS[DB.LOCATION[locationId].Hidden[itemId]];
			itemIndex = DB.LOCATION[locationId].Hidden[itemId];
			break;
	}
	
	var getDiv = document.createElement('div');
	getDiv.className = "item-get-div";
	
	var get = document.createElement('img');
	get.className = "get0";
	get.setAttribute("src", './img/get.png');
	
	if(typeEntry == 0 || typeEntry == 1 || typeEntry == 3 || typeEntry == 4 || typeEntry == 5){
		get.num = itemCount;
		get.itemIndex = itemIndex;
		get.localVariable = "DB_item";
		get.status = localStorage.getItem("DB_item_" + itemCount);
		get.addEventListener('click', getItem, false);			
		
		if(get.status=="1"){
			get.className = "get1";
		}else{
			get.className = "get0";
		}
		
		getDiv.appendChild(get);
	}
	
	typeImgDiv.appendChild(typeImg);
	typeNameDiv.appendChild(typeName);	
	typeDiv.appendChild(typeImgDiv);
	typeDiv.appendChild(typeNameDiv);
	
	itemTextDiv.appendChild(itemText);
	
	itemIndividualDiv.appendChild(typeDiv);
	itemIndividualDiv.appendChild(itemTextDiv);
	
	if(typeEntry == 0 || typeEntry == 1 || typeEntry == 3 || typeEntry == 4 || typeEntry == 5){
		itemIndividualDiv.appendChild(getDiv);
	}
		
	parentDiv.appendChild(itemIndividualDiv);
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

    var items = new Array();
    var npcItems = new Array();
    var hidden = new Array();
	var connections = new Array();

    for (i = 0; i < location.Items.length; i++) {
      items[i] = new Image();
      items[i].src = './img/items/' + location.Items[i] + '.png';
    }
	
	for (i = 0; i < location.Hidden.length; i++) {
      hidden[i] = new Image();
      hidden[i].src = './img/items/' + location.Hidden[i] + '.png';
    }
	
	for (i = 0; i < location.NPCItems.length; i++) {
      npcItems[i] = new Image();
      npcItems[i].src = './img/npc/' + location.NPC[i] + ".png";
    }
	
	for (i = 0; i < location.Connections.length; i++) {
      connections[i] = new Image();
      connections[i].src = './img/common/connection.png';
    }

    var showItems = true; // Variable para alternar entre mostrar y ocultar los items
    var showHidden = true; // Variable para alternar entre mostrar y ocultar los hidden items

    // Función para manejar el parpadeo
    function parpadear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas en cada iteración
      ctx.drawImage(map, 0, 0);

      if (showItems) {
        for (i = 0; i < location.Items.length; i++) {
          if (mapNumber == location.ItemsCoord[i][0]) {
            ctx.drawImage(items[i], location.ItemsCoord[i][1] - (items[i].width/2), location.ItemsCoord[i][2] - (items[i].height/2));
          }
        }
      }
	  
	  if (showItems) {
        for (i = 0; i < location.NPCItems.length; i++) {
          if (mapNumber == location.NPCItemsCoord[i][0]) {
            ctx.drawImage(npcItems[i], location.NPCItemsCoord[i][1] - (npcItems[i].width/2), location.NPCItemsCoord[i][2] - (npcItems[i].height/2));
          }
        }
      }
	  
	  if (showItems) {
        for (i = 0; i < location.Hidden.length; i++) {
          if (mapNumber == location.HiddenCoord[i][0]) {
            ctx.drawImage(hidden[i], location.HiddenCoord[i][1] - (hidden[i].width/2), location.HiddenCoord[i][2] - (hidden[i].height/2));
          }
        }
      }
	  
	  if (showItems) {
        for (i = 0; i < location.Connections.length; i++) {
          if (mapNumber == location.ConectionsCoord[i][0]) {
            ctx.drawImage(connections[i], location.ConectionsCoord[i][1] - (connections[i].width/2), location.ConectionsCoord[i][2] - (connections[i].height/2));
			ctx.font = `16px "Helvetica"`;
			ctx.fillText(location.Connections[i], location.ConectionsCoord[i][1] - (connections[i].width/2) +6, location.ConectionsCoord[i][2] - (connections[i].height/2) +12);
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
	
	if(this.localVariable == "DB_item"){
		localStorage.setItem("DB_item_all_" + this.itemIndex, 1);
		console.log(localStorage.getItem("DB_item_all_" + this.itemIndex));
	}
	
	this.status = !this.status;
}

function getMousePosition(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left; 
    let y = event.clientY - rect.top; 
    console.log("Coordinate x: " + x,  "Coordinate y: " + y); 
    console.log(x + ", " + y); 
	//console.log("Items: " + (x-16) + ", " + (y-16)); 
	//console.log("NPCs: " + (x-10) + ", " + (y-16)); 
}

function showAllItems(){
	var content = document.getElementById('content');
	content.innerHTML = "";
	
	var itemGlobalDiv = document.createElement('div');
		itemGlobalDiv.className = "location-item-global-div";
		
		for(i=0;i<language.ITEMS.length;i++){
			createItemAll(0,i,i,0,itemGlobalDiv);
		}
		
	content.appendChild(itemGlobalDiv);
}

function createMenu(){
	var menu = document.getElementById('menu');
	menu.innerHTML="";
	
	//HEADER (menu)
	var menuHeaderDiv = document.createElement('div');
	menuHeaderDiv.className = "menu-header-div";
	
	//ITEMS BY LOCATION
	
	var optionDivLoc = document.createElement('div');
	optionDivLoc.className = "menu-option-div";
	
	optionDivLoc.addEventListener('click', fillLocations, false);
	
	var optionTextLoc = document.createElement('span');
	optionTextLoc.className = "menu-option-text";
	
	optionTextLoc.innerHTML = language.MENU[0];
		
	optionDivLoc.appendChild(optionTextLoc);
	menuHeaderDiv.appendChild(optionDivLoc);
	
	//ITEMS BY ITEM
	
	var optionDivItem = document.createElement('div');
	optionDivItem.className = "menu-option-div";
	
	optionDivItem.addEventListener('click', showAllItems, false);
	
	var optionTextItem = document.createElement('span');
	optionTextItem.className = "menu-option-text";
	
	optionTextItem.innerHTML = language.MENU[1];
		
	optionDivItem.appendChild(optionTextItem);
	menuHeaderDiv.appendChild(optionDivItem);
	
	//ITEMS BY DIALY
	
	var optionDivDialy = document.createElement('div');
	optionDivDialy.className = "menu-option-div";
	
	var optionTextDialy = document.createElement('span');
	optionTextDialy.className = "menu-option-text";
	
	optionTextDialy.innerHTML = language.MENU[1];
		
	optionDivDialy.appendChild(optionTextDialy);
	menuHeaderDiv.appendChild(optionDivDialy);
		
	menu.appendChild(menuHeaderDiv);
}

window.onload = function(){
	var langIcon = document.getElementById('lang-icon');
	var es = document.getElementById('es');
	var en = document.getElementById('en');
	var content = document.getElementById('content');
	var logo = document.getElementById('banner');
	var logoImage = document.createElement('img');
	logoImage.id = "game-logo";
	logoImage.setAttribute("src", './img/common/banner_es.png');
	logo.appendChild(logoImage);
	
	es.addEventListener('click', function(){
			logo.innerHTML="";
			logoImage.setAttribute("src", './img/common/banner_es.png');
			logo.appendChild(logoImage);
			changeLanguage("es");
			//createMenu();
			fillLocations();
		}, false);	
	en.addEventListener('click', function(){
			logo.innerHTML="";
			logoImage.setAttribute("src", './img/common/banner_en.png');
			logo.appendChild(logoImage);
			changeLanguage("en");
			//createMenu();
			fillLocations();
		}, false);
	changeLanguage("es");
	createMenu();
	fillLocations();
}