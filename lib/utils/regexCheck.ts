  export default function useRegex(input) {
    let regex = /[A-Za-z0-9]+/i;
    return regex.test(input);
  }