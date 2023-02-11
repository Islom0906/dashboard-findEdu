export const getStringFromHtml = (htmlContent) => {
  return htmlContent.replace(/(<([^>]+)>)/gi, '');
};
