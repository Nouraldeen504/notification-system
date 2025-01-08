// Admin.jsx
import { useState } from 'react';

const Admin = () => {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!subject.trim()) {
      setError('Subject is required');
      return false;
    }
    if (!message.trim()) {
      setError('Message is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://wks8l3jqo5.execute-api.eu-north-1.amazonaws.com/prod/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, subject }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('Messages sent successfully!');
        setMessage('');
        setSubject('');
      } else {
        setError(data.error || 'Failed to send messages. Please try again.');
      }
    } catch (error) {
      setError('Error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Send Bulk Messages</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              error && !subject.trim() ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isLoading}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 h-32 ${
              error && !message.trim() ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isLoading}
            required
          />
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Messages'}
        </button>
      </form>
      {status && (
        <p className="mt-4 text-center text-green-600">{status}</p>
      )}
    </div>
  );
};

export default Admin;