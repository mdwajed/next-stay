const SendEmail = ({ paymentSummary }) => {
  const sendEmail = async () => {
    try {
      const response = await fetch("/api/send-receipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentSummary),
      });
      const result = await response.json();

      if (response.status === 200) {
        alert(result.message);
      } else {
        alert(result.error || "An error occurred while sending the receipt.");
      }
    } catch (error) {
      alert("Failed to send the receipt. Please try again later.");
    }
  };

  return (
    <div className="flex gap-4">
      <button onClick={sendEmail} className="text-primary">
        <i className="fas fa-envelope text-xl"></i>
      </button>
      <div>
        <h4 className="font-semibold mb-1">Check your email</h4>
        <p className="text-zinc-600">
          We&apos;ve sent your confirmation and trip details to your email
          address.
        </p>
      </div>
    </div>
  );
};

export default SendEmail;
