export default function useRegex(input) {
  // let regex = /[A-Za-z0-9]+/i;
  let regex = /^[0-9a-fA-F]{24}$/;
  return regex.test(input);
}
