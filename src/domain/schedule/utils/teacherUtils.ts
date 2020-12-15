import Teacher from "../model/teacher";

export const getFullName =
    (teacher: Teacher): string =>
        teacher.names.join(' ');