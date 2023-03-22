class GitCommand {
    constructor(working_directory) {
        this.working_directory = working_directory;
    }
    //Command: git init 
    init() {
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    status() {
        const new_changes = this.working_directory.new_changes;
        let new_changes_count = Object.keys(new_changes).length;

        let information = 'You have ' + new_changes_count + ' change/s.';
        for (let i = 0; i < new_changes_count; i++) {
            information += '\n' + Object.keys(new_changes)[i];
        }
        if (new_changes_count == 0) {
            information = 'You have 0 change/s.\n';
        }
        return information;
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file) {
        let modified_files = this.working_directory.new_changes;

        if (modified_files[path_file]) {
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        }
        else if (path_file == '.') {
            this.staging = Object.values(modified_files);
            this.working_directory.new_changes = {};
        }
        else {
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message) {
        if (this.staging.length > 0) {
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push() {
        if (this.local_repository.length > 0) {
            return "Done pushing to remote repository.";
        }
        else {
            return "Nothing to push. No committed file found.";
        }
    }
}


module.exports = GitCommand;
