'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Track = require('../model/track');
const Playlist = require('../model/playlist');
const debug = require('debug')('http:route-playlist');
//const multer = require('multer');
//const tempDir = `${__dirname}/../temp`;
//const upload = multer({dest:  `${tempDir}`});

debug('route-track');

module.exports = router => {

  router.route('/play/track/:artist?/:album?/:title?')

    .get(bodyParser, (req, res) => {
      if(req.params.artist && req.params.album && req.params.title) {
        return Track.findOne({
          artist_name: `${req.params.artist}`, 
          album_title: `${req.params.album}`,
          title: `${req.params.title}`,
        })
          .exec(function(err, track) {
            if(err) {
              return errorHandler(new Error('Item Not Found'), res);
            }
            res.status(200).json(track);
          });
      }
    });
};

/*
const Track = require('../model/track');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-play');
module.exports = function (router) {
  router.route('/play/track/:artist?/:album?/:title?')   // track
    .get(bodyParser, (req, res) => {
      if(!req.params.artist || !req.params.album || !req.params.title){
        return errorHandler(new Error('Invalid request'), res);
      }
    
      return Track.findOne({ 'title': req.params.title }, function (err, trackObj) {
        if(err){
          return errorHandler(err, res);
        }
console.log(trackObj);
        res.status(200).json(trackObj);
        });
    }
    });
}
*/