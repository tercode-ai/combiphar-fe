import { create } from 'zustand';

export interface FileUploadStatus {
  id: string;
  file: File;
  status: 'pending' | 'success' | 'failed';
  errorMessage?: string;
}

interface FileStore {
  files: FileUploadStatus[];
  setFiles: (files: File[]) => void;
  setFileStatus: (
    id: string,
    status: 'pending' | 'success' | 'failed',
    errorMessage?: string
  ) => void;
  addFile: (file: File) => void;
}

export const useFiles = create<FileStore>((set) => ({
  files: [],

  setFiles: (files: File[]) => {
    const fileStatuses: FileUploadStatus[] = files.map((file) => ({
      id: file.name + Date.now(),
      file,
      status: 'pending'
    }));
    set(() => ({ files: fileStatuses }));
  },

  setFileStatus: (id, status, errorMessage) =>
    set((state) => ({
      files: state.files.map((fileStatus) =>
        fileStatus.id === id
          ? { ...fileStatus, status, errorMessage }
          : fileStatus
      )
    })),

  addFile: (file) =>
    set((state) => ({
      files: [
        ...state.files,
        { id: file.name + Date.now(), file, status: 'pending' }
      ]
    }))
}));
