import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import React from 'react';

export const UploadButton = () => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      alert('File Selected');
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button
        className="fixed bottom-4 gap-4 px-10 font-semibold"
        onClick={handleButtonClick}
      >
        Upload File <Upload className="size-4" />
      </Button>
    </>
  );
};
