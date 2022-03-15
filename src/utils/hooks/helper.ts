// Helper functions can be found here

// Converts given unix timestamp to a date in the following format DD/MM/YYYY
export const useConvertTimeStamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  let day: string;
  let month: string;
  //formatting day
  if (date.getDate() < 10) {
    day = '0' + date.getDate();
  } else day = date.getDate().toString();
  //formatting month
  if (date.getDate() < 10) {
    month = '0' + date.getMonth();
  } else month = date.getMonth().toString();
  const formatedDate = `${day}/${month}/${date.getFullYear()}`;
  return formatedDate;
};
