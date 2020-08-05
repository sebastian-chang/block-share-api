const mongoose = require('mongoose')

const videoGameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    studio: {
        type: String,
        required: false,
    },
    poster: {
        type: String,
        required: false,
    },
    rating: {
        type: String,
        lowercase: true,
        required: false,
    },
    platform: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON:{
        virtuals: true,
    },
})

videoGameSchema.virtual('ESRB Rating').get(function (){
    if(this.rating === 'e') {
        return 'E for Everyone'
    }
    if(this.rating === 't') {
        return 'T for Teen'
    }
    if(this.rating === 'm') {
        return 'M for Mature'
    }
    if(this.rating === 'a') {
        return 'Adults only 18+'
    }
    if(this.rating === 'rp') {
        return 'Rating Pending'
    }
})

module.exports = mongoose.model('VideoGame', videoGameSchema)
