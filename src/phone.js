export const clean = (str) => {
  let phoneRegex = 
  	/^(?:\+?1)?\s*\(?([2-9]\d{2})\)?\s*[\.\-]?\s*([2-9]\d{2})\s*[\.\-]?\s*(\d{4})\s*$/;
  let number = str.match(phoneRegex);

  let digits = str.match(/\d/g),
  	  letters = str.match(/[a-z]/gi),
  	  punctuations = str.match(/[^\w\.\-\(\)\+\s]/g),
  	  areaCode = str.match(/\d{3}/),
  	  exchangeCode = str.match(/(?<=\d{3}.*)\d{3}/);
  	  
  if(!number){
    if(punctuations) throw 'Punctuations not permitted';
    if(letters) throw 'Letters not permitted';
    if(digits.length < 10) throw 'Incorrect number of digits';
    if(digits.length > 11) throw 'More than 11 digits';
    if(digits.length === 11 && digits[0] !== '1') throw '11 digits must start with 1';
    if(areaCode[0][0] === '0') throw 'Area code cannot start with zero';
    if(areaCode[0][0] === '1') throw 'Area code cannot start with one';
    if(exchangeCode[0][0] === '0') throw 'Exchange code cannot start with zero';
    if(exchangeCode[0][0] === '1') throw 'Exchange code cannot start with one';
  }

  return number[1] + number[2] + number[3];
};