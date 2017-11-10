var express = require('express');
var router = express.Router();

/**
 * 按专辑名称查找专辑
 */

/* Post album listing. */
router.post('/', function (req, res, next) {
    let album_name = req.body.name;
    if (isNull(album_name)) {
        console.log('request param is null')
        return;
    }

    console.log('query album:' + album_name);
    let reg = new RegExp(album_name, 'i');
    var db = require('mongoskin').db('mongodb://127.0.0.1:27017/music');
    let queryObj = {
        '$or': [{'title': {$regex: reg, $options: 'i'}},
            {'path': {$regex: reg, $options: 'i'}},
            {
                'cd_list': {
                    '$elemMatch': {
                        'title': {
                            $regex: reg,
                            $options: 'i'
                        }
                    }
                }
            }]
    };
    db.collection('albums').find(queryObj).toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        console.log('find ' + result.length + ' albums.');
        res.send(result);
    });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('Welcom to album.');
});

/**
 * 判断是否null
 * @param data
 */
function isNull(data) {
    return (data == "" || data == undefined || data == null) ? true : false;
}

module.exports = router;