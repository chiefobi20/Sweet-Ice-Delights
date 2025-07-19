import { useState, useEffect } from 'react';
import ApiService from '../services/api';

function ConnectionTest() {
  const [status, setStatus] = useState('testing');
  const [results, setResults] = useState({});

  useEffect(() => {
    const testConnection = async () => {
      const tests = {};
      
      try {
        // Test 1: Basic connection
        const testResult = await ApiService.testConnection();
        tests.connection = { status: 'success', data: testResult };
      } catch (error) {
        tests.connection = { status: 'error', error: error.message };
      }

      try {
        // Test 2: Health check
        const healthResult = await ApiService.getHealth();
        tests.health = { status: 'success', data: healthResult };
      } catch (error) {
        tests.health = { status: 'error', error: error.message };
      }

      try {
        // Test 3: Flavors
        const flavorsResult = await ApiService.getFlavors();
        tests.flavors = { status: 'success', count: flavorsResult.length };
      } catch (error) {
        tests.flavors = { status: 'error', error: error.message };
      }

      setResults(tests);
      setStatus('complete');
    };

    testConnection();
  }, []);

  if (status === 'testing') {
    return <div>🔍 Testing API connection...</div>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>🔧 API Connection Test</h3>
      
      <div>
        <strong>Connection Test:</strong> 
        {results.connection?.status === 'success' ? ' ✅ Success' : ` ❌ ${results.connection?.error}`}
      </div>
      
      <div>
        <strong>Health Check:</strong> 
        {results.health?.status === 'success' ? ' ✅ Success' : ` ❌ ${results.health?.error}`}
      </div>
      
      <div>
        <strong>Flavors API:</strong> 
        {results.flavors?.status === 'success' ? ` ✅ ${results.flavors.count} flavors` : ` ❌ ${results.flavors?.error}`}
      </div>
    </div>
  );
}

export default ConnectionTest;