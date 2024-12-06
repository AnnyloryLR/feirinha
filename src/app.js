import express, {json}  from "express"
import cors from "cors"


const app = express(); //generates a server instance

//bypassing security protocol 
app.use(cors());

//body parser
app.use(json())

const market = [
    { name: "Laranja" ,
      quantity: 12,
      type: "fruta" 
    },
      
	{ name: "Melância",
      quantity: 1, type: "fruta" 
    },

	{ name: "Uva" ,
      quantity: 3, 
      type: "fruta" 
    }
]

//sets a function to be executed when getting a GET route "/"

app.get("/", (req, res) => {
    //sends as the response the following information:
    res.send(market)
})

//sets the server to run on the port number 4000
app.listen(5000, () => console.log("Running server on port 5000"));



