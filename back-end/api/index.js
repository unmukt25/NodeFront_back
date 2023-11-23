const databaseOps = require("./database");
const jwt = require('jsonwebtoken');
const { checkPassword, hashThisPassword, GenerateSalt } = require("./util");
module.exports = (server) => {

    server.get("/", function (req, res) {
        // console.log(process.env.PORT);
        res.end(process.env.PORT);
    });

    server.post("/signup", async function (req, res) {
        
        const doc = {
            username: req.body.username,
            password: await hashThisPassword(req.body.password,await GenerateSalt())
        }
        console.log(doc);
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
            valid_pass = checkPassword(search_result[0].password, req.body.password);
        else {
            res.json({ status: false, message: 'Multiple users or No useraccount of same email id; Account has been blocked' });
            return;
        }

        if (valid_pass) {
            const token = jwt.sign({
                username: req.body.username,
                user_id: search_result[0]._id
            }, process.env.SECRETKEY, { expiresIn: 90 });
            console.log(token);
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
                console.log(true);
            }
            catch(error)
            {
                res.json({ status: false })
                console.log(false)   
            }
        }
        else {
            res.json({ status: false })
            console.log(false)
        }

        // console.log(payload);

    })
}
