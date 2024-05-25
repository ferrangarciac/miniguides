CONFIGURACIÓN (config.js)
=========================

item_icon_type: Esta opción sirve para decidir el tipo de iconos que aparecerán en la lista de objetos.
*1					0 = un icono para cada objeto.
					1 = iconos por tipo de objetos (se estipulan en la lista GROUPICONS del db.js)
					2 = sin icono (se usará la imagen "noicon.png" para todos los objetos).
				Esta opción sólo influye en la lista de objetos, ya que en la guía se pueden usar los tres tipos al mismo tiempo.
				
map_debugging:	Si ponemos true en esta opción, al clicar en un punto de un mapa, nos aparecerá en la consola (F12 en firefox)
				el mapa, y las dos cordenadas listas para copiar en las tablas.
				
				
DATABASE (db.js)
================

EXCLUDEDITEMS: 	Aquí pondremos las ids de los objetos que no queramos que aparezcan en la lista de
				objetos global. Esto es en caso de que haya algún objeto que vayamos a perder,
				objetos beta ó por cualquier otra razón.
				
GROUPICONS:		Aquí pondremos a que grupo de iconos *1 pertenece cada objeto.
				En el ejemplo: 	los objetos con ids 5, 6 y 7, queremos que aparezcan con el
								icono de la espada (que es el 1.png). Por lo tanto en la tabla
								asignaremos el "1" a las posiciones 5, 6 y 7.
								
LOCATION:	Esta será la base de datos de cada zona del juego, teniendo varias opciones para añadir.
	
- _id: El identificador numérico de cada zona.
- map_number: 	Los nombres de las imágenes de los mapas se componen de dos dígitos.
				Ejemplo: 	2_1.jpg
							El 2 es el id de la zona.
							El 1 es el número del mapa (empezando siempre por 0).
				Dicho esto, en "map_number" indicaremos el número de mapas que componen la zona.
- map_connections: 	[name, map, x, y]
					Aquí pondremos las conexiones entre los mapas (se puede dejar vació).
					En "name" podemos añadir tanto un número, cómo una cadena de texto.
					En "map" indicaremos el número de mapa en el que incluiremos la conexión.
					"x" é "y" son las cordenadas en la imágen. *2
- map_special_mark: [name (optional), mark icon id, map, x, y]
					Esta opción sirve para poner marcas especiales en el mapa, que no entren en
					ninguna de las demás opciones. Se pueden añadir tantas marcas distintas como
					se quieran.
- enemy: [enemy id, battlefield id, background color],
		background color:
			0 = normal (no color)
			1 = boss (red)
			2 = alt 1 (green)
			3 = alt 2 (blue)
- item_field:	[item id, map, x, y, missable]
				Esta opción sirve para colocar los objetos normales que se pueden recoger por
				el mapa.
				Las cordenadas tanto en esta opción como en las demás, funcionan de la misma
				manera (explicado en "map_connections").
				Si en la opción "missable" ponemos true, aparecerá una señal en la guía que
				nos indicará que ese objeto es perdible. Funciona del mismo modo en todas las
				demás opciones que cuenten con "missable".
- item_npc:	[item id, npc id, map, x, y, missable]
			En esta opción indicaremos los objetos entregados por PNJs.
- item_buy: [item id, quantity, missable]
			En esta opción añadiremos esos objetos que podemos comprar en tiendas y que es
			necesario adquirirlos.
			En "quantity" añadiremos entre comillas la cantidad que tenemos que comprar.
			Ejemplo: "x5" (se pueden dejar las comillas vacías para no poner ninguna cantidad).
- item_steal:	[item id, monster id, missable]
				Objetos que debemos robar a ciertos monstruos.
- item_drop:	[item id, monster id, missable]				
				Objetos que dejarán caer ciertos monstruos.
- money_field:	[money, map, x, y]
				Dinero que podremos recoger en el mapa.
				Funciona igual que "item_field", pero en lugar de poner el id del objeto,
				añadiremos la cantidad de dinero recibido.
- money_npc:	[money, npc id, map, x, y]
				Dinero que recibiremos de un PNJ.
				Funciona igual que "item_npc", pero en lugar de poner el id del objeto,
				añadiremos la cantidad de dinero recibido.
- achievement:	[achievement id]
				Aquí añadiremos logros que conseguir en la zona en cuestión.
- advice:	[advice id]
			Aquí añadiremos consejos y pasos a seguir en la guía.
- entry_order:	Aquí iremos añadiendo cada entrada de la guía para la zona en el orden que
				deseemos. Siguiendo los siguientes identificadores:
					0: item_field
					1: item_npc
					2: item_buy
					3: item_steal
					4: item_drop
					5: money_field
					6: money_npc
					7: achievement
					8: advice
				Ejemplo:	entry_order: [0,0,8,3,0]
							En este ejemplo le hemos indicado que aparezcan entradas en el siguiente orden:
								- Primer objeto para recoger en el mapa (item_field)
								- Segundo objeto para recoger en el mapa (item_field)
								- Primer consejo añadido (advice)
								- Primer objeto que se debe robar a un enemigo (item_steal)
								- Tercer objeto para recoger en el mapa (item_field)
							!!! Aunque se haya añadido cualquiera de las opciones anteriores. Si no se añade
								su referencia en "entry_order", no aparecerá en la guía. Es fácil de olvidarse
								alguna y si no aparece es probable que nos la hayamos dejado.
								Igualmente si vemos que nos aparece una entrada en la que pone "Undefined",
								significará que hemos añadido alguna entrada de más que no existe.
- link1:	Entre las comillas añadiremos un enlace externo que queremos que aparezca en la sección.
			Si dejamos las comillas vacías no aparecerá nada.
- link2:	Entre las comillas añadiremos un enlace externo que queremos que aparezca en la sección.
			Si dejamos las comillas vacías no aparecerá nada.
			
item_field_noicon: [item id, map number, x coord, y coord, missable item],
		missable item: si el objeto en cuestión es perdible, sólo hace falta añadir 'true', en la última posición. Si no lo es, se puede omitir.