CONFIG
======

item_icon_type: Esta opción sirve para decidir el tipo de iconos que aparecerán en la lista de objetos.
					0 = un icono para cada objeto.
					1 = iconos por tipo de objetos (se estipulan en la lista GROUPICONS del db.js)
					2 = sin icono (se usará la imagen "noicon.png" para todos los objetos).
				Esta opción sólo influye en la lista de objetos, ya que en la guía se pueden usar los tres tipos al mismo tiempo.
				
				
DATABASE (db.js)
================

enemy: [enemy id, battlefield, background color],
		background color:
			0 = normal (no color)
			1 = boss (red)
			2 = alt 1 (green)
			3 = alt 2 (blue)
			
item_field_noicon: [item id, map number, x coord, y coord, missable item],
		missable item: si el objeto en cuestión es perdible, sólo hace falta añadir 'true', en la última posición. Si no lo es, se puede omitir.