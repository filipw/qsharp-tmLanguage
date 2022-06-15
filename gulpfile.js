const gulp = require("gulp");
const ts = require("gulp-typescript");
const js_yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const grammarsDirectory = "grammars/";

gulp.task('buildJson', done => {
    const text = fs.readFileSync("src/qsharp.tmLanguage.yml");
    const jsonData = js_yaml.load(text);

    if (!fs.existsSync(grammarsDirectory)) {
        fs.mkdirSync(grammarsDirectory);
    }

    fs.writeFileSync(path.join(grammarsDirectory, 'qsharp.tmLanguage.json'), JSON.stringify(jsonData, null, '\t'));
    done();
});

gulp.task('compile', () => {
    const tsProject = ts.createProject("./tsconfig.json");
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest("out/"));
});

gulp.task('default',
    gulp.series(
        gulp.parallel('buildJson')));
