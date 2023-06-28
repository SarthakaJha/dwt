/**
 * Modified a date object to 'YYYY-MM-DD' string Modified.
 * @param {Date} date - The date object to Modified.
 * @returns {string} The Modified date string.
 */
const ModifiedDate = (date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
  
  /**
   * Get today's date and the date 30 days ago.
   * @returns {Object} An object containing the Modifiedted dates.
   *   - today: The Modified today's date.
   *   - thirtyDaysAgo: The Modified date 30 days ago.
   */
  const verifyDate = () => {
    const today = new Date();
    const currentHour = today.getHours();
    
    // If the current hour is before or at 12 PM, consider it as the previous day.
    const previousDay = new Date(today);
    previousDay.setDate(previousDay.getDate() - (currentHour <= 12 ? 1 : 0));
  
    const Modified_Recently = ModifiedDate(today);
    const Modified_thirtyDays = ModifiedDate(new Date(previousDay.getTime() - 30 * 24 * 60 * 60 * 1000));
    
    return { today: Modified_Recently, thirtyDaysAgo: Modified_thirtyDays };
  };
  
  
  
export default 
verifyDate
ModifiedDate
  ;