const Schema = require('mongoose').Schema;
const bcrypt = require('bcryptjs');

const UrlSchema = new Schema({
    longUrl: {type: String, index: true},
    shortUrl: {type: String, index: true},
}, { collection : 'urls' });

// Save is a MongoDB API, that is called by 'create'
// UrlSchema.pre("save", function(next) {
//     // this logic below allows us to protect the password
//     // in the case of a user update, but
//     // where the password
//     if(!this.isModified("password")) {
//         return next();
//     }
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// });

// UrlSchema.methods.comparePassword = function(plaintext, callback) {
//     return callback(null, bcrypt.compareSync(plaintext, this.password));
// };

module.exports = UrlSchema;