const gulp = require("gulp");
const mocha = require("gulp-mocha");
const ts = require("gulp-typescript");
const js_yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const plist = require("plist");

const grammarsDir = "grammars/";

gulp.task('buildJson', done => {
    const text = fs.readFileSync("src/qsharp.tmLanguage.yml");
    const jsonData = js_yaml.load(text);

    ensureGrammarsDir();

    fs.writeFileSync(path.join(grammarsDir, 'qsharp.tmLanguage.json'), JSON.stringify(jsonData, null, '\t'));
    done();
});

gulp.task('buildTmLanguage', done => {
    const text = fs.readFileSync("src/qsharp.tmLanguage.yml");
    const jsonData = js_yaml.load(text);
    const plistData = plist.build(jsonData);

    ensureGrammarsDir();

    fs.writeFileSync(path.join(grammarsDir, 'qsharp.tmLanguage'), plistData);

    done();
});

gulp.task('compile', () => {
    const tsProject = ts.createProject("./tsconfig.json");
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest("out/"));
});

gulp.task('test', gulp.series('compile', done => {
    const result = gulp.src("out/test/**/*.tests.js")
        .pipe(mocha())
        .on("error", err => {
            console.log(err.toString());
            process.exit(-1);
        });

    done();

    return result;
}));

function ensureGrammarsDir() {
    if (!fs.existsSync(grammarsDir)) {
        fs.mkdirSync(grammarsDir);
    }
}

gulp.task('default', gulp.series(gulp.parallel('buildJson', 'buildTmLanguage'), 'test'));
