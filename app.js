const mongoose = require('mongoose');


//Connect to Database
mongoose.connect('mongodb://localhost:27017' , { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('Connected to database');
})
.catch((err) => {
    consolw.error(err);
})

//Create person schema
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age : { type: Number},
    favoriteFoods : { type: [String]},
});

const Person = mongoose.model('Person', personSchema);

//Create and Save a Record of a Model

const Babacar = new Person({
    name: 'Babacar',
    age: 18,
    favoriteFoods : ['Local', 'sandwich'],
}) ;

Babacar.save()
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.error(err);
    });

    //Create Many Records with model.create()

const arrayOfPeople = [
    { name: 'Max Bo', age:31 , favoriteFoods : ['pizza' , 'biscuit' ]},
    { name: 'Alba' , age: 25 , favoriteFoods : ['sandwich' , 'burger' ]},
    { name: 'Ablaye ' , age:23  , favoriteFoods : ['Tacos ' , 'chicken' ]}
]

Person.create(arrayOfPeople)
.then((data) => {
    console.log(data)
})
.catch((err) => {
    console.log(err)
});

//Use model.find() to Search Your Database
Person.find({ name:'Max Bo'})
.then((data) => {
    console.log(data)
})
.catch((err) => {
    console.log(err)
});

//Use model.findOne() to Return a Single Matching Document from Your Database

Person.findOne({ favoriteFoods: 'Tacos' })
.then((data) => {
    console.log(data)
})
.catch((err) => {
    console.log(err)
});

//Use model.findById() to Search Your Database By _id
Person.findById('656e0471aa52b141cfdba062')
.then((data) => {
    console.log(data)
})
.catch((err) => {
    console.log(err)
});

//Perform Classic Updates by Running Find, Edit, then Save
Person.findById('656e0471aa52b141cfdba062')
.then((person) => {
    if (!person) {
    console.log('Person not found');
    } else {
      // Add "hamburger" to the list of favoriteFoods
    person.favoriteFoods.push('hamburger');

    return person.save();
    }
})
.then((updatedPerson) => {
    console.log(updatedPerson);
})
.catch((err) => {
    console.error(err);
});

//Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate(
    {name: 'Alba'},
    { $set: { age: 20 } },
    {new: true}


)
.then((data) => {
    console.log(data)
})
.catch((err) => {
    console.log(err)
});


// Delete One Document Using model.findByIdAndRemove
Person.findOneAndDelete({ _id: '656e2dea676a4922f9d6621c'})
.then((removePerson) => {
    console.log(removePerson)
})
.catch((err) => {
    console.log(err)
});

//MongoDB and Mongoose - Delete Many Documents with model.remove()

Person.deleteMany({name: 'Mary'})
.then((result) => {
    console.log(result)
})
.catch((err) => {
    console.log(err)
});

//Chain Search Query Helpers to Narrow Search Results
Person.find({favoriteFoods : 'burritos'})
.sort({name:1})
.limit(1)
.select({age : 0})
.exec()
.then((result) => {
    console.log(result)
})
.catch((err) => {
    console.log(err)
});