const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const opts = { toJSON: { virtuals: true } };


const CampgroundSchema = new Schema({
    title: String,
    images: [{
        url: String,
        filename: String
    }],
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],


}, opts);


CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
    return `<img src="${this.images[0].url}" width="100" height="auto">
    <hr>
    <a href="/campgrounds/${this._id}">${this.title}</a>`;
});


CampgroundSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        const reviews = [...doc.reviews]
        for (let review of reviews) {
            await Review.remove({ _id: review })
        }
    }

})

module.exports = mongoose.model('Campground', CampgroundSchema)