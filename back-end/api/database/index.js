const { MongoClient } = require('mongodb');

class databaseOps {
    dbConnection = null;
    database = "";
    DBURL = process.env.DBURL;
    DBNAME = process.env.DBNAME;
    constructor() {
        this.dbConnection = new MongoClient(this.DBURL);
        this.database = this.dbConnection.db(this.DBNAME);
    }

    async checkDuplicate(collection, doc) {
        let result = await collection.find({ username: doc.username }).toArray();
        // console.log(result.length);
        if (result.length > 0)
            return (true);
        else
            return (false);
    }

    async insertToDB(collection_name, doc) {
        try {
            const dbConnection = this.dbConnection;
            const database = this.database
            let result = false;
            const {username}=doc;
            await dbConnection.connect();
            const collection = database.collection(collection_name);
            if (false == await this.checkDuplicate(collection, {username:username}))
                result = await collection.insertOne(doc);
            else
                result="name already exist";

            await dbConnection.close();
            return result;
        }
        catch (e) {
            console.log("error :" + e);
            return {
                acknowledged: false,
                status: "error :could not create user",
            };
        }
    }

    async findInDb(collection_name, doc) {
        try {
            const dbConnection = this.dbConnection;
            const database = this.database
            let result = false;

            await dbConnection.connect();
            const collection = database.collection(collection_name);
            return(collection.find(doc).toArray());
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = databaseOps;