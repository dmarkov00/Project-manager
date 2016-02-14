'use strict';
module.exports = function(Project) {
  let controller = {
    get: function(req, res) {
      Project.find({}, function(err, projects) {
        if (err) {
          throw err;
        }


        res.render('projects-all', {
          data: projects
        });
      });
    },
    // the data layer can be extracted in i mean getForm(), getById().. in a data file
    getForm: function(req, res) {
      //check if user is authenticated
      res.render('project-add');
      //else
      // res.redirect('login')
    },
    getById: function(req, res) {
      let id = req.params.id;
      Project.findById(id, function(err, project) {
        if (err) {
          throw err;
        }
        if (!project) {
          res.redirect('error-not-found');
          return;
        }
        res.render('project-details', {
          data: project
        });
      });

    },
    post: function(req, res) {
      //validate project
      let reqProject = req.body;
      let project = new Project({
        name: reqProject.name,
        deadline: reqProject.deadline,
        description: reqProject.description
      });
      project.save(function(err) {
        res.status(201).redirect('/projects/' + project._id);
      });

    }

  };
  return controller;
};
