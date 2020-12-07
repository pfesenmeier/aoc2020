// import { remoteFileToList } from '../denoUtils/mod.ts';

// const list = await remoteFileToList(
//     "https://raw.githubusercontent.com/pfesenmeier/aoc2020/master/input/5example.txt",
//     String,
// );
// interface LineType {
//     isForm(): boolean;
// }
// class CustomsForm implements LineType {
//     constructor(word: string) {
//         this.answers = word.split('');
//     }
//     public answers: string[]; 
//     isForm = () => true;
// }
// class BlankLine implements LineType {
//     isForm = () => false;
// }

// function isForm(lineType: LineType): lineType is CustomsForm {
//   return lineType.isForm();
// }
// type Group = CustomsForm[];
// type List = string[];
// type AnswerList = [];
// interface ListToFormsMapper {
//     (list: List, processedList?: LineType[]): LineType[]; 
// }
// interface FormsToGroupsMapper {
//   (list: LineType[], processedList?: Group[], currentGroup?: Group): Group[];
// }
// interface GroupListToAnswerListMapper {
//     (groups: Group[], answers?: string[]): string[];
// }
// interface AnswersListToCount {
//     (answers: AnswerList): number;
// }

// const listToForms: ListToFormsMapper = (remainingList, processedList = []) => {
//     if (remainingList.length === 0) return processedList;
//     const [currentLine, ...remainingLines] = remainingList;
    
//     if(currentLine.length === 0) {
//         return listToForms(remainingLines,processedList.concat(new BlankLine()));
//     }
//     return listToForms(remainingLines, processedList.concat(new CustomsForm(currentLine)));
// }

// const formsToGroups: FormsToGroupsMapper = (remainingList, processedList = [], currentGroup = [] as Group) => {
//     if (remainingList.length === 0) return processedList;
//     const [currentFormOrBlank, ...remainingForms] = remainingList;

//     if(isForm(currentFormOrBlank)) {
//         return formsToGroups(remainingForms, processedList, currentGroup.concat(currentFormOrBlank));
//     }
//     return formsToGroups(remainingForms, processedList.concat(currentGroup));
// }

// const groupsToUniqueAnswers: GroupListToAnswerListMapper = (remainingList, answers: string[] = []) => {
//   if (remainingList.length === 0) return answers;
//   const [currentGroup, ...remainingGroups] = remainingList;
//   const unqiqueAnswers = processGroup(currentGroup)!;

//   return groupsToUniqueAnswers(remainingGroups, answers.concat(unqiqueAnswers));
// }

// function processGroup(group: Group, matches: string[] = [], maybeMatches: string[] = []): string[] | undefined {
    
// }  
    
    
    
    
//     let matches = [];
//     const [first, ...rest] = group;
//     for (const form of rest) {
//       for (const letter of first.answers) {
//           if (first.answers.includes(letter)){
//               matchers.concat(letter);
//           }
//       }
//     }
    
    
    
    
//     if (remainingForms.length === 0) return matches;
//     console.log('grou! ' + group);
//     if (maybeMatches.length === 0) {
//         return processGroup(remainingForms, matches, maybeMatches.concat(currentForm.answers));
//     }
//     const previousLetters = matches.concat(maybeMatches);
//     const uniqueLetters = currentForm.answers.map(answer => {
//         if (previousLetters.includes(answer)) {
//           return answer;
//     }});
//     return processGroup(remainingForms, uniqueLetters as string[]);
// } 

// function main() {
//     const forms = listToForms(list);
//     console.log(forms.slice(0,4));
//     const groups = formsToGroups(forms);
//     console.log(forms.slice(0,4));
//     const answers = groupsToUniqueAnswers(groups);
//     console.log(answers);
//     const sum = answers.reduce((total, currentGroup) => Object.keys(currentGroup).length + total, 0);
//     console.log(sum);
// }
// if(import.meta.main) main();


