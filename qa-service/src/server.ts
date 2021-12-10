process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import 'reflect-metadata';
import App from '@/app';
import { AuthController } from '@/controllers/core/auth.controller';
import { IndexController } from '@/controllers/core/index.controller';
import { UsersController } from '@/controllers/core/users.controller';
import { QuestionsController } from './controllers/qa/question.controller';
import validateEnv from '@utils/validateEnv';
import { AnswersController } from './controllers/qa/answer.controller';
import { CommentsController } from './controllers/qa/comment.controller';
import { TagsController } from './controllers/qa/tag.controller';

validateEnv();

const app = new App([AuthController, IndexController, UsersController, QuestionsController, AnswersController, CommentsController, TagsController]);
app.listen();
