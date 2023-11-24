const databaseOps = require("./database");
const jwt = require('jsonwebtoken');
const { checkPassword, hashThisPassword, GenerateSalt } = require("./util");
module.exports = (server) => {

    server.get("/", function (req, res) {
        // console.log(process.env.PORT);
        res.end(process.env.PORT);
    });

    server.post("/signup", async function (req, res) {
        
        const salt= await GenerateSalt();
        const doc = {
            username: req.body.username,
            salt: salt,
            password: await hashThisPassword(req.body.password, salt)
        }
        db = new databaseOps();
        const status = await db.insertToDB("user", doc);
        res.json({
            status: status,
        });

    });

    server.post("/signin", async function (req, res) {
        let valid_pass;
        const doc = {
            username: req.body.username,
        }
        db = new databaseOps();
        const search_result = await db.findInDb("user", doc);

        if (search_result.length == 1)
            valid_pass = await checkPassword(search_result[0].password,search_result[0].salt, req.body.password);
        else {
            res.json({ status: false, message: 'Multiple users or No useraccount of same email id; Account has been blocked' });
            return;
        }
        console.log(valid_pass);
        if (valid_pass) {
            const token = jwt.sign({
                username: req.body.username,
                user_id: search_result[0]._id
            }, process.env.SECRETKEY, { expiresIn: 90 });
            res.json({ status: true, message: 'LogIn Successfull ', token: token })
            return;
        }
        else {
            res.json({ status: false, message: 'Wrong Password entered' });
            return;
        }

        // res.json("hello i am server");
    });

    server.post('/tokenvalid', function (req, res) {

        if (req.get('authorization').split(" ").length > 1) {
            try {
                const payload = jwt.verify(req.get('authorization').split(" ")[1], process.env.SECRETKEY);
                res.json({ status: true ,payload});
            }
            catch(error)
            {
                res.json({ status: false })
            }
        }
        else {
            res.json({ status: false })
        }

        // console.log(payload);

    })
}
