const mongoose = require("mongoose");
// Recall how exports work in Node.js?
const UrlSchema = require('./url.schema');

const UrlModel = mongoose.model("Url", UrlSchema);

function addUrl(url) {
    return UrlModel.create(url);
}

function getUrlByLongUrl(originalUrl) {
    return UrlModel.findOne({longUrl: originalUrl}).exec();
}

function getUrlByShortUrl(shortenedUrl) {
    return UrlModel.findOne({shortUrl: shortenedUrl}).exec();
}

function getAllUrls() {
    return UrlModel.find().exec();
}

function updateUrl(long, short) {
    return UrlModel.update({shortUrl: short}, {$set:{longUrl: long}}).exec();
}

function deleteUrl(short) {
    return UrlModel.deleteOne({shortUrl: short});
}

// Make sure to export a function after you create it!
module.exports = {
    addUrl: addUrl,
    getUrlByLongUrl: getUrlByLongUrl,
    getAllUrls: getAllUrls,
    getUrlByShortUrl: getUrlByShortUrl,
    updateUrl: updateUrl,
    deleteUrl: deleteUrl,
};