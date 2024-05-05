const fs = require('fs');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const randomUseragent = require('random-useragent');

module.exports = {
  downloadImage(url, userId) {
    const directory = `leak/${userId}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const fileName = `${directory}/${uuidv4()}.jpg`;
    const userAgent = randomUseragent.getRandom();
    const headers = { 'User-Agent': userAgent };

    axios({
      url,
      method: 'GET',
      responseType: 'stream',
      headers,
    })
      .then((response) => {
        response.data.pipe(fs.createWriteStream(fileName));
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  },
};
