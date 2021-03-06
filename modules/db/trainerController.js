const TrainerModel = require('./trainerMethods.js');

module.exports = {

  signin: function(req, res) {
    const password = req.body.password;
    const email = req.body.email;
    TrainerModel.comparePassword(email, password, (err, isMatch) => {
      if (err) {
        res.end(err);
      }
      if (isMatch) {
        req.session.isTrainer = true;
        req.session.email = email;
        req.session.save();
        res.end('success');
      } else {
        res.sendStatus(504);
      }
    });
  },

  signup: function(req, res) {
    const user = req.body;
    TrainerModel.signup(user, (err) => {
      if (err) {
        res.end('fail');
      } else {
        req.session.isTrainer = true;
        req.session.email = user.email;
        req.session.save();
        res.end('success');
      }
    });
  },

  filter: function(req, res) {
    const location = req.query.location;
    TrainerModel.filterTrainers(location, (results) => {
      res.json(results);
    });
  },

  getAll: function(req, res) {
    TrainerModel.findAllTrainers((results) => {
      res.json(results);
    });
  },

  updateTrainer: function(req, res) {
    console.log('updating Trainer------------------');
    if (req.session.email) {
      if (req.session.isTrainer) {
        const updateObj = {
          // firstname: req.body.firstname,
          // lastname: req.body.lastname,
          profilepic: req.body.pic,
          bio: req.body.bio,
          rate: req.body.rate,
          services: {
            '1on1': req.body.oneonone ? true : false,
            'dietcons': req.body.dietcons ? true : false,
            'group': req.body.group ? true : false,
            'remote': req.body.remote ? true : false,
          }
        };

        TrainerModel.updateTrainer(req.session.email, updateObj, (err)=>{
          if (err) {
            res.sendStatus(504);
          } else {
            res.end('success');
          }
        });
      } else {
        res.sendStatus(401);
      }
    } else {
      console.log('no session email');
      res.sendStatus(401);
    }
  },

  getProfile: function(req, res) {
    console.log('GETTING PROFILE -------------------');
    if (req.session.email) {
      if (req.session.isTrainer) {
        TrainerModel.getProfile(req.session.email, function(err, doc) {
          if (err) {
            res.send(500);
          } else {
            if (doc) {
              const resObj = {
                firstname: doc.firstname,
                lastname: doc.lastname,
                bio: doc.bio,
                profilepic: doc.profilepic,
                rate: doc.rate
              };
 
              if (doc.services) {
                resObj.oneonone = doc.services.oneonone || false,
                resObj.dietcons = doc.services.dietcons || false,
                resObj.group = doc.services.group || false,
                resObj.remote = doc.services.remote || false;
              }

              res.send(resObj);
            } else {
              res.sendStatus(401);
            }
          }
        });
      } else {
        res.sendStatus(401);
      }
    } else {
      console.log('no session email');
      res.sendStatus(401);
    }
  },

  logout: function(req, res) {
    console.log('BEFORE', req.session);
    req.session.destroy();
    console.log('AFTER', req.session);
    res.send({redirect: '/'});
  },

  checkEmail: function(req, res) {
    TrainerModel.find({username: req.query.email}).then(function(trainerInfo) {
      if (trainerInfo.length) {
        res.json(trainerInfo);
      } else {
        res.end();
      }
    });    
  }
};


