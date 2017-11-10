var express = require('express');
var router = express.Router();

/**
 * 按演唱者查找专辑
 */

/* Post Performer listing. */
router.post('/', function (req, res, next) {
    let performer = req.body.name;
    if (isNull(performer)) {
        console.log('request param is null')
        return;
    }

    console.log('query album by performer:' + performer);
    let reg = new RegExp(performer, 'i');
    var db = require('mongoskin').db('mongodb://127.0.0.1:27017/music');
    let queryObj = {
        '$or': [{
            'title': {
                $regex: reg,
                $options: 'i'
            }
        }, {
            'cd_list': {
                '$elemMatch': {
                    'title': {$regex: reg, $options: 'i'},
                    'performer': {$regex: reg, $options: 'i'}
                }
            }
        }]
    };

    // The below is also ok.
    /*
    queryObj = {
        '$or':
            [{
                'title': {
                    $regex: reg,
                    $options: 'i'
                }
            }, {'cd_list.title': {$regex: reg, $options: 'i'}}, {
                'cd_list.performer': {
                    $regex: reg,
                    $options: 'i'
                }
            }]
    };
    */
    db.collection('albums').find(queryObj).toArray(function (err, result) {
        if (err) throw err;
        console.log('find ' + result.length + ' albums.');
        // console.log(result);
        res.send(result);
    });
});

/* GET performer listing. */
router.get('/', function (req, res, next) {
    res.send('Welcom to Performer.');
});

/**
 * 判断是否null
 * @param data
 */
function isNull(data) {
    return (data == "" || data == undefined || data == null) ? true : false;
}

module.exports = router;