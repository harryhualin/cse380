precision mediump float;

varying vec4 v_Position;

uniform vec4 circle_Color;
uniform vec4 circle_Color2;

// HOMEWORK 3 - TODO
/*
	The fragment shader is where pixel colors are decided.
	You'll have to modify this code to make the circle vary between 2 colors.
	Currently this will render the exact same thing as the gradient_circle shaders
*/
void main(){
	// Default alpha is 0
	float alpha = 0.0;

	// Radius is 0.5, since the diameter of our quad is 1
	float radius = 0.5;

	// Get the distance squared of from (0, 0)
	float dist_sq = (v_Position.x*v_Position.x + v_Position.y*v_Position.y);

	if(dist_sq < radius*radius){
	// Multiply by 4, since distance squared is at most 0.25
	alpha =1.0;
	}

	//find the bottom-left point of the circle
	float bl_x=-sqrt(radius*radius/2.0);
	float bl_y=bl_x;
	//distance the bottom-left point
	float dist= sqrt((v_Position.x-bl_x)*(v_Position.x-bl_x)+(v_Position.y-bl_y)*(v_Position.y-bl_y));

	// Use the alpha value in our color
	gl_FragColor = mix(circle_Color2, circle_Color, dist);
	gl_FragColor.a = alpha;
}