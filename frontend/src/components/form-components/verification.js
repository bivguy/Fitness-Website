import userData from "../../json-users/users";

  //Verificaiton functions

  //Verify account name
  export function verifyAccountName(value){
    const letterRegExp = /^[a-z]/i;
    const alphanumerical = /^[a-z0-9]+$/i;
    let copy = false;

    if (!letterRegExp.test(value[0])) {
      return "must start with a letter";
    } else if (!alphanumerical.test(value)) {
      return "must be alphanumerical with no spaces";
    }
    return true;
    
  };

  //Verify Email
  export function verifyEmail(value){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return true;
    } else {
      return "You have entered an invalid email address";
    }
  };

  export function verifyDOB(DOB){
    let currentDate = new Date();
    let curYear = currentDate.getFullYear();
    let curMonth = currentDate.getMonth() + 1;
    let curDay = currentDate.getDate();

    let userDOB = new Date(DOB);
    let userYear = userDOB.getFullYear();
    let userMonth = userDOB.getMonth() + 1;
    let userDay = userDOB.getDate();

    // Calculate age
    let age = curYear - userYear;

    // Check if the user is under 18
    if (age < 18) {
      return "You may not register if you are under 18";
    } else if (age === 18) {
      // If the user is 18, check birth month and day
      if (userMonth > curMonth) {
        return "You may not register if you are under 18";
      } else if (userMonth === curMonth && userDay >= curDay) {
        return "You may not register if you are under 18";
      }
    }

    // If none of the conditions are met, the user is 18 or older
    return true;
  };

  //Verify Phone
  export function verifyPhone(phone){
    const regex = /^[0-9]\d{2}-\d{3}-\d{4}/;

    if (regex.test(phone)) return true;
    else {
      return "please match format of 111-111-1111";
    }
  };

  //Verify Zip
  export function verifyZip(zip){
    const regex = /^\d{5}$/;

    if (regex.test(zip)) return true;
    else {
      return "please match format of 11111";
    }
  };


  export function makeRandomTime(){
    let minute = Math.floor(Math.random() * 59) + 1;
    if (minute < 10) {
      minute = "0" + minute.toString(); // Add leading zero
    }
    const hour = Math.floor(Math.random() * 12) + 1;

    const times = ["AM", "PM"];
    const ranId = Math.floor(Math.random() * times.length);
    const time = times[ranId];
    return `${hour.toString()}:${minute} ${time}`;
  };