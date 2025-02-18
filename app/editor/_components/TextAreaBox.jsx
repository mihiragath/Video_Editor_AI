import { Textarea } from "@/components/ui/textarea";
import React from "react";

function TextAreaBox({ frame , handleInputChange}) {
  return (
    <div className="flex gap-2 flex-col">
      <label>Content</label>
      <Textarea
        className="bg-white"
        value={frame.text}
        onChange={(e) => handleInputChange(e.targer.value)}
      />
    </div>
  );
}

export default TextAreaBox;
