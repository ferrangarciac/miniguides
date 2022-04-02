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

function fillPKMSHSW_ARMOR(){
	itemCount = 0;
	var content = document.getElementById('content');
		
	for(i=0; i<PKMSHSW_ARMOR.LOCATION.length; i++){
		var locationNameDIV = document.createElement('div');
		locationNameDIV.className = "location-name-DIV";
				
		var locationName = document.createElement('span');
		locationName.innerHTML = language.LOCATION[i];	
		
		locationNameDIV.appendChild(locationName);
		content.appendChild(locationNameDIV);
		
		//items
		for(x=0;x<PKMSHSW_ARMOR.LOCATION[i].Items.length; x++){
			var itemListDIV = document.createElement('div');
			itemListDIV.className = "item-list-DIV";
			
			var item = document.createElement('div');
			item.className = "item";
			
			var itemImageDIV = document.createElement('div');
			itemImageDIV.className = "item-image-DIV";
			
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			itemImage.setAttribute("src", './img/pkm_shsw/item/' + PKMSHSW_ARMOR.LOCATION[i].Items[x] + ".png");
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name-DIV";
			
			var itemName = document.createElement('span');
			itemName.innerHTML = language.ITEM[PKMSHSW_ARMOR.LOCATION[i].Items[x]];
			
			var itemCaptureIconDIV = document.createElement('div');
			itemCaptureIconDIV.className = "item-capture-icon-DIV";
			
			var itemCaptureIcon = document.createElement('img');
			itemCaptureIcon.className = "item-capture-icon";
			itemCaptureIcon.setAttribute("src", './img/pkm_shsw/capture.png');
			
			var captureDiv = document.createElement('div');
			captureDiv.className = "item-capture-DIV hidden";
			
			var capture = document.createElement('img');
			capture.className = "capture";
			capture.setAttribute("src", './img/pkm_shsw/location/' + PKMSHSW_ARMOR.LOCATION[i].Id + '_i_' + PKMSHSW_ARMOR.LOCATION[i].Items[x] + ".jpg");
			capture.onerror = function() {this.setAttribute("src", './img/pkm_shsw/location/notavailable.jpg');};
			
			var getDiv = document.createElement('div');
			getDiv.className = "item-get-DIV";
			
			var get = document.createElement('img');
			get.className = "get0";
			get.setAttribute("src", './img/pkm_shsw/get.png');
			
			get.num = itemCount;
			get.game = "pkmshsw";
			get.status = localStorage.getItem("pkmshsw_armor_" + itemCount);
			get.addEventListener('click', getItem, false);			
			
			if(get.status=="1"){
				get.className = "get1";
			}else{
				get.className = "get0";
			}
			
			itemCaptureIcon.capture = captureDiv;
			itemCaptureIcon.captureStatus = false;
			
			itemCaptureIcon.addEventListener('click', showCapture, false);			
			
			itemImageDIV.appendChild(itemImage);
			itemNameDIV.appendChild(itemName);
			itemCaptureIconDIV.appendChild(itemCaptureIcon);
			getDiv.appendChild(get);
			captureDiv.appendChild(capture);
			itemListDIV.appendChild(itemImageDIV);
			itemListDIV.appendChild(itemNameDIV);
			itemListDIV.appendChild(itemCaptureIconDIV);	
			itemListDIV.appendChild(getDiv);	
			itemListDIV.appendChild(captureDiv);	
						
			content.appendChild(itemListDIV);
			
			itemCount+=1;
		}
		
		//apricorn girls
		for(x=0;x<PKMSHSW_ARMOR.LOCATION[i].Apricorn_girls.length; x++){
			var itemListDIV = document.createElement('div');
			itemListDIV.className = "item-list-DIV";
			
			var item = document.createElement('div');
			item.className = "item";
			
			var itemImageDIV = document.createElement('div');
			itemImageDIV.className = "item-image-DIV";
			
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			itemImage.setAttribute("src", './img/pkm_shsw/item/rainbowapricorn.png');
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name-DIV";
			
			var itemName = document.createElement('span');
			itemName.innerHTML = language.NPC[0];
			
			var itemCaptureIconDIV = document.createElement('div');
			itemCaptureIconDIV.className = "item-capture-icon-DIV";
			
			var itemCaptureIcon = document.createElement('img');
			itemCaptureIcon.className = "item-capture-icon";
			itemCaptureIcon.setAttribute("src", './img/pkm_shsw/capture.png');
			
			var captureDiv = document.createElement('div');
			captureDiv.className = "item-capture-DIV hidden";
			
			var capture = document.createElement('img');
			capture.className = "capture";
			capture.setAttribute("src", './img/pkm_shsw/location/' + PKMSHSW_ARMOR.LOCATION[i].Id + '_ag_' + PKMSHSW_ARMOR.LOCATION[i].Apricorn_girls[x] + ".jpg");
			
			itemCaptureIcon.capture = captureDiv;
			itemCaptureIcon.captureStatus = false;
			
			itemCaptureIcon.addEventListener('click', showCapture, false);			
			
			itemImageDIV.appendChild(itemImage);
			itemNameDIV.appendChild(itemName);
			itemCaptureIconDIV.appendChild(itemCaptureIcon);
			captureDiv.appendChild(capture);
			itemListDIV.appendChild(itemImageDIV);
			itemListDIV.appendChild(itemNameDIV);
			itemListDIV.appendChild(itemCaptureIconDIV);	
			itemListDIV.appendChild(captureDiv);	
						
			content.appendChild(itemListDIV);
		}
		
		//tatiana
		for(x=0;x<PKMSHSW_ARMOR.LOCATION[i].Tatiana.length; x++){
			var itemListDIV = document.createElement('div');
			itemListDIV.className = "item-list-DIV";
			
			var item = document.createElement('div');
			item.className = "item";
			
			var itemImageDIV = document.createElement('div');
			itemImageDIV.className = "item-image-DIV";
			
			var itemImage = document.createElement('img');
			itemImage.className = "item-image";
			itemImage.setAttribute("src", './img/pkm_shsw/item/16.png');
			
			var itemNameDIV = document.createElement('div');
			itemNameDIV.className = "item-name-DIV";
			
			var itemName = document.createElement('span');
			itemName.innerHTML = language.NPC[1];
			
			var itemCaptureIconDIV = document.createElement('div');
			itemCaptureIconDIV.className = "item-capture-icon-DIV";
			
			var itemCaptureIcon = document.createElement('img');
			itemCaptureIcon.className = "item-capture-icon";
			itemCaptureIcon.setAttribute("src", './img/pkm_shsw/capture.png');
			
			var captureDiv = document.createElement('div');
			captureDiv.className = "item-capture-DIV hidden";
			
			var capture = document.createElement('img');
			capture.className = "capture";
			capture.setAttribute("src", './img/pkm_shsw/location/' + PKMSHSW_ARMOR.LOCATION[i].Id + '_t_' + PKMSHSW_ARMOR.LOCATION[i].Tatiana[x] + ".jpg");
			
			itemCaptureIcon.capture = captureDiv;
			itemCaptureIcon.captureStatus = false;
			
			itemCaptureIcon.addEventListener('click', showCapture, false);			
			
			itemImageDIV.appendChild(itemImage);
			itemNameDIV.appendChild(itemName);
			itemCaptureIconDIV.appendChild(itemCaptureIcon);
			captureDiv.appendChild(capture);
			itemListDIV.appendChild(itemImageDIV);
			itemListDIV.appendChild(itemNameDIV);
			itemListDIV.appendChild(itemCaptureIconDIV);	
			itemListDIV.appendChild(captureDiv);	
						
			content.appendChild(itemListDIV);
		}
	}
}

