'use client';
import React, { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export default function CommonToggle () {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div>
      <label>
        <Toggle
          defaultChecked={isToggled}
          onChange={handleToggle} 
        />
      </label>
    </div>
  );
};


