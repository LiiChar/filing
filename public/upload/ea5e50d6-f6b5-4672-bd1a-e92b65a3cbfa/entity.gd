extends CharacterBody2D
class_name Entity

var Util = Utils.new()

@export var id = 0
@export var health = 0

@export var sprite: AnimatedSprite2D
@export var collision: CollisionPolygon2D

@export var actions = {}
@export var connects = []

func _ready() -> void:
	Core.add_entity(self)
	var entities = Util.find_entities_in_radius(position, Core.unit * 10, RectangleShape2D.new(), get_world_2d())

func _exit_tree() -> void:
	Core.remove_entity(self)
	
func add_connect(entity: Entity):
	connects.push_back(entity)
	render()

func remove_connect(entity: Entity):
	connects.erase(entity)
	render()
	
func render():
	pass
	
func destroy():
	for con in connects:
		con.remove_connect(self)
	get_tree().free()
	
func add_action(name: String, time: int, cb: Callable, ):
	var timer = Timer.new()
	timer.timeout.connect(cb)
	actions[name] = timer
	add_child(timer)
	timer.start(time)
	
func stop_action(name: String):
	if !(name in actions):
		print('Action not found. Name - ' + name)
	var timer: Timer = actions[name]
	timer.stop()
	
func start_action(name: String):
	if !(name in actions):
		print('Action not found. Name - ' + name)
	var timer: Timer = actions[name]
	timer.start()
	
func remove_action(name: String):
	if !(name in actions):
		print('Action not found. Name - ' + name)
	var timer: Timer = actions[name]
	timer.queue_free()
	actions.erase(name)
	
