export default class LessonTimes {
    static firstPairStr: [string, string] = ['9:00', '10:30'];
    static secondPairStr: [string, string] = ['10:40', '12:10'];
    static thirdPairStr: [string, string] = ['12:20', '13:50'];
    static fourthPairStr: [string, string] = ['14:30', '16:00'];
    static fifthPairStr: [string, string] = ['16:10', '17:40'];
    static sixthPairStr: [string, string] = ['17:50', '19:20'];
    static sixthPairEveningStr: [string, string] = ['18:20', '19:40'];
    static seventhPairStr: [string, string] = ['19:30', '21:00'];
    static seventhPairEveningStr: [string, string] = ['19:50', '21:10'];

    static getTime(order: number, groupIsEvening: boolean): [string, string] {
        switch (order) {
            case 0: return LessonTimes.firstPairStr;
            case 1: return LessonTimes.secondPairStr;
            case 2: return LessonTimes.thirdPairStr;
            case 3: return LessonTimes.fourthPairStr;
            case 4: return LessonTimes.fifthPairStr;
            case 5: if (groupIsEvening) {
                return LessonTimes.sixthPairEveningStr;
            } else {
                return LessonTimes.sixthPairStr;
            }
            case 6: if (groupIsEvening) {
                return LessonTimes.seventhPairEveningStr;
            } else {
                return LessonTimes.seventhPairStr;
            }
            default: {
                console.log('Wrong order number of lesson');
                return ['Ошибка', 'номера занятия'];
            }
        }
    }
}