const express = require('express');
const router = express.Router();

const UrlModel = require('../model/url.model');
const uuidv4 = require('uuid/v4');


// get all urls
router.get('/', (req, res) => {
    return UrlModel.getAllUrls().then(response => {
        res.status(200).send(response);
    }, () =>  res.status(404).send({message: "error"}));
})

// post shortened url(branded/unbranded)
router.post('/', (req, res) => {
    const {long, short} = req.body;
    if (!long) {
        return res.status(404).send({message: "Must include long Url"});
    }

    return UrlModel.getUrlByLongUrl(long).then((response) => {
            if (response) {
                return res.status(200).send(response);
            }
            let shortId = short? short: uuidv4();
            // let newShortUrl = "https://" + req.hostname + "/url/" + shortId;
            let newShortUrl = shortId;
            let newUrl = {longUrl: long, shortUrl: newShortUrl};
            UrlModel.addUrl(newUrl);
            return res.status(200).send(newUrl);
        }
    );



});

// search for short url
router.get('/short/:short', (req, res) => {
    const short = req.params.short;
    if (!short) {
        return res.status(404).send({message: "Must include short Url"});
    }

    return UrlModel.getUrlByShortUrl(short).then((response) => {
            if (response) {
                return res.status(200).send(response);
            }
            return res.status(400).send({message: "Url not found"});
        }
    );
});


// search for long url
router.get('/long/:long', (req, res) => {
    const long = req.params.long;
    if (!long) {
        return res.status(404).send({message: "Must include long Url"});
    }

    return UrlModel.getUrlByLongUrl(long).then((response) => {
            if (response) {
                return res.status(200).send(response);
            }
            return res.status(400).send({message: "Url not found"});
        }
    );
});

// update
router.put('/', (req, res) => {
    const {long, short} = req.body;
    if (!short) {
        return res.status(404).send({message: "Must include long Url"});
    }
    if (!long) {
        return res.status(404).send({message: "The updated url is empty"});
    }
    UrlModel.getUrlByShortUrl(short).then(response => {
        if (!response) {
            return res.status(404).send({message: "Short Url doesn't exist"});
        }
        UrlModel.getUrlByLongUrl(long).then(response => {
            if (response) {
                return res.status(404).send({message: "Current Long Url already exist"});
            }
        });
        UrlModel.updateUrl(long, short).then(response => {
            if (response) {
                return res.status(200).send(response);
            }
            return res.status(404).send({message: "Cannot update"});
        });
    });




});

// delete

router.delete('/', (req, res) => {
    let short = req.body.short;
    UrlModel.getUrlByShortUrl(short).then(response => {
        if (!response) {
            return res.status(404).send({message: "Cannot find short Url"});
        }
    }).catch();
    return UrlModel.deleteUrl(short).then(response => {
        return res.status(200).send(response);
    });
});

module.exports = router;