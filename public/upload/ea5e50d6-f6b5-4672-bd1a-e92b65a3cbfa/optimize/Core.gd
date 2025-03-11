extends Node

@export var entities = []


var grid = []
var grid_size = 1000
var unit = 100
func _ready() -> void:
	grid.resize(grid_size)
		
func add_entity (entity: Entity):
	entities.push_back(entity);

func has_entity (entity: Entity):
	entities.has(entity)
	
func remove_entity (entity: Entity):
	entities.erase(entity)
