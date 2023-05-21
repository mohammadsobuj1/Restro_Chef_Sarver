const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


// medile wear

app.use(cors())
app.use(express.json())







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1izglfl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 40

});

async function run() {

    try {
       
        const toyCollactions = client.db("toysDB").collection('toys');
        const heroCOllaction = client.db("toysDB").collection("heros")

        // const indexKeys = { name: 1 }
        // const indexOptions = { name: "namefield" }
        // const result = await toyCollactions.createIndex(indexKeys, indexOptions)
        // console.log(result)

        app.get("/searchBy/:text", async (req, res) => {
            const seachText = req.params.text;
            try {
                const result = await toyCollactions.find({
                    $or: [
                        {
                            name: { $regex: seachText, $options: 'i' }
                        },
                    ]
                }).toArray()
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })

        app.post("/addtoys", async (req, res) => {
            const body = req.body;
            try {
                const result = await toyCollactions.insertOne(body);
                res.send(result)
            } catch (error) {
                res.send(error)
            }


        })
        app.get('/alltoys', async (req, res) => {
            try {
                const result = await toyCollactions.find({}).toArray();
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })

        app.get('/heros', async (req, res) => {
            try {
                const result = await heroCOllaction.find({}).toArray();
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })
        app.get('/asen', async (req, res) => {
            try {
                const result = await toyCollactions.find({}).sort({ "price": 1 }).toArray();
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })
        app.get('/desan', async (req, res) => {
            try {
                const result = await toyCollactions.find({}).sort({ "price": -1 }).toArray();
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })

        app.get('/detailes/:id', async (req, res) => {
            const id = req.params.id;
            const qurey = { _id: new ObjectId(id) }
           try {
            const result = await toyCollactions.findOne(qurey);
            res.send(result)
           } catch (error) {
            res.send(error)
           }
        })
        app.get('/update/:id', async (req, res) => {
            const id = req.params.id;
            const qurey = { _id: new ObjectId(id) }
            try {
                const result = await toyCollactions.findOne(qurey);
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })

        app.get("/alltoys/:hero", async (req, res) => {
            const hero = req.params.hero;

            try {
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
            } catch (error) {
                res.send(error)
            }
        })

        app.get("/mytoys/:email", async (req, res) => {

            try {
                const result = await toyCollactions.find({ email: req.params.email }).toArray();
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })


        app.put("/update/:id", async (req, res) => {
            const id = req.params.id;
            const Updateduser = req.body;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateToy = {
                $set: {
                    name: Updateduser.name,
                    photo: Updateduser.photo,
                    price: Updateduser.price,
                    quantity: Updateduser.quantity,
                    description: Updateduser.description,
                },
            }
            try {
                const result = await toyCollactions.updateOne(filter, updateToy, options)
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })


        app.delete("/mytoys/:id", async (req, res) => {
            const id = req.params.id;
            const qurey = { _id: new ObjectId(id) }
            try {
                const result = await toyCollactions.deleteOne(qurey);
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.log);



app.get('/', (req, res) => {
    res.send('my assainment-11 is running')
})

app.listen(port, () => {
    console.log('assainment-11 running on port ' + port)
})



