/**
 * Created by wanderley_panosso on 29/01/2016.
 */


var phonesApi = [
    '+5531965588885',
    '+5516996000581',
    '+552197097252',
    '+5511990653478',
    '+555199701234'
];

var phonesContact = [
    '31965588885',
    '01516996000581',
    '(015)21 9709-7252',
    '+5511990653478',
    '996051111',
    '5199701234'
];


var validDigits = '1234567890';

var hostDDI = '55';
var hostDDD = '16';

// normalizes contacts phone numbers.
phonesNormalized = phonesContact.map(function(phone){
    // removes all illegal digits and returns an array of valid digits.
    var phoneDigits = phone.split('').reduce(function(prev, curr){
        // verifies if the current digit is a valid one.
        if(validDigits.indexOf(curr) !== -1)
            // concatenate valid digits
            prev = prev + curr;
        return prev;
    }, '').split('');

    // if number does not start with (+) performs some processing
    if(phone[0] !== '+'){
        // removes all zeros from the beginning useful for "016..." or "01516..."
        while(phoneDigits[0] === '0'){
            phoneDigits.shift();
        }

        // if number is 8 or 9 digits long, it does not have a DDD
        if((phoneDigits.length === 8) || (phoneDigits.length === 9)) {
            // prepends the host's DDD
            phoneDigits = hostDDD.split('').concat(phoneDigits);
        }

        // if number is 12 or 13 digits long, it has the operator's prefix
        if((phoneDigits.length === 12) || (phoneDigits.length === 13)){
            // removes the operator's prefix
            phoneDigits = phoneDigits.slice(2);
        }

        // if number 10 or 11 digits long, it does not hava a DDI
        if((phoneDigits.length === 10) || (phoneDigits.length === 11)){
            // prepends the host's DDI
            phoneDigits = hostDDI.split('').concat(phoneDigits);
        }

    }

    // prepends the + sign
    phoneDigits = ['+'].concat(phoneDigits);

    return {
        // concatenates the array into a string
        phoneNumber: phoneDigits.join(''),
        // assigns the original contact number
        originalNumber: phone
    };
});

// filters the matching numbers
var phonesResult = phonesNormalized.filter(function(phoneNormalized){
    // if contact exists on the api it returns it's index, otherwise, -1
    return phonesApi.indexOf(phoneNormalized.phoneNumber) > -1;
});

console.log('\nNormalized');
console.log(phonesNormalized);

console.log('\nContact');
console.log(phonesContact);

console.log('\nApi');
console.log(phonesApi);

console.log('\nResult');
console.log(phonesResult);
