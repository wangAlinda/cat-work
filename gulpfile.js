var gulp = require("gulp");
var sass = require("gulp-sass"); //编译scss
var clean = require("gulp-clean-css"); //压缩css
var htmlmin = require("gulp-htmlmin"); //压缩html
var uglify = require("gulp-uglify"); //压缩js
var webserver = require("gulp-webserver"); //起服务
var fs = require("fs");
var path = require("path");
var url = require("url");
var babel = require("gulp-babel");
//1.编译scss
gulp.task("sass", function() {
    return gulp.src("./src/scss/*.scss").pipe(sass()).pipe(gulp.dest("./src/css"))
});
//监听scss
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("sass"))
});
//压缩js(es6)
gulp.task("babel", function() {
    return gulp.src("./src/js/common/zepto.js").pipe(babel({
        presets: "es2015"
    })).pipe(gulp.dest("./build/js"))
});
//7.起服务
gulp.task("web", function() {
    return gulp.src("./src").pipe(webserver({
        open: true,
        port: 3000,
        livereload: true,
        middleware: function(req, res, next) {
            var pathname = url.parse(req.url).pathname;
            if (pathname === '/favicon.ico') {
                res.end('');
                return;
            }
            if (pathname === '/api/list') {
                res.end(JSON.stringify({
                    code: 0,
                    data: list
                }));
            } else {

            }
            pathname = pathname === '/' ? 'index.html' : pathname;
            res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
        }
    }))
})