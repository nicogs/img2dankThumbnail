const imgInput = document.getElementById("imgInput")
const imgSelectBtn = document.getElementById("imgSelectBtn")
const dankContainer = document.getElementById("dankContainer")




/**
 * The blue "select files"-button triggers the hidden file input element.
 */
imgSelectBtn.addEventListener("click", () => imgInput.click())



/**
 * The blue "select files"-button triggers the hidden file input element.
 */
imgInput.addEventListener("change", e => {
	for (let i = 0; i < e.target.files.length; i++) {
		const reader = new FileReader()

		reader.addEventListener("load", () => {
			openImg(reader.result)
			
		})
		reader.readAsDataURL(e.target.files[i])
		
	}
})


function openImg(imageSrc) {
	const originalImg = new Image()

	originalImg.addEventListener("load", () => {
		createDankThumbnail(originalImg)

	})

	originalImg.src = imageSrc
}

function createDankThumbnail(_img) {
	const dankCanvas = document.createElement("canvas")
	const dankCtx = dankCanvas.getContext("2d")
	
	dankCanvas.width = 1920
	dankCanvas.height = 1080

	dankCtx.drawImage(_img, 0, 0, 1920, 1080);

	dankCanvas.toBlob((blob) => {
		
		
		const dankThumbnail = new Image()
		dankThumbnail.setAttribute("class", "img-fluid border rounded-3 shadow-lg mb-4")
		const dankURL = URL.createObjectURL(blob)

		// dankThumbnail.addEventListener("load", () => {
		// 	// URL.revokeObjectURL(dankURL)
	
		// })

		dankThumbnail.src = dankURL

		const dankAnchor = document.createElement("a")
		dankAnchor.download = "dankThumbnail"
		dankAnchor.setAttribute("target", "_blank")
		dankAnchor.href = dankURL
		dankAnchor.append(dankThumbnail)
		dankContainer.append(dankAnchor)
	}, "image/jpeg", 0.95)

}