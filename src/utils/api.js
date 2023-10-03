/* eslint-disable import/prefer-default-export */
const getQuestions = async () => {
  const response = await fetch('https://opentdb.com/api.php?amount=5');
  const responseJson = await response.json();

  if (responseJson.response_code !== 0) {
    return { error: true };
  }

  return { error: false, data: responseJson };
};

export {
  getQuestions,
};
