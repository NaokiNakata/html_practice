/*
 import

 body-parser
 connect
 ejs
 express
 method-override
 morgan
*/

var express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    post = require('./routes/post'),
    connect = require('connect'),
    methodOverride = require('method-override');

//テンプレートの位置を指定する
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//put,delete
app.use(methodOverride(function(req, res){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        //look in urlencoded POST bodies and delete edit
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(logger('dev'));
app.use(function(err, req, res, next){
    res.send(err.message);
});


// routing

//記事一覧
app.get('/', post.index);
//postの詳細画面
app.get('/posts/:id([0-9]+)', post.show);
//新規作成フォームの表示
app.get('/posts/new', post.new);
//新規作成ページ
app.post('/posts/create', post.create);
//更新(編集フォーム)
app.get('/posts/:id/edit', post.edit);
//編集フォームの投稿先
app.put('/posts/:id', post.update);
//ページの削除
app.delete('/posts/:id', post.destroy);

app.listen(3000);
console.log('server starting...');