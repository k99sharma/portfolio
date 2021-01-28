const express = require('express');
const router = express.Router();

const Project = require('../models/project');

const findFrameWorks = require('../middlewares/findFrameWorks');

// GET admin page
router.get('/', (req, res)=>{
    res.locals.current_page = 'adminPage';

    res.render('adminPage.ejs');
});



// POST new project entry
router.post('/newProject', async (req, res)=>{
    const {projectName, projectDescription, projectMadeBy, imageLink, thumbnailLink, videoLink, githubLink, hostingLink=undefined, adminPassword} = req.body;

    projectMadeBy_Array = await findFrameWorks(projectMadeBy);

    if(adminPassword == process.env.ADMIN_PASSWORD){
        const newProject = new Project({
            projectName : projectName,
            projectDescription : projectDescription,
            projectMadeBy : projectMadeBy_Array,
            thumbnailLink : thumbnailLink,
            imageLink : imageLink,
            videoLink : videoLink,
            githubLink : githubLink,
            hostingLink : hostingLink    
        });

        console.log(newProject);

        await newProject.save()
            .then(()=>{
                console.log('Project saved!');
                res.redirect('/ghost_32/admin/projectCollection');
            })
            .catch(err => {
                console.log('Project cannot be saved! Error: ' + err);
                res.redirect('/ghost_32/admin');
            })
    }

    else{
        console.log('Wrong Credential');
        res.redirect('/ghost_32/admin');
    }
});



// GET project collection
router.get('/projectCollection', async (req, res)=>{
    res.locals.current_page = 'projectCollection';

    const allProjects = await Project.find({})
     
    if(allProjects){
        console.log('Data is succefully retrieved!');
        res.render('projectCollection.ejs', {allProjects});
    }
    else{
        console.log('Data cannot be successfully retrieved!');
        res.redirect('/ghost_32/admin');
    }
});



// Edit Project
router.put('/projectCollection/:id', async(req, res)=>{
    const { id } = req.params;
    const {projectName, projectDescription, projectMadeBy, imageLink, thumbnailLink, videoLink, githubLink, hostingLink=undefined, adminPassword} = req.body;

    projectMadeBy_Array = await findFrameWorks(projectMadeBy);

    if(adminPassword == process.env.ADMIN_PASSWORD){
        await Project.findByIdAndUpdate(id , {
            projectName : projectName,
            projectDescription : projectDescription,
            projectMadeBy : projectMadeBy_Array,
            thumbnailLink : thumbnailLink,
            imageLink : imageLink,
            videoLink : videoLink,
            githubLink : githubLink,
            hostingLink : hostingLink,
            modifiedOn: Date.now()
        })
        .then(()=>{
            console.log('Project Edited successfully !');
            res.redirect('/ghost_32/admin/projectCollection');

        })
        .catch(err => {
            console.log('Project cannot be edited. Error: ' + err);
            res.redirect('/ghost_32/admin/projectCollection');
        })
    }

    else{
        console.log('Wrong Credential');
        res.redirect('/ghost_32/admin');
    }
});


// Delete project 
router.delete('/projectCollection/:id', async (req, res)=>{
    const {id} = req.params;

    await Project.findByIdAndRemove(id)
        .then(()=>{
            console.log('Deleted Project Successfully !');
            res.redirect('/ghost_32/admin/projectCollection');
        })
        .catch(err => {
            console.log('Cannot delete Project! Error: ' + err);
            res.redirect('/ghost_32/admin/projectCollection');
        })
});




module.exports = router;