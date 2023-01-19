
	
AFRAME.registerComponent("listener", {
  init: function() {
    this.target = document.querySelector('#vid1'); // your video
    this.prevPosition = null; // initially there is no position or rotation
    this.prevRotation = null;
	this.scale = null;
  },

  tick: function() {
    if (this.el.object3D.visible) {
      this.target.setAttribute('visible', 'true');
	  this.target.play();
      if(!this.prevPosition && !this.prevRotation &&!thisprev.scale) { 
        // there are no values to lerp from - set the initial values
        this.target.setAttribute('position', this.el.getAttribute('position'));
        this.target.setAttribute('rotation', this.el.getAttribute('rotation'));
		this.target.setAttribute('scale', this.el.getAttribute('scale'));
      } else {
        // use the previous values to get an approximation 
        this.target.object3D.position.lerp(this.prevPosition, 0.9);
		this.target.object3D.scale.lerp(this.scale, 0.9);
        // this (below) may seem ugly, but the rotation is a euler, not a THREE.Vector3, 
        // so to use the lerp function i'm doing some probably unnecessary conversions
        let rot = this.target.object3D.rotation.toVector3().lerp(this.prevRotation, 0.9);
        this.target.object3D.rotation.setFromVector3(rot);
      }
      // update the values
      this.prevPosition = this.el.object3D.position;
      this.prevRotation = this.el.object3D.rotation;
    } else {
     // the marker dissapeared - reset the values
     this.target.setAttribute('visible', 'false');
	 this.target.pause();
     this.prevPosition = null;
     this.prevRotation = null;
   }
  }
});