function showCapture(evt){
	if(this.captureStatus){
		this.capture.className = "item-capture-DIV hidden";
	}else{
		this.capture.className = "item-capture-DIV";
	}
	this.captureStatus = !this.captureStatus;
}

function showMap(evt){
	this.map.className = "map-img-div";
}

function hideMap(evt){
	this.className = "map-img-div hidden";
}

function getItem(evt){
	switch(this.game){
		case "pkmshsw":
			if(this.status){
				this.className = "get0";
				localStorage.setItem("pkmshsw_armor_" + this.num, 0);
			}else{
				this.className = "get1";
				localStorage.setItem("pkmshsw_armor_" + this.num, 1);
			}
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
	logoImage.setAttribute("src", './img/pkm_shsw/banner_es.png');
	logo.appendChild(logoImage);
	
	es.addEventListener('click', function(){
			content.innerHTML="";
			logo.innerHTML="";
			logoImage.setAttribute("src", './img/pkm_shsw/banner_es.png');
			logo.appendChild(logoImage);
			changeLanguage("es");
			fillPKMSHSW_ARMOR();
		}, false);	
	en.addEventListener('click', function(){
			content.innerHTML="";
			logo.innerHTML="";
			logoImage.setAttribute("src", './img/pkm_shsw/banner_en.png');
			logo.appendChild(logoImage);
			changeLanguage("en");
			fillPKMSHSW_ARMOR();
		}, false);
	changeLanguage("es");
	fillPKMSHSW_ARMOR();
}