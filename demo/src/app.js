import {
	execute,
	loadImageElement,
	buildInputFile
} from './wasm-imagemagick.esm-es2018.js'

console.log(execute)

function canvasToBlob (media) {
	return document.querySelector('canvas').toBlob((blob) => {
		window.blob = blob
		blobToMagick()
	}, 'image/jpeg', 0.95)
}

function blobToMagick () {

}

async function getMedia () {
	let stream = null
	try {
		stream = await navigator.mediaDevices.getUserMedia({
			video: true
		})
		// Grab elements, create settings, etc.
		var video = document.querySelector('#camera video')
		// video.src = window.URL.createObjectURL(stream)
		video.srcObject = stream
		video.play()
	} catch (err) {
		console.log(err)
	}
}

function setup () {
	var canvas = document.querySelector('canvas')
	var context = canvas.getContext('2d')
	var video = document.querySelector('video')
	return {
		video,
		context
	}
}

function triggerPhotoTake (media) {
	// Trigger photo take
	document.querySelector('button').addEventListener('click', function () {
		media.context.drawImage(media.video, 0, 0, 620, 480)
		canvasToBlob()
	})
}

(function () {
	getMedia()
	let media = setup()
	triggerPhotoTake(media)
})()
