import React, { useState } from 'react';

function Accordion(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=' p-4 w-full max-w-lg'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex justify-between w-full text-left font-semibold'
      >
        <h3 className='items-center justify-center text-lg font-semibold text-gray-900 my-8 flex gap-8'>
          <props.icon className='w-5 h-5' />
          {props.sectiontitle}
          <span className='text-xl center-container'>{isOpen ? '-' : '+'}</span>
        </h3>
      </button>

      {/* Tailwind classes: 'hidden' or 'block' toggles display */}
      <div className={`mt-2 ${isOpen ? 'block' : 'hidden'}`}>
        <div {...props}>{props.children}</div>
      </div>
    </div>
  );
}

export default Accordion;
