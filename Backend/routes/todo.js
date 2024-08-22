const express=require("express")
const router = express.Router()
const {Todo}=require("../schema/todo")
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.patch('/alltodo', async (req, res) => {
  let {userid}=req.body
  try {
      let alltodo = await Todo.find({owner:userid});
      res.json(alltodo);
  } catch (error) {
    res.json({message:error.message,name:error.name})
  }

})
router.post('/new', async (req, res) => {
  try {
     let { todo,userid } = req.body;
     let newtodo = new Todo({
       todo: todo,
       owner:userid
     });
     let savednote = await newtodo.save();
     res.json(savednote);
  } catch (error) {
    res.json({message:error.message,name:error.name})
  }
 
})
router.delete('/:id/delete', async (req, res) => {
  try {
    let { id, } = req.params;
    let { userid } = req.body
    let usernote=await Todo.findById(id)
    if (!usernote.owner.equals(userid)) {
      return res.status(403).json("You are not owner of this todo")
    }
    
     let deletedtodo = await Todo.findByIdAndDelete(id);
     res.json(deletedtodo);
  } catch (error) {
    res.json({message:error.message,name:error.name})
  }
 
})
router.put('/:id/update', async (req, res) => {
  try {
    let { id } = req.params;
    let { todo, userid } = req.body;
    let onenote = await Todo.findById(id)
    if (!onenote.owner.equals(userid)) {
      return res.status(403).json("you are not the owner of this note")
    }
    let updatedtodo = await Todo.findByIdAndUpdate(id, {
      todo: todo,
    });
    res.json(updatedtodo);
  } catch (error) {
    res.json({message:error.message,name:error.name})
  }
  
})
router.post('/:id/isdone', async (req, res) => {
  try {
    let { id } = req.params;
    let { userid } = req.body
    let onenote= await Todo.findById(id)
    if (!onenote.owner.equals(userid)) {
      return res.status(403).json("you are not the owner of this todo")
    }
      let updatednote = await Todo.findByIdAndUpdate(id, {
        isdone: true,
      });
      res.json(updatednote);
  } catch (error) {
    res.json({message:error.message,name:error.name})
  }

})
router.put('/:id/note', async(req, res) => {
  try {
    let { id } = req.params
    let { userid } = req.body
    let onetodo=await Todo.findById(id)
    if (!onetodo.owner.equals(userid)) {
      return res.status(403).json("you are not the owner of this todo")
    }
    res.json(onetodo)
  } catch (error) {
   res.json({message:error.message,name:error.name}) 
  }
})
module.exports =router