var gulp = require('gulp');
var sass = require('gulp-sass'),
connect = require('gulp-connect');
var path=require("path");


gulp.task('sass', function() {
    gulp.src('./sass/*.scss')
        .pipe(sass({
            sourceComments: true,
            outputStyle: 'compressed',
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./service/public/public/css'));
});

gulp.task('service', function() {
  connect.server({
    port: 3000
  });
  // run some headless tests with phantomjs 
  // when process exits: 
  
});


gulp.task('watch', ['sass'], function() {
    var sassWatcher = gulp.watch('./sass/*.scss', ['sass']);
   
});


var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var t=path.join;
	var b='./service/public/public/js/';

 
gulp.task("build", function () {
	
    return gulp.src([t(b,'q.js'),t(b,'object-commonPage.js'),
    				 t(b,'tool.js'),t(b,'ajax-help.js'),
    				 t(b,'home-information.js'),t(b,'login.js'),
    				 t(b,'detail-information.js'),t(b,'getScore.js'),
    				 t(b,'getCourseTable.js'),t(b,'getGymCount.js'),
    				 t(b,'getCourse.js'),t(b,'feedback.js'),
             t(b,'getHowMuchBirSame.js'),t(b,'getStuInfo.js'),
             t(b,'getDown.js'),t(b,'maiff-detail-information.js'),
             t(b,'newMaiffArticle.js'),
    				 t(b,'main.js')])
        .pipe(sourcemaps.init())
          .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./service/public/public/"))
        .pipe(uglify())
      .pipe(gulp.dest('service/public/public/output_js'));
});


var uglify = require('gulp-uglifyjs');
gulp.task("min",function(){
	return gulp.src('./service/public/public/main.js')
	  	.pipe(uglify())
	  	.pipe(gulp.dest('service/public/public/output_js'))

});