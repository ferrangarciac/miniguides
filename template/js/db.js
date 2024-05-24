const EXCLUDEDITEMS = [
	12, 13, 14,
];

const GROUPICONS = [
	0,0,0,0,0,1,1,1,2,2,		//0 - 9
	2,3,3,3,3,3,				//10 - 15
]

const LOCATION = [{
		_id: 0, //Village 1
		map_number: 1,
		map_connections: [],
		map_special_mark: [],
		item_field: [[1,0,50,50],[5,0,70,40,true]],
		item_npc: [[6,0,0,40,40]], //item,npc,map,x,y, missable
		item_buy: [],
		item_steal: [[7,0,true]], //item, monster, missable
		item_drop: [[12,1,true]], //item, monster, missable
		money_field: [[1200,0,150,150]], //money, map, x, y
		money_npc: [[900,0,0,10,10]], //money,npc,map,x,y
		enemy: [[0,0,0],[1,0,3],[2,1,1]],
		achievement: [],
		advice: [],
		entry_order: [0,0,1,2,3,4,5],
		link1: "",
		link2: "",
	},
	{
		_id: 1, //Forest 1
		map_number: 2,
		map_connections: [],
		map_special_mark: [],
		item_field: [],
		item_npc: [],
		item_buy: [],
		item_steal: [],
		item_drop: [],
		money_field: [],
		money_npc: [],
		enemy: [],
		achievement: [],
		advice: [],
		entry_order: [],
		link1: ["Test 1","https://www.marcrobledo.com"],
		link2: "",
	},
	{
		_id: 2, //City 1
		map_number: 1,
		map_connections: [],
		map_special_mark: [],
		item_field: [],
		item_npc: [],
		item_buy: [],
		item_steal: [],
		item_drop: [],
		money_field: [],
		money_npc: [],
		enemy: [],
		achievement: [],
		advice: [0],
		entry_order: [7],
	
		link2: ["Test 2","https://www.marcrobledo.com"],
	},
	{
		_id: 3, //Dungeon 1
		map_number: 2,
		map_connections: [
			[1,0,441.5, 536],	[1,1,238.5, 16], //mark,map,x,y
			[2,0,481.5, 11],	[2,1,305.5, 555]
		],
		map_special_mark: [],
		item_field: [[0,0,0,0]],
		item_npc: [],
		item_buy: [],
		item_steal: [],
		item_drop: [],
		money_field: [],
		money_npc: [],
		enemy: [[0,0,2]],
		achievement: [0],
		advice: [1],
		entry_order: [0,6,7],
		link1: ["Test 3","https://www.marcrobledo.com"],
		link2: ["Test 4","https://www.marcrobledo.com"],
	},
];