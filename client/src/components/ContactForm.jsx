const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmissionStatus(null);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        message: formData.message,
        selectedDates: selectedDates
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    setSubmissionStatus('success');
    // Reset form...
  } catch (error) {
    console.error('Error submitting form:', error);
    setSubmissionStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};