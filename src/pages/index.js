//ABOUT
import AboutContainer from './about/';
// HOME
import HomeContainer from './home/';
// LESSONS
import LessonContainer from './lesson/';
// EXAMS
import ExamContainer, { useLessonPhaseContext, useCanDoContext, useExerciseContext, useReportContext } from "./exam";
import LevelContainer from './exam/levelContainer/'
import ExerciseContainer, { usePhaseContext, useAnswerSelectedContext } from './exam/exerciseContainer/'
import CanDoContainer from './exam/canDoContainer/'

// EXPORT all
export { 
  ExamContainer, useLessonPhaseContext, useCanDoContext, useExerciseContext, useReportContext,
  LessonContainer,
  AboutContainer,
  HomeContainer,
  LevelContainer,
  ExerciseContainer, usePhaseContext, useAnswerSelectedContext,
  CanDoContainer
 };