var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var notify = require("gulp-notify");
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var bourbon = require('node-bourbon');
var csso = require('gulp-csso');
var htmlhint = require("gulp-htmlhint");
var sassGlob = require('gulp-sass-glob');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('./src/img/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                padding: 15
            }));

    spriteData.img.pipe(gulp.dest('./app/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./src/scss/components')); // путь, куда сохраняем стили
});

gulp.task('pug', function() {
    return gulp.src(['src/pug/**/*.pug', '!src/pug/**/_*.pug'])
        .pipe(pug({pretty: '\t'}))
        .on("error", notify.onError())
        .pipe(browserSync.reload({stream: true}))
        .pipe(gulp.dest('app'));
});

gulp.task('styles', function () {
   return gulp
       .src('src/scss/**/*.scss')
       .pipe(sassGlob())
       .pipe(sass())
       .pipe(gulp.dest('app/css'));
});

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({includePaths: require("node-bourbon").includePaths})
            .on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer({
            browsers: ['>1%', 'last 2 versions'],
            cascade: false
        })) //подключаем Autoprefixer
        .pipe(cleanCSS())
        .pipe(csscomb())
        .pipe(csso()) // минифицируем css, полученный на предыдущем шаге
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function() {
    return gulp
            .src(srcDir + 'stylesheets/style.scss')
            .pipe(bulkSass())
            .pipe(
                sass({
                    includePaths: ['src/stylesheets']
                }))
            .pipe( gulp.dest('./app/css/') );
});

gulp.task('scripts', function() {
    return gulp.src([
         
         'src/js/*.js',

         'src/js/common.js', // Always at the end
        ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('browserSync', ['sass', 'pug'], function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('compress', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img'))
});


gulp.task('htmlhint', function() {
    gulp.src("./src/**/*.html")
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
});

gulp.task('watch', ['pug', 'sass', 'browserSync'], function() {
    gulp.watch('src/pug/**/*.pug', ['pug']);
    // gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
