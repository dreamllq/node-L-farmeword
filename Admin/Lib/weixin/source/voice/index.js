/**
 * Created by lvlq on 16/8/5.
 */
var express = require("express");
var router = express.Router();
var source_type = require("../../enum/source_type");
var source_status = require("../../enum/source_status");

router.get("/index", function (req, res) {
    var returnData = {};

    Models.weixin_source.pageData(req.query.page, {
        type: source_type.VOICE
    }).then(function (data) {
        returnData.list = data.list;
        returnData.page = data.page;
        res.render("weixin/source/voice/index.html", returnData);
    }).catch(function (err) {
        console.log(err);
        res.r404();
    })
});

router.post("/add", function (req, res) {
    var data = {
        data: req.body.data,
        type: source_type.VOICE,
        uid: req.session.user.id,
        status: source_status.ONLINE,
        desc: req.body.desc
    };

    Models.weixin_source.addSource(data).then(function () {
        res.success();
    }).catch(function (err) {
        res.error(10001, err.message, err);
    });
});

router.post("/delete", function (req, res) {
    var data = {
        id: req.body.id,
        type: source_type.VOICE
    };

    Models.weixin_source.deleteSource(data).then(function () {
        res.success();
    }).catch(function (err) {
        res.error(10001, err.message, err);
    });
});

router.post("/list", function (req, res) {
    Models.weixin_source.findAll({
        where: {
            type: source_type.VOICE
        }
    }).then(function (data) {
        res.success({
            list: data
        });
    }).catch(function (err) {
        res.error(10003, '系统错误', err);
    })
});
module.exports = router;