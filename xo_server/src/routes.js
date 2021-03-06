const routerBuilder = require('./rootRouter');
const controller = require('./game');
const users = require('./lib/localDB.json');
const { tokenValidation } = require('./helpers/authUtlis');

const router = new routerBuilder([tokenValidation]);

router.get('/getField', (req, res) => {
  res.send(200, controller.getField());
});

router.get('/getWinner', (req, res) => {
  res.send(200, controller.getWinner());
});

router.get('/setCurrentPlayer', (req, res) => {
  controller.setCurrentPlayer(req.body.player);
  res.send(200, controller.getCurrentPlayer());
});

router.post('/move', (req, res) => {
  const data = controller.makeMove(req.body.x, req.body.y);
  if (!data) {
    res.status(409).send('Cell is taken or out of field!');
  } else if (data === 'Win') {
    res.status(200).send({ data: 'Win', winner: controller.getCurrentPlayer() });
  } else if (data === 'Tie') {
    res.status(200).send('Tie');
  } else {
    res.status(200).send('OK');
  }
});

router.post('/reset', (req, res) => {
  res.send(200, controller.reset());
});
router.post('/presetField', (req, res) => {
  controller.presetField(req.body.field);
  res.status(200).send('OK');
});
router.get('/getUsers', (req, res) => {
  if (!req.user) res.sendStatus(401);
  const usersList = users.filter((u) => u.name === req.user.user);
  res.status(200).send(usersList);
});

module.exports = router;
