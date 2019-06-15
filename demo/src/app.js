import * as Magick from './wasm-imagemagick.esm-es2018.js'

(function () {
	document.querySelector('select').addEventListener('change', async function (event) {
		let preMagick = await Magick.buildInputFile(`./img/${event.target.value}.jpg`)
		console.log(preMagick)
		document.querySelector('#pre-magicked').src = await Magick.buildImageSrc(preMagick)
		let fetchedSourceImage = await fetch(`./img/${event.target.value}.jpg`)
		let arrayBuffer = await fetchedSourceImage.arrayBuffer()
		let sourceBytes = new Uint8Array(arrayBuffer)
		// calling image magick with one source image, and command to rotate & resize image
		let processedFiles = await Magick.Call([{
			'name': 'srcFile.png',
			'content': sourceBytes
		}], ['convert', 'srcFile.png', '-rotate', '90', 'out.png']);
		let firstOutputImage = processedFiles[0]
		document.querySelector('#post-magicked').src = URL.createObjectURL(firstOutputImage['blob'])
		console.log('created image ' + firstOutputImage['name'])
	})
})()
