import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Tilemap from "../../Wolfie2D/Nodes/Tilemap";
import { HW5_Events } from "../hw5_enums";
import PlayerState from "../Player/PlayerStates/PlayerState";
import BalloonState from "./BalloonState";

// HOMEWORK 5 - TODO
/**
 * For this homework, you'll have to implement an additional state to the AI from scratch.
 * 
 * This new behavior should be for the zero gravity balloon state, where the balloon no
 * longer has gravity affecting it.
 * 
 * Along with this, the balloon should move twice it's current velocity if it's close
 * to the player, within about 10 tiles. You only have to apply this speed change to the
 * x velocity, the y velocity will be left unchanged.
 * 
 * When the player moves far enough away again, the balloon should return to it's original velocity.
 * 
 * You can implement this method how you see fit, there's no one way of doing it. Look at events that
 * are fired to get the player position
 */
export default class ZeroGravity extends BalloonState {
	protected new_speed: number;
	
	onEnter(): void {
		this.gravity = 0;
		this.new_speed=this.parent.speed;
		(<AnimatedSprite>this.owner).animation.play("IDLE", true);
	}

	update(deltaT: number): void {
		super.update(deltaT);
		this.parent.velocity.x =  this.parent.direction.x * this.new_speed;
		this.owner.move(this.parent.velocity.scaled(deltaT));
	}
	
	//overwrite
	handleInput(event: GameEvent): void {		
		super.handleInput(event);
		if(event.type==HW5_Events.PLAYER_MOVE) {
			
			let position=event.data.get("position");
			let dis=Math.sqrt(Math.pow(Math.abs(this.owner.position.x-position.x),2)+Math.pow(Math.abs(this.owner.position.y-position.y),2));
			
			if (dis<=(10*16)){			
				this.new_speed=this.parent.speed*2;
			}
			else{this.new_speed=this.parent.speed}; 
		}
			
					
	}

	onExit(): Record<string, any> {
		(<AnimatedSprite>this.owner).animation.stop();
		return {};
	}
}