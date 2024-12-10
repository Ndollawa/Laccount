import * as bcrypt from 'bcryptjs';

export const hashData = async (data: any, salt?: number) => {
  return await bcrypt.hash(data, salt);
};

export const compareHashData = async (rawData: any, encryptedData) => {
  const match = await bcrypt.compare(rawData, encryptedData);
  return match;
};
