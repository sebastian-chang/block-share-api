const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

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
        default: false,
    },
    comment: [commentSchema],
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

videoGameSchema.virtual('ESRB').get(function (){
    if(this.rating === 'e') {
        return 'E for Everyone'
    }
    if(this.rating === 't') {
        return 'T for Teen'
    }
    if(this.rating === 'm') {
        return 'M for Mature'
    }
    if(this.rating === 'rp') {
        return 'Rating Pending'
    }
})
videoGameSchema.virtual('ESRBFileName').get(function () {
    if (this.rating === 'e') {
        return 'ESRB_2013_Everyone.svg'
    }
    if (this.rating === 't') {
        return 'ESRB_2013_Teen.svg'
    }
    if (this.rating === 'm') {
        return 'ESRB_2013_Mature.svg'
    }
    if (this.rating === 'rp') {
        return 'ESRB_2013_Rating_Pending.svg'
    }
})

videoGameSchema.virtual('console').get(function () {
    if (this.platform === 'xbox') {
        return 'Microsoft Xbox One'
    }
    if (this.platform === 'ps4') {
        return 'Sony Playstion 4'
    }
    if (this.platform === 'ns') {
        return 'Nintendo Switch'
    }
    if (this.platform === 'pc') {
        return 'Personal Computer'
    }
})
videoGameSchema.virtual('consoleColor').get(function () {
    if (this.platform === 'xbox') {
        return 'green'
    }
    if (this.platform === 'ps4') {
        return 'blue'
    }
    if (this.platform === 'ns') {
        return 'red'
    }
    if (this.platform === 'pc') {
        return 'black'
    }
})
videoGameSchema.virtual('consoleFileName').get(function () {
    if (this.platform === 'xbox') {
        return 'xbox-one.png'
    }
    if (this.platform === 'ps4') {
        return 'ps4.png'
    }
    if (this.platform === 'ns') {
        return 'nintendo-switch.jpg'
    }
    if (this.platform === 'pc') {
        return 'black'
    }
})
videoGameSchema.virtual('hasPoster').get(function () {
    return (this.poster !== '')
})

module.exports = mongoose.model('VideoGame', videoGameSchema)
