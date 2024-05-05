const fs = require('fs');
const Jimp = require('jimp');

module.exports = {
  processImage(image, userId) {
    // Process the image here

    // Example: Resize the image to 4K (3840x2160 pixels)
    image.resize(3840, 2160);

    // Save the processed image
    const directory = `leak/${userId}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const outputPath = `${directory}/processed_image.jpg`;
    image.write(outputPath, () => {
      console.log('Image processed and saved successfully:', outputPath);
    });
  },
};
