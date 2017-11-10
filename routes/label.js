var express = require('express');
var router = express.Router();

/**
 * 按厂牌查找专辑
 */

/* Post label listing. */
router.post('/', function (req, res, next) {
    let label_name = req.body.name;
    if (isNull(label_name)) {
        console.log('request param is null')
        return;
    }

    console.log('query album by label:' + label_name);
    let reg = new RegExp(label_name, 'i');
    var db = require('mongoskin').db('mongodb://127.0.0.1:27017/music');
    let queryObj = {'path': {$regex: reg, $options: 'i'}};
    db.collection('albums').find(queryObj).toArray(function (err, result) {
        if (err) throw err;
        console.log('find ' + result.length + ' albums.');
        // console.log(result);
        res.send(result);
    });
});

/* GET label listing. */
router.get('/', function (req, res, next) {
    res.send('Welcom to Label.');
});

/**
 * 判断是否null
 * @param data
 */
function isNull(data) {
    return (data == "" || data == undefined || data == null) ? true : false;
}

module.exports = router;