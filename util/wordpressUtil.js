export const createHtmlString = (htmlString) => {
  return {__html: htmlString};
};

export const formatTimestamp = (timestamp) => {
  // Parse the timestamp into a Date object
  const date = new Date(timestamp);

  // Format the date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
};