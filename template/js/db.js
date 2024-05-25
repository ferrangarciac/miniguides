const EXCLUDEDITEMS = [
	12, 13,
];

const GROUPICONS = [
	0,0,0,0,0,1,1,1,2,2,		//0 - 9
	2,3,3,3,3,3,				//10 - 15
]

const LOCATION = [{
		_id: 0, //Village 1
		map_number: 3,
		map_connections: [
			[1,0, 185, 226],	[1,1, 152, 221.75],	//name, map, x, y
			[2,0, 441, 230],	[2,2, 151.5, 224.25]
		],						
		map_special_mark: [],						//name (optional), mark icon id, map, x, y
		enemy: [],									//enemy id, battlefield id, color
		item_field: [[1,0,558, 384]],		//0		//item id, map, x, y, missable
		item_npc: [[6,0,1, 102, 84.75]],	//1 	//item id, npc id, map, x, y, missable
		item_buy: [],						//2		//item id, quantity, missable
		item_steal: [], 					//3		//item id, monster id, missable
		item_drop: [], 						//4		//item id, monster id, missable
		money_field: [[50,0,185, 328]], 	//5		//money, map, x, y
		money_npc: [], 						//6		//money, npc id, map, x, y
		achievement: [1],					//7		//achievement id
		advice: [],							//8		//advice id
		entry_order: [0,5,1,7],
		link1: "",
		link2: "",
	},
	{
		_id: 1, //Forest 1
		map_number: 2,
		map_connections: [
			["START",0, 213, 459.25],
			[1,0, 150, 18.25],	[1,1, 215.5, 457.25]
		],
		map_special_mark: [],
		enemy: [[0,0,0],[1,0,0],[2,2,1]],
		item_field: [[1,0, 64, 224.25],[5,0, 229, 52.25],[8,1, 93.5, 280.25],[11,1, 160.5, 185.25,true]],
		item_npc: [],
		item_buy: [],
		item_steal: [[8,2,true]],
		item_drop: [],
		money_field: [],
		money_npc: [],
		achievement: [],
		advice: [0],
		entry_order: [0,0,0,0,3,8],
		link1: ["Test 1","https://www.marcrobledo.com"],
		link2: "",
	},
	{
		_id: 2, //City 1
		map_number: 1,
		map_connections: [],
		map_special_mark: [["MARK", 0, 0, 65, 152.75], ["",0,0, 366, 209.75], [2,1,0, 380, 90.75]],
		enemy: [[1,1,3]],
		item_field: [],
		item_npc: [],
		item_buy: [[6, " x2"]],
		item_steal: [],
		item_drop: [],
		money_field: [],
		money_npc: [[150,2,0, 56, 357.75]],
		achievement: [],
		advice: [1],
		entry_order: [2,6,8],
	
		link2: ["Test 2","https://www.marcrobledo.com"],
	},
	{
		_id: 3, //Dungeon 1
		map_number: 2,
		map_connections: [
			["START",0, 360.5, 624],
			[1,0, 231.5, 27],[1,1, 215.5, 462.75]
			
		],
		map_special_mark: [],
		enemy: [[0,2,0],[3,2,0],[4,2,1]],
		item_field: [[2,0, 431.5, 308],[4,0, 137.5, 151]],
		item_npc: [],
		item_buy: [],
		item_steal: [],
		item_drop: [[14,4,true]],
		money_field: [],
		money_npc: [],
		achievement: [0],
		advice: [1],
		entry_order: [0,0,4,8,7],
		link1: ["Test 3","https://www.marcrobledo.com"],
		link2: ["Test 4","https://www.marcrobledo.com"],
	},
];