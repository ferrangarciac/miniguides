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
		
		for(z=0; z<FF6.LOCATION[i].Maps; z++){
			var mapIconDiv = document.createElement('div');
			mapIconDiv.className = "location-map-icon-div";	
			
			var mapIcon = document.createElement('img');
			mapIcon.className = "map-icon";
			mapIcon.setAttribute("src", './img/typeimages/map.png');

			mapIconDiv.path = './img/maps/' + i + '_' + z + '.png';
			mapIconDiv.location = FF6.LOCATION[i];
			mapIconDiv.mapNumber = z;
			
			mapIconDiv.addEventListener('click', showMap, false);			
			
			mapIconDiv.appendChild(mapIcon);

			mapDiv.appendChild(mapIconDiv);
					
		}
		
		var imgMapDiv = document.getElementById('map-img-div-perma');
		imgMapDiv.addEventListener('click', hideMap, false);
		
		locationHeaderDiv.appendChild(mapDiv);
		content.appendChild(locationHeaderDiv);
		
		//ENEMIES
		var enemiesGlobalDiv = document.createElement('div');
		enemiesGlobalDiv.className = "location-enemies-global-div";
		
		//ENEMIES
		for(z=0; z<FF6.LOCATION[i].Enemies.length; z++){
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
		
		for(z=0; z<FF6.LOCATION[i].EntryOrder.length; z++){
			switch(FF6.LOCATION[i].EntryOrder[z]){
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
					
			}
		}	
		
		content.appendChild(enemiesGlobalDiv);
		content.appendChild(itemGlobalDiv);
	}
}

function createEnemy(locationId, enemyId, parentDiv){
	var enemyIndividualDiv  = document.createElement('div');
	enemyIndividualDiv.className = "location-enemies-individual-div";
	enemyIndividualDiv.style.background = 'linear-gradient(to bottom, rgba(0,0,0, 0), rgba(0,0,0, 100)), url("./img/battlefields/' + FF6.ENEMYFIELD[FF6.LOCATION[locationId].EnemyField[enemyId]] + '.png")';
	enemyIndividualDiv.style.backgroundPosition = 'center';
	
	enemyIndividualDiv.style.backgroundSize = 'cover';
	
	var enemyImgDiv  = document.createElement('div');
	enemyImgDiv.className = "location-enemies-img-div";
	
	var enemyTextDiv = document.createElement('div');
	enemyTextDiv.className = "location-enemies-text-div";
	
	var enemyImg = document.createElement('img');
	enemyImg.className = "location-enemies-img";
	
	enemyImg.src = './img/enemies/' + FF6.LOCATION[locationId].Enemies[enemyId] + '.png';
	
	var enemyText = document.createElement('span');
	enemyText.className = "location-enemies-text";
	
	enemyText.innerHTML = language.ENEMIES[FF6.LOCATION[locationId].Enemies[enemyId]];
		
	enemyTextDiv.appendChild(enemyText);
	enemyImgDiv.appendChild(enemyImg);
	
	enemyIndividualDiv.appendChild(enemyImgDiv);
	enemyIndividualDiv.appendChild(enemyTextDiv);
	
	parentDiv.appendChild(enemyIndividualDiv);
}

