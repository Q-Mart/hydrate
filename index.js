const HydraSynth = require('hydra-synth')
const loop = require('raf-loop')

function init () {
  var canvas = document.getElementById('hydra-canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.imageRendering = 'pixelated'

  let isIOS =
  (/iPad|iPhone|iPod/.test(navigator.platform) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
  !window.MSStream

  let precisionValue = isIOS ? 'highp' : 'mediump'

  var hydra = new HydraSynth({canvas: canvas, autoLoop: false, precision: precisionValue})

  var defaultCode = `osc().modulateRotate(o0,0.3).out()
osc(33,0.3,0.3).diff(o3,3).out(o1)
osc(3,0.3,33).modulateKaleid(o3,3).diff(o0).out(o2)
src(o0,3).mult(o1,3).kaleid(3).out(o3)
render(o2)`

  if (code != null) {
    eval(code)
  } else {
    eval(defaultCode)
  }

  // console.log(files.get())

  // define extra functions (eventually should be added to hydra-synth?)

  // hush clears what you see on the screen
  window.hush = () => {
    solid().out()
    solid().out(o1)
    solid().out(o2)
    solid().out(o3)
    render(o0)
  }


  var engine = loop(function(dt) {
    hydra.tick(dt)
  }).start()

}

window.onload = init
