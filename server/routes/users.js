import express from 'express';
import bcrypt from 'bcrypt';
import validateInput from '../shared/validations/signup';

import User from '../models/user';

let router = express.Router();

router.post('/', (req, res) => {
    const {errors, isValid} = validateInput(req.body);

    if(isValid){
        const { username, password, email } = req.body;
        const password_digest = bcrypt.hashSync(password, 10);

        User.forge({
            username, email, password_digest
        }, {hashTimestamps: true}).save()
            .then(user => res.json({success: true}))
            .catch(err => res.status(500).json({error: err}));
    } else {
        res.status(404).json(errors);
    }
});

export default router;