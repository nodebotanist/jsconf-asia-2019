import * as Magick from './wasm-imagemagick.esm-es2018.js'

async function loadImg (imgPath) {
	let fetchedSourceImage = await fetch(imgPath)
	let arrayBuffer = await fetchedSourceImage.arrayBuffer()
	return new Uint8Array(arrayBuffer)
}

function determineManipulationArray (manipulationType) {
	let manipulationArray
	switch (manipulationType) {
	case 'rotate-right':
		manipulationArray = ['-rotate', '90']
		break
	case 'rotate-left':
		manipulationArray = ['-rotate', '-90']
		break
	case `border`:
		manipulationArray = ['-bordercolor', 'black', '-border', '15x15']
	}
	return manipulationArray
}

async function manipulateImg (sourceBytes, manipulationArray) {
	let processedFiles = await Magick.Call([{
		'name': 'srcFile.png',
		'content': sourceBytes
	}], ['convert', 'srcFile.png'].concat(manipulationArray).concat(['out.png']))
	return processedFiles[0]
}

function outputMagickedImg (outputImg) {
	document.querySelector('#post-magicked').src = URL.createObjectURL(outputImg['blob'])
}

async function startManipulation (event) {
	if (document.querySelector('#pre-magicked').src) {
		let sourceBytes = await loadImg(document.querySelector('#pre-magicked').src)
		let manipulationMatrix = determineManipulationArray(event.target.value)
		let outputImg = await manipulateImg(sourceBytes, manipulationMatrix)
		outputMagickedImg(outputImg)
	}
}

(function () {
	document.querySelector('select').addEventListener('change', (event) => {
		let imgPath = `./img/${event.target.value}.jpg`
		document.querySelector('#pre-magicked').src = imgPath
	})
	let buttons = document.querySelectorAll('button')
	buttons.forEach((button) => {
		button.addEventListener('click', startManipulation)
	})
})()
