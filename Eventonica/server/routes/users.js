import db from "../db/dbConnection.js";
import express from "express";
const router = express.Router();
/* GET users listing. */

router.get('/', async function (req, res, next) {

  try {
    const users = await db.any('SELECT * FROM users', [true]);
    res.send(users);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

/* post request goes here */
/* Add users listing. */
router.post('/', async (req, res) => {
    const user = {
      name: req.body.name,
      email: req.body.email,
    };
    console.log(user);
    try {
      const createdUser = await db.one(
        'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *',
        [user.name, user.email]
      );
      console.log(createdUser);
      res.send(createdUser);
    } catch (e) {
      return res.status(400).json({ e });
    }
  });
/* delete request goes here  */
//Parameterized queries use placeholders instead of directly writing the
//values into the statements. Parameterized queries increase security and performance.

router.delete('/:id', async (req, res) => {
    // : acts as a placeholder
    const userId = req.params.id;
    try {
      await db.none('DELETE FROM users WHERE id=$1', [userId]);
      res.send({ status: 'success' });
    } catch (e) {
      return res.status(400).json({ e });
    }
  });

export default router;