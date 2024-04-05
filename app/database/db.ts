import Vasern from 'vasern';

// Import schemas
/**
 * Import Models in here.
 * {} Curly braces has to be used if models are not export default.
 */
import { TodoModel } from './Todo';
import { UserModel } from './User';
import { NewsSchema } from './News';

/**
 * Creating Instance of Vasern DB.
 * Providing all the models that are imported above as Schema to the instance.
 */
export default new Vasern({
    schemas: [TodoModel, UserModel, NewsSchema]
});