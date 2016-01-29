/**
 * Created by wanderley_panosso on 28/01/2016.
 */


var phonesApi = [
    '+5516996000581',
    '+552197097252',
    '+5511990653478'
];

var phonesContact = [
    '016996000581',
    '(015)21 9709-7252',
    '+5511990653478',
    '996051111'
];


var validDigits = '1234567890';

var hostDDI = '55';
var hostDDD = '16';

var phonesMatch = phonesContact.filter(function(phoneC){

    var digitsPhoneC = phoneC.split('').reduce(function(prev, curr){
        if(validDigits.indexOf(curr) !== -1)
            prev = prev + curr;
        return prev;
    }, '').split('').reverse();

    return phonesApi.filter(function(phoneA){

        var digitsPhoneA = phoneA.split('').reduce(function(prev, curr){
            if(validDigits.indexOf(curr) !== -1)
                prev = prev + curr;
            return prev;
        }, '').split('').reverse();


        var digitsMatch = digitsPhoneA.slice(0, digitsPhoneA.length - 4).reduce(function(prevArr, currDigit, idx){
            if ((currDigit === digitsPhoneC[idx]) && (prevArr.length === idx)){
                prevArr.push(currDigit);
            }
            return prevArr;
        }, []);

        if(
            ((digitsMatch.length < 8) && (digitsPhoneA.length === 12)) ||
            ((digitsMatch.length < 9) && (digitsPhoneA.length === 13))
        ){
            return false;
        }
        else{
            var remainingDigitsPhoneC = digitsPhoneC.reverse().splice(0, digitsPhoneC.length - digitsMatch.length);
            var remainingDigitsPhoneA = digitsPhoneA.reverse().splice(0, digitsPhoneA.length - digitsMatch.length);

            if(!remainingDigitsPhoneC.length && !remainingDigitsPhoneA.length){
                return true;
            }

            if(!(phoneC[0] === '+')){

                while(remainingDigitsPhoneC[0] === '0'){
                    remainingDigitsPhoneC.shift();
                }

                remainingDigitsPhoneC = hostDDI.split('').concat(remainingDigitsPhoneC);
            }

            if(remainingDigitsPhoneC.length === hostDDI.length){
                remainingDigitsPhoneC = remainingDigitsPhoneC.concat(hostDDD.split(''));
            }

            remainingDigitsPhoneC = remainingDigitsPhoneC.slice(0, hostDDI.length).concat(
                remainingDigitsPhoneC.reverse().slice(0, hostDDD.length).reverse()
            );

            return remainingDigitsPhoneA.join('') === remainingDigitsPhoneC.join('');

        }
    }).length;
});




console.log(phonesMatch);