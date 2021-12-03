const Album  = require("../models/album.models");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require('fs')


const CreateAlbum = catchAsyncErrors( async (request, response, next) => {
    const imagesLinks = [];

    let AlbumData = {
        title: request.body.title,
        description: request.body.description,
        images: imagesLinks,
    }

    const album = await Album.create(AlbumData);
    response.status(201).json({
        success: true,
        album,
    }); 
});

const getAllAlbums = catchAsyncErrors( async (request, response, next) => {

    try {
        const albumsCount = await Album.countDocuments();
        const albums = await Album.find();

        response.status(200).json({
            success: true,
            albums,
            albumsCount,
        });
    } catch (error) {

    }
    
});

const getAlbumDetails = catchAsyncErrors( async (request, response, next) => {
    const album = await Album.findById(request.params.id);

    if(!album) {
        return response.status(404).json({
            messsage: "No such Album."
        })
    }

    return response.status(200).json({
        success: true,
        album
    });
})

const addImage = catchAsyncErrors( async (request, response, next) => {

    let album = await Album.findById(request.params.id);

    if (!album) {
        return next(new ErrorHander("Product not found", 404));
    }
    // let images = [];
    console.log(request);
    const imagesLinks = [];
    if (request?.files?.images !== undefined) {
        // Deleting Images From Cloudinary
        console.log("checking images 0");

        
        if(request.files.images) {
            console.log("checking images");
            if(Array.isArray(request.files.images)){
            console.log("checking images array");
            for (let i = 0; i < request.files.images.length; i++) {
            
                const fileType = request.files.images[i].mimetype.replace("image/","");
                fs.writeFileSync(`./Image.${fileType}`, request.files.images[i].data)
    
                const result = await cloudinary.v2.uploader.upload(`Image.${fileType}`, {
                            folder: "products",
                        },
                            function(error, result) {
                                if(error) {
                                    console.log("cloud Error : ");
                                    fs.writeFile('./Output.txt', JSON.stringify(error), (err) => { 
                                        // In case of a error throw err. 
                                        if (err) throw err; 
                                    }) 
                                } else {
                                    console.log("cloud result ", result);
                                }
                            }
                );
    
    
                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
                fs.unlinkSync(`./Image.${fileType}`);
            } }else {
                console.log("checking images single");
                const fileType = request.files.images.mimetype.replace("image/","");
                fs.writeFileSync(`./Image.${fileType}`, request.files.images.data)
    
                const result = await cloudinary.v2.uploader.upload(`Image.${fileType}`, {
                            folder: "products",
                        },
                            function(error, result) {
                                if(error) {
                                    console.log("cloud Error : ");
                                    fs.writeFile('./Output.txt', JSON.stringify(error), (err) => { 
                                        // In case of a error throw err. 
                                        if (err) throw err; 
                                    }) 
                                } else {
                                    console.log("cloud result ", result);
                                }
                            }
                );
    
    
                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
                fs.unlinkSync(`./Image.${fileType}`);
            }
        }
        

        
    }
    console.log("helloooo")
    Album.findOneAndUpdate({_id : request.params.id}, {
        $push: { "images": imagesLinks },
        function(err, result) {
            console.log("at this stage");
            if (err) {
                return response.status(404).json({
                    message: "Update failed"
                })
            } else {
                response.status(200).json({
                    sucess: true,
                    album: result
                });
            }
        }
    })
});


const deleteAlbum = catchAsyncErrors( async (request, response, next) => {

    const album = await Album.findById(request.params.id);

    if(!album) {
        return response.status(404).json({
            messsage: "No such Album."
        })
    }

    for (let i = 0; i < album.images.length; i++) {
        await cloudinary.v2.uploader.destroy(album.images[i].public_id);
    }

    await album.remove();

    response.status(200).json({
        success: true,
        message: "Album Delete Successfully",
    });
})

const createAlbumReview = catchAsyncErrors( async (request, response, next) => {

    const {  comment, albumId } = request.body;
    console.log(request);
    const review = {
        user: request.user._id,
        name: request.user.name,
        comment,
    };
    const album = await Album.findById(albumId);
    const isReviewed = () => {
        
        if(album.reviews === null) {
            return false;
        }
        return album.reviews.find(
            (rev) => rev.user.toString() === request.user._id.toString()
        );
    }
    if (isReviewed()) {
        album.reviews.forEach((rev) => {
            if (rev.user.toString() === request.user._id.toString())
            (rev.comment = comment);
        });
    } else {
        album.reviews.push(review);
        album.numOfReviews = album.reviews.length;
    }

    await album.save({ validateBeforeSave: false });
    response.status(200).json({
        success: true,
    });
});


module.exports = {
    CreateAlbum,
    getAllAlbums,
    getAlbumDetails,
    addImage,
    deleteAlbum,
    createAlbumReview
}