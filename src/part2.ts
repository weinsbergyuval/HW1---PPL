import * as R from "ramda";

const stringToArray = R.split("");

/* Question 2.1 */
const vowels: string[] = ['a', 'e', 'i', 'o', 'u'];

export const countVowels = (s: string): number => {
    // YA- convert to lowercase to match the vowels array, filter and count
    return stringToArray(s.toLowerCase()) // YA - using the func above 
        .filter(char => vowels.includes(char))
        .length;
};

/* Question 2.2 */
export const isPalindrome = (text: string): boolean => {
    // YA- clean the string and keep only numbers and chars
    const cleanText = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    const charArray = stringToArray(cleanText);
    
    // YA- create reversed array using reduceRight 
    const reversedArray = charArray.reduceRight((acc: string[], char: string) => [...acc, char], []);
    
    // YA- compare the two arrays for equality
    return R.equals(charArray, reversedArray);
};

/* Question 2.3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence = (t: WordTree): string => {
    // YA- recursive func - get current root and join it with children sentences
    return [t.root, ...t.children.map(treeToSentence)].join(' ').trim();
};