const express = require('express');
const router = express.Router();

// multer and cloudinary
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


const Project = require('../models/project');
const deleteImage = require('../middlewares/deleteImage');

const findFrameWorks = require('../middlewares/findFrameWorks');

// GET admin page
router.get('/', (req, res)=>{
    res.locals.current_page = 'adminPage';

    res.render('adminPage.ejs');
});



// POST new project entry
const newProjectImageUpload = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'projectImage', maxCount: 1}]);

router.post('/newProject', newProjectImageUpload, async (req, res)=>{
    const {projectName, projectDescription, projectMadeBy, githubLink, hostingLink=undefined, adminPassword} = req.body;
 
    console.log(req.body);
   
    projectMadeBy_Array = await findFrameWorks(projectMadeBy);

    if(adminPassword == process.env.ADMIN_PASSWORD){
        const newProject = new Project({
            projectName : projectName,
            projectDescription : projectDescription,
            projectMadeBy : projectMadeBy_Array,
            thumbnail : {
                url: req.files.thumbnail[0].path,
                name: req.files.thumbnail[0].filename
            },
            image : {
                url: req.files.projectImage[0].path,
                name: req.files.projectImage[0].filename
            },
            githubLink : githubLink,
            hostingLink : hostingLink    
        });

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
    const {projectName, projectDescription, projectMadeBy, githubLink, hostingLink=undefined, adminPassword} = req.body;

    projectMadeBy_Array = await findFrameWorks(projectMadeBy);

    if(adminPassword == process.env.ADMIN_PASSWORD){
        await Project.findByIdAndUpdate(id , {
            projectName : projectName,
            projectDescription : projectDescription,
            projectMadeBy : projectMadeBy_Array,
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
    const { deleteConfirmPassword } = req.body;

    if(deleteConfirmPassword == process.env.ADMIN_PASSWORD){
        // delete photos from cloudinary database
        const project = await Project.findOne({'_id': id});

        if(project){
            const thumbnail = project.thumbnail.name;
            const projectImage = project.image.name;

            await deleteImage(thumbnail, projectImage)
                .then(async ()=>{
                    await Project.findByIdAndRemove(id)
                        .then(()=>{
                            console.log('Deleted Project Successfully !');
                            res.redirect('/ghost_32/admin/projectCollection');
                        })
                        .catch(err => {
                            console.log('Cannot delete Project! Error: ' + err);
                            res.redirect('/ghost_32/admin/projectCollection');
                        })       
                })
                .catch((err)=>{
                    console.log('Cannot delete! Error: ' + err);
                    res.redirect('/ghost_32/admin/projectCollection');
                })
        }
        else{
            console.log('Cannot find data! Error: ' + err);
            res.redirect('/ghost_32/admin/projectCollection');
        }
    }
    else{
        console.log('Wrong Password!');
        res.redirect('/ghost_32/admin/projectCollection');
    }

});




module.exports = router;