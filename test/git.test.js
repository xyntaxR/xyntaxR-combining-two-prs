const WorkingDirectory = require("../models/working-directory");
const GitCommand = require("../models/git-command");

const chai = require('chai');
const expect = chai.expect;

describe("Testing add()", function(){

    it('Should success with exact path_file "views/index.html"', function(){
        let wd = new WorkingDirectory();
        wd.addFile("index.html", "views", "<html>Hello</html>");

        let git = new GitCommand(wd);
        git.init();

        let path_file = "views/index.html";
        let output = git.add(path_file);

        expect(output).to.equal('Successfully added as index file/s.');
    });

    it('Should failed with missing path_file "views/error404.html"', function(){
        let wd = new WorkingDirectory();
        wd.addFile("index.html", "views", "<html>Hello</html>");

        let git = new GitCommand(wd);
        git.init();

        let path_file = "views/error404.html";
        let output = git.add(path_file);

        expect(output).to.equal(`Failed to add ${path_file}! File is not modified or missing.`);
    });


    it('Should success with path file "."', function(){
        let wd = new WorkingDirectory();
        wd.addFile("index.html", "views", "<html>Hello</html>");
        wd.addFile("actions.yml", ".github/workflows", "");

        let git = new GitCommand(wd);
        git.init();

        let output_add = git.add(".");
        let output_status = git.status();


        expect(output_add).to.equal('Successfully added as index file/s.');
        expect(output_status).to.equal('You have 0 change/s.\n');
    });

    it('Should success with path file "*"', function(){
        let wd = new WorkingDirectory();
        wd.addFile("index.html", "views", "<html>Hello</html>");
        wd.addFile("actions.yml", ".github/workflows", "");

        let git = new GitCommand(wd);
        git.init();

        let output_add = git.add("*");
        let output_status = git.status();

        expect(output_add).to.equal('Successfully added as index file/s.');
        expect(output_status).to.equal('You have 1 change/s.\n.github/workflows/actions.yml');
    });
})