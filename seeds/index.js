const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,

    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)]
const price = Math.floor(Math.random() * 20) + 10;
const seedDB = async() => {
    await Campground.deleteMany({});
    for (let c = 0; c <= 200; c++) {
        const random = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '616a974c2633d539ab033c81',
            location: `${cities[random].city},${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [

                    cities[random].longitude,
                    cities[random].latitude,
                ]

            },
            images: [{
                url: 'https://res.cloudinary.com/ddo0nenjm/image/upload/v1634743663/YelpCamp/ka48jlgstnqmxchir8zv.jpg',
                filename: "YelpCamp/ka48jlgstnqmxchir8zv",

            }],


        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})