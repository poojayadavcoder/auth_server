/**

 * Sends an OTP via Fast2SMS.
 * @param {string} mobile - The recipient's mobile number.
 * @param {string} otp - The OTP to send.
 */
export const sendSMS = async (mobile, otp) => {
  const apiKey = process.env.FAST2SMS_API_KEY;
  
  if (!apiKey) {
    console.warn("FAST2SMS_API_KEY not found. Skipping real SMS.");
    return;
  }

  try {
    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        "authorization": apiKey,
        "Content-Type": "application/json",
        "accept": "*/*"
      },
      body: JSON.stringify({
        "variables_values": otp,
        "route": "otp",
        "numbers": mobile,
      })
    });

    const result = await response.json();
    console.log("Fast2SMS Response:", result);
    return result;
  } catch (error) {
    console.error("Fast2SMS Error:", error);
    throw error;
  }
};
