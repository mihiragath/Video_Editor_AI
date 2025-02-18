import { Slider } from '@radix-ui/react-slider'
import React from 'react'

function SlideField({ label, defaultValue, handleInputChange }) {
  return (
    <div className='mt-3 flex-col gap-2'>
      <label className='text-sm mb-2'>{label}</label>
      <Slider
        value={[defaultValue]}
        max={100}
        step={1}
        onValueChange={(value) => handleInputChange(value[0])}
      />
    </div>
  );
}

export default SlideField;