function createItem(locationId, itemId, itemCount, typeEntry, parentDiv){ //typeEntry: 0=map item, 1=steal, 2=advices, 3=Buy, 4=NPC Item
	var itemIndividualDiv  = document.createElement('div');
	itemIndividualDiv.className = "location-item-individual-div";
	
	var typeDiv = document.createElement('div');
	typeDiv.className = "location-type-div";
	
	var typeImgDiv = document.createElement('div');
	typeImgDiv.className = "location-type-img-div";
	
	var typeImg = document.createElement('img');
	typeImg.className = "location-type-img";
	typeImg.src = './img/typeimages/' + typeEntry + '.png';
	
	var typeNameDiv = document.createElement('div');
	typeNameDiv.className = "location-type-name-div";
	
	var typeName = document.createElement('span');
	typeName.className = "location-type-name";
	typeName.innerHTML = language.TYPEENTRY[typeEntry];
	
	var itemTextDiv = document.createElement('div');
	itemTextDiv.className = "location-item-text-div";
	
	var itemText = document.createElement('span');
	itemText.className = "";
	
	switch(typeEntry){
		case 0:
			itemText.innerHTML = language.ITEMS[FF6.LOCATION[locationId].Items[itemId]];
			break;
		case 1:
			itemText.innerHTML = language.ITEMS[FF6.LOCATION[locationId].Steal[itemId]] + ' <img src="./img/typeimages/leftarrow.png"></img> ' + language.ENEMIES[FF6.LOCATION[locationId].EnemyStolen[itemId]];
			break;			
		case 2:
			itemText.innerHTML = language.ADVICES[FF6.LOCATION[locationId].Advice[itemId]];
			break;	
		case 3:
			itemText.innerHTML = language.ITEMS[FF6.LOCATION[locationId].Buy[itemId]] + " x" + FF6.LOCATION[locationId].BuyAmount[itemId];
			break;
		case 4:
			itemText.innerHTML = language.ITEMS[FF6.LOCATION[locationId].NPCItems[itemId]] + ' <img src="./img/typeimages/leftarrow.png"></img> ' + ' <img src="./img/npc/'+ FF6.LOCATION[locationId].NPC[itemId] + '.png"></img> ';
			break;
	}
	
	var getDiv = document.createElement('div');
	getDiv.className = "item-get-div";
	
	var get = document.createElement('img');
	get.className = "get0";
	get.setAttribute("src", './img/get.png');
	
	if(typeEntry == 0 || typeEntry == 1 || typeEntry == 3 || typeEntry == 4){
		get.num = itemCount;
		get.localVariable = "ff6_item";
		get.status = localStorage.getItem("ff6_item_" + itemCount);
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
	
	if(typeEntry == 0 || typeEntry == 1 || typeEntry == 3 || typeEntry == 4){
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

    for (i = 0; i < location.Items.length; i++) {
      items[i] = new Image();
      items[i].src = './img/items/' + 'item_9' + ".png";
    }
	
	for (i = 0; i < location.NPCItems.length; i++) {
      npcItems[i] = new Image();
      npcItems[i].src = './img/npc/' + location.NPC[i] + ".png";
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
            ctx.drawImage(items[i], location.ItemsCoord[i][1], location.ItemsCoord[i][2]);
          }
        }
      }
	  
	  if (showItems) {
        for (i = 0; i < location.NPCItems.length; i++) {
          if (mapNumber == location.NPCItemsCoord[i][0]) {
            ctx.drawImage(npcItems[i], location.NPCItemsCoord[i][1], location.NPCItemsCoord[i][2]);
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
	
	this.status = !this.status;
}

function getMousePosition(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left; 
    let y = event.clientY - rect.top; 
    console.log("Coordinate x: " + x,  "Coordinate y: " + y); 
    console.log(x + ", " + y); 
	console.log("Items: " + (x-16) + ", " + (y-16)); 
	console.log("NPCs: " + (x-10) + ", " + (y-16)); 
}

window.onload = function(){
	var langIcon = document.getElementById('lang-icon');
	var es = document.getElementById('es');
	var en = document.getElementById('en');
	var content = document.getElementById('content');
	//var logo = document.getElementById('banner');
	//var logoImage = document.createElement('img');
	//logoImage.id = "game-logo";
	//logoImage.setAttribute("src", './img/pkm_rselgfr/banner_es.png');
	//logo.appendChild(logoImage);
	
	es.addEventListener('click', function(){
			//logo.innerHTML="";
			//logoImage.setAttribute("src", './img/pkm_rselgfr/banner_es.png');
			//logo.appendChild(logoImage);
			changeLanguage("es");
			//createMenu();
			fillLocations();
		}, false);	
	en.addEventListener('click', function(){
			//logo.innerHTML="";
			//logoImage.setAttribute("src", './img/pkm_rselgfr/banner_en.png');
			//logo.appendChild(logoImage);
			changeLanguage("en");
			//createMenu();
			fillLocations();
		}, false);
	changeLanguage("es");
	//createMenu();
	fillLocations();
}