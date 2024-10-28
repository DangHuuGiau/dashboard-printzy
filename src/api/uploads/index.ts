import axios from 'axios';
import { SCHEMA } from '@/constant/schema';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axios({
      method: 'POST',
      url: `${SCHEMA.API_BASE}/uploads`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

const uploadsService = {
  uploadFile,
};

export default uploadsService;
