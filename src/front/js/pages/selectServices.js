import React, { useState } from 'react';

const <link>ServiceSelection</link> = () => {

  const [<link>selectedService</link>, setSelectedService] = useState('');

  const <link>handleServiceChange</link> = (e) => {
    
    setSelectedService(e.target.value);
  };

  return (

    <div>
      <h2>Choose a Service</h2>
      <select value={<link>selectedService</link>} onChange={<link>handleServiceChange</link>}>
        <option value="">Select a service</option>
        <option value="Service 1">Service 1</option>
        <option value="Service 2">Service 2</option>
        <option value="Service 3">Service 3</option>
      </select>
      {<link>selectedService</link> && <p>Selected service: {<link>selectedService</link>}</p>}
    </div>
  );
};

export default <link>ServiceSelection</link>;