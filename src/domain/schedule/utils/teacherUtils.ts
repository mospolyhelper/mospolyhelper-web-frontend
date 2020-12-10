import Teacher from "../model/teacher";

export const getFullName =
    (teacher: Teacher): String =>
        teacher.names.join(' ');