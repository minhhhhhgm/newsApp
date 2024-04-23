import Vasern from 'vasern';

// Import schemas
/**
 * Import Models in here.
 * {} Curly braces has to be used if models are not export default.
 */
import { BookmarkModel } from './Bookmark';
import { TodoModel } from './Todo';
import { UserSettingModel } from './User';
import { ViewedModel } from './Viewed';
import { CategoryModel } from './Category';
import { ItemCategory } from './Category';
import { TestCategoryModel } from './Category';
import { CategoryManagementModel } from './Category';
/**
 * Creating Instance of Vasern DB.
 * Providing all the models that are imported above as Schema to the instance.
 */
export default new Vasern({
    schemas: [
        TodoModel,
        UserSettingModel,
        BookmarkModel,
        ViewedModel,
        CategoryModel,
        ItemCategory,
        TestCategoryModel,
        CategoryManagementModel
    ]
});