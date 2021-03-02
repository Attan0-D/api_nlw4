import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

//rota para a criação do usuario
router.post('/users', userController.create);

//rota para a criação das perguntas
router.post('/surveys', surveyController.create);

//rota para listar as perguntas
router.get('/surveys', surveyController.show);

//rota para o sendmail
router.post("/sendMail", sendMailController.execute);

//rota para a execução da avaliação das respostas, comentário opcional e página final
router.get("/answers/:value", answerController.execute);

//calculo de NPS
router.get("/nps/:survey_id", npsController.execute);


export {router};