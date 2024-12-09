import express, {json}  from "express"
import cors from "cors"


const app = express(); //generates a server instance

//bypassing security protocol 
app.use(cors());

//body parser
app.use(json())

const market = [
    { id:1,
      name: "Laranja",
      quantity: 12,
      type: "fruta" 
    },
      
	  { id:2,
      name: "Melância",
      quantity: 1,
      type: "fruta" 
    },

	  { id:3,
      name: "Uva",
      quantity: 3, 
      type: "fruta" 
    },

    { id:4,
      name: "Abobrinha",
      quantity: 4,
      type: "legume" 
    },
      
	  { id:5,
      name: "Espinafre",
      quantity: 1, 
      type: "verdura" 
    },

	  { id:6,
      name: "Repolho",
      quantity: 3, 
      type: "verdura" 
    }
]

//sets a function to be executed when getting a GET route "/"

app.get("/items", (req, res) => {
   const {type} = req.query; //query strings

   if(type){
      const vegetableType = market.filter( m => {
         return m.type.includes(type)})
      
      return res.send(vegetableType)
   }

  res.send(market)
})

app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  const veggie = market.find( m => {
    return m.id === Number(id);
  })

  res.send(veggie);
})

app.post("/items", (req, res) => {
  const veggie = req.body;

  const alreadyExist =  market.find( m => m.name.includes(veggie.name))

  if(!veggie.name || !veggie.quantity || !veggie.type){
    res.sendStatus(422)
    return
  }

  else if(market.includes(veggie.name)){
    res.sendStatus(409)
    return
  }


  else if(alreadyExist && Object.keys(alreadyExist).length > 0){

    res.sendStatus(409)
    return
  }


  market.push({
    id:market.length + 1, 
    ...veggie})
  res.sendStatus(201)
})

//sets the server to run on the port number 4000
app.listen(5000, () => console.log("Running server on port 5000"));



