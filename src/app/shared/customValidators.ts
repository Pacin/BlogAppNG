export function minThreeWords(control) {

   return control.value.trim().split(' ').length < 3 ? {minThreeWords: {value: control.value}} : null;

}

export function forbiddenWords(words) {

    return (control) => {
      const hasForbiddenWord = words.some(word => control.value.includes(word));

      return hasForbiddenWord ? {forbiddenWords: true} : null;
    }
}