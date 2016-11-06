const request = require('request');
const GERTY_BASE = 'https://gerty.wheream.io/bot';

module.exports = {
  alert: (who, message) => new Promise((resolve, reject) => {
    request.post(`${GERTY_BASE}/say/room/notifications-test`, {
      json: true,
      body: { message: `Hey ${who ? `@${who}` : 'everyone'}! Got an alert from the API:\n\n${message}` },
      auth: {
        user: 'satellite',
        pass: process.env.GERTY_SAY_SECRET
      }
    }, (error, response, body) => {
      if (error) return reject(error);
      if (response.statusCode !== 201) return reject(new Error(`Status code was ${response.statusCode}; expected 201.`));
      resolve(body);
    });
  })
};
