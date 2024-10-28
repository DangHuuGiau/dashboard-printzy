import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorComponentProps {
  value: string;
  onChange: (data: string) => void;
}

const CKEditorComponent: React.FC<CKEditorComponentProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="rounded-lg">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange(data); // Call the onChange prop to notify the parent
        }}
      />
    </div>
  );
};

export default CKEditorComponent;
