class Student{
    constructor(studentId){
        this.studentId = studentId;
        this.answers = [];
    }

    addAnswer (question){
        this.answers.push(question);
    }

}

class Question {
    constructor(qid, answer){
        this.qid = qid;
        this.answer = answer;
    }
    checkAnswer (answer){
        return this.answer === answer;
    }
}

class Quiz {
    constructor(questions, students){
        this.questions = new Map();
        questions.forEach((question) => {
            this.questions.set(question.qid, question.answer);
        });
        this.students = students;
    }

    scoreStudentBySid(sid) {
        const student = this.students.find((s) => s.studentId === sid);
        if (!student) {
          console.log(`Student with ID: ${sid} was not found.`);
          return 0;
        }
    
        let score = 0;
        student.answers.forEach((answer) => {
          if (this.questions.has(answer.qid)) {
            const correctAnswer = this.questions.get(answer.qid);
            if (answer.checkAnswer(correctAnswer)) {
              score++;
            }
          }
        });    
        return score;
      }

     getAverageScore () {
       if (this.students.length === 0){
           console.log ("Empty student list !");
           return 0;
       }

       let totalScore = 0;
       this.students.forEach((student) =>{
           totalScore += this.scoreStudentBySid(student.studentId);
       }

       )
       let average = totalScore / this.students.length;
       return average;
     }
}

const student1 = new Student(10);
student1.addAnswer(new Question(2, 'a'));
student1.addAnswer(new Question(3, 'b'));
student1.addAnswer(new Question(1, 'b'));
const student2 = new Student(11);
student2.addAnswer(new Question(3, 'b'));
student2.addAnswer(new Question(2, 'a'));
student2.addAnswer(new Question(1, 'd'));
const students = [student1, student2];
const questions =[new Question(1, 'b'), new Question(2, 'a'), new
Question(3, 'b')];
const quiz = new Quiz(questions, students);
let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10); //Expected Result: 3
let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11); //Expected Result: 2
let average = quiz.getAverageScore();
console.log(average); //Expected Reuslt: 2.5