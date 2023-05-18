const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


// medile wear

app.use(cors())
app.use(express.json())

// oKSq33nAwZXzH4sj
// HerosUniverse






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1izglfl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const toyCollactions = client.db("toysDB").collection('toys');


        app.post("/addtoys", async (req, res) => {
            const body = req.body;
            const result = await toyCollactions.insertOne(body);
            res.send(result)


        })

        app.get("/alltoys/:hero", async (req, res) => {
            const hero = req.params.hero;

            if (hero == "marvel" || hero == "dc" || hero == "starwear") {
                const result = await toyCollactions.find({
                    categorey: req.params.hero
                }).toArray();
                return res.send(result)
            }
            else {
                const result = await toyCollactions.find({}).toArray();
                res.send(result)
            }
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('my assainment-11 is running')
})

app.listen(port, () => {
    console.log('assainment-11 running on port ' + port)
})