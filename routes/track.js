var express = require('express');
var router = express.Router();

/**
 * 按曲目名查找专辑
 */

/* Post track listing. */
router.post('/', function (req, res, next) {
    let track = req.body.name;
    if (isNull(track)) {
        console.log('request param is null');
        return;
    }

    console.log('query album by track:' + track);
    var db = require('mongoskin').db('mongodb://127.0.0.1:27017/music');
    let queryObj = {
        'cd_list': {
            '$elemMatch': {
                'tracks': {
                    $regex: track, $options: 'i'
                }
            }
        }
    };
    // The below is also ok.
    /*
    queryObj = {'cd_list.tracks': track, $options: 'i'};
     */
    db.collection('albums').find(queryObj).toArray(function (err, result) {
        if (err) throw err;
        console.log('find ' + result.length + ' albums.');
        // console.log(result);
        res.send(result);
    });
});

/* GET track listing. */
router.get('/', function (req, res, next) {
    res.send('Welcom to Track.');
});

/**
 * 判断是否null
 * @param data
 */
function isNull(data) {
    return (data == "" || data == undefined || data == null) ? true : false;
}

module.exports = router;