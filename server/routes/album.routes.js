const express = require("express");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");
const AlbumController = require('../controllers/album.controller');

router.route("/album/new").post(isAuthenticatedUser,authorizeRoles("admin"),AlbumController.CreateAlbum);

router.route("/albums").get(isAuthenticatedUser, AlbumController.getAllAlbums);
router.route("/album/:id").get(isAuthenticatedUser, AlbumController.getAlbumDetails);
router.route("/album/update/:id").post(isAuthenticatedUser,authorizeRoles("admin"), AlbumController.addImage);
router.route("/album/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), AlbumController.deleteAlbum);
router.route("/review").put(isAuthenticatedUser, authorizeRoles("admin"), AlbumController.createAlbumReview);


module.exports = router;