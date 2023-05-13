const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const adminSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { type: String, required: true },
    confirmationCode: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },

}, {
    versionKey: false,
    timestamps: true,
});

//hasing the pass

adminSchema.methods.check = function (password) {
    return bcrypt.compareSync(password, this.password)
}
adminSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})

module.exports = mongoose.model('admins', adminSchema)