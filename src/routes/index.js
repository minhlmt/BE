import user from './user.js';
import recipe from './recipe.js';
import comment from './comment.js';
import admin from './admin.js';
import recipeController from "../controllers/recipeController.js";

function router(app){
    app.use('/user',user);
    app.use('/recipe',recipe);
    app.use('/comment',comment);
    app.use('/admin',admin);
    // app.get("/recipe/search", recipeController.search);
    // app.get("/recipe/:id", recipeController.getrecipeByID);
}

export default router;