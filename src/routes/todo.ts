import {Router} from 'express' ;
import { addNewTodo, deleteAllTodos, deleteTodoById, getAllTodos, getTodoById, updateTodo } from '../controllers/todo';
import authorizationMiddleWare from '../middlewares/authorization';
import { authenticationMiddleWare } from '../middlewares/authentication';
const router = Router() ;
router.use(authenticationMiddleWare) ; // authentication middleware for all todos router (all endpoints) .
router.route('/todo').post(addNewTodo).get(authorizationMiddleWare, getAllTodos).delete( authorizationMiddleWare ,deleteAllTodos);
router.route('/:id').get(getTodoById).delete(deleteTodoById).patch(updateTodo);
export default router  ;