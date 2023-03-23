const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const _ = require("lodash");

const homeStartingContent =  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure consequuntur nulla praesentium libero, id illo aliquid consequatur iste accusantium doloremque molestias culpa harum earum illum recusandae ea fugiat beatae cum asperiores! Delectus quae explicabo, temporibus, nihil impedit atque ipsam, cumque eveniet aperiam porro eos accusantium repellendus aut officiis odit expedita molestias eligendi dicta ratione voluptate numquam. Placeat, cum perspiciatis ducimus quaerat at quas facere eos ea fugit optio temporibus dolorum repellat consequatur quos cupiditate, nostrum, a iure aut illum alias rem incidunt reiciendis ipsum. Nihil esse vitae aliquam ratione? Sequi optio deleniti enim nihil ratione hic ipsa suscipit neque id."

const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae aut vitae eligendi? Iste, doloribus eos nobis cum, corrupti commodi deserunt distinctio quaerat quibusdam, praesentium harum sapiente perferendis repudiandae magni enim voluptatibus debitis sit dolorem neque eius nisi nostrum consequuntur atque? Magnam magni praesentium ad at velit eligendi veritatis quasi impedit provident soluta ducimus illum explicabo sunt, porro ipsam ratione obcaecati iste laborum incidunt est aspernatur. Error impedit suscipit soluta aliquid!";

const contactContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam repudiandae animi placeat ullam? Eos cupiditate cum quis quo aliquam corrupti dolores officia aliquid a laboriosam placeat eius repellendus nemo tempore dolorem sequi, ex id nulla nisi natus dicta! Vero, magni.";


const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-chetan:LYm9BmdGqs5pG3Xl@cluster0.s1nr6vc.mongodb.net/blogDB").then(() => console.log("MongoDb database Connected!")).catch((error) => console.log(error.reason));

const postsSchema = new Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postsSchema);


app.get("/", function(req, res){
    Post.find({}).then((posts) => {
      res.render("home", {homeStartingContent: homeStartingContent, posts: posts});
    }).catch((error) => console.log(error.reason));
});

app.get("/about", function(req, res){
    res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
    res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
    res.render("compose");
});

app.post("/compose", function(req, res){
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });
    post.save().then(() => console.log("Title and Content Inserted!")).catch((error) => console.log(error.reason));
    res.redirect("/");
});

app.get("/posts/:postId", function(req, res) {     
    const requestedPostId = req.params.postId;
    Post.findOne({_id: requestedPostId}).then((post) =>{
            res.render("post", {title: post.title, content: post.content});
        }).catch((error) => console.log(error.reason));
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});