export const fromCamelCase = (str:string, capitalizeFirst:boolean = false) :string => {
  let result = str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters
    .toLowerCase(); // Convert the entire string to lowercase

  // If capitalizeFirst is true, capitalize the first letter of each word
  if (capitalizeFirst) {
    result = result
      .split(' ')
      .map((word:string) => capitalizeFirstLetter(word))
      .join(' ');
  }

  return result;
};

export const toCamelCase = (str:string): string =>
    str
      .split(' ')
      .map((word:string, index:number) =>
        index === 0 ? word.toLowerCase() : capitalizeFirstLetter(word)
      )
      .join('');


      
export function capitalizeFirstLetter(word: string): string {
  if (!word || word.length === 1) {
    return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}


