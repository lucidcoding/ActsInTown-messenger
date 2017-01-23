var gulp = require("gulp");
var gulpTypings = require("gulp-typings");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("compile", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("installTypings",function() {
    var stream = gulp.src("./typings.json")
        .pipe(gulpTypings()); //will install all typingsfiles in pipeline. 
    return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished. 
});

gulp.task('default', ['compile']);//, 'installTypings']);
