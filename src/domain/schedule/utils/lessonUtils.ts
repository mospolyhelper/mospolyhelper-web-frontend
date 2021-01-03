const COURSE_PROJECT_SHORT = "КП";
const EXAM_SHORT = "Экз";
const CREDIT_SHORT = "Зач";
const CREDIT_WITH_MARK_SHORT = "ЗСО";
const EXAMINATION_SHOW_SHORT = "ЭП";
const CONSULTATION_SHORT = "Кон";
const LABORATORY_SHORT = "Лаб";
const PRACTICE_SHORT2 = "Пра";
const LECTURE_SHORT = "Лек";
const OTHER_SHORT = "Дру";

const COURSE_PROJECT = "КП";
const EXAM = "Экзамен";
const CREDIT = "Зачет";
const CREDIT_WITH_MARK = "ЗСО";
const EXAMINATION_SHOW = "ЭП";
const CONSULTATION = "Консультация";
const LABORATORY = "Лаб";
const LABORATORY_FULL = "Лаб. работа";
const PRACTICE = "Практика";
const PRACTICE_SHORT = "Пр";
const LECTURE = "Лекция";

const OTHER = "Другое";
// TODO Установочная лекция

const COURSE_PROJECT_FIXED = "Курсовой проект";
const CREDIT_WITH_MARK_FIXED = "Зачет с оценкой";
const EXAMINATION_SHOW_FIXED = "Экз. показ";
const LECTURE_PRACTICE_LABORATORY = "Лекц., практ., лаб.";
const LECTURE_PRACTICE = "Лекц. и практ.";
const LECTURE_LABORATORY = "Лекц. и лаб.";
const PRACTICE_LABORATORY = "Практ. и лаб.";

const importantTypes = [
    EXAM,
    CREDIT,
    COURSE_PROJECT_FIXED,
    CREDIT_WITH_MARK_FIXED,
    EXAMINATION_SHOW_FIXED,
    COURSE_PROJECT,
    CREDIT_WITH_MARK,
    EXAMINATION_SHOW
];

export const isImportant = (type: string) =>
    importantTypes.some(it =>
        it.toLowerCase().includes(type.toLowerCase()) ||
        type.toLowerCase().includes(it.toLowerCase())
        );