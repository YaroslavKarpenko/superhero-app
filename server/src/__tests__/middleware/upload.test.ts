import path from 'path';
import upload from '../../middleware/upload';
import createImageDirectory from '../../helpers/dirCheck';

jest.mock('../../helpers/dirCheck');
jest.mock('path');

describe('upload middleware', () => {
  const mockReq = {};
  const mockFile = { mimetype: 'image/png', originalname: 'test.png' };
  const mockCb = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('storage configuration', () => {
    it('should call createImageDirectory and set the correct destination', () => {
      const mockImagePath = '/mocked/path/images';

      (path.join as jest.Mock).mockReturnValue(mockImagePath);

      const storage = (upload as any).storage;

      storage.getDestination(mockReq as any, mockFile as any, mockCb);

      expect(createImageDirectory).toHaveBeenCalled();

      expect(path.join).toHaveBeenCalledWith(process.cwd(), '..', 'images');

      expect(mockCb).toHaveBeenCalledWith(null, mockImagePath);
    });

    it('should generate the correct filename', () => {
      const originalNow = Date.now;
      const mockDate = 1609459200000; // 2021-01-01T00:00:00.000Z

      Date.now = jest.fn().mockReturnValue(mockDate);

      const storage = (upload as any).storage;

      storage.getFilename(mockReq as any, mockFile as any, mockCb);

      expect(mockCb).toHaveBeenCalledWith(null, `${mockDate}-test.png`);

      Date.now = originalNow;
    });
  });

  describe('fileFilter', () => {
    const fileFilter: any = (upload as any).fileFilter;

    it('should accept valid image types', () => {
      const validFile = { mimetype: 'image/png' };
      fileFilter(mockReq as any, validFile as any, mockCb);

      expect(mockCb).toHaveBeenCalledWith(null, true);
    });

    it('should reject invalid image types', () => {
      const invalidFile = { mimetype: 'application/pdf' };
      fileFilter(mockReq as any, invalidFile as any, mockCb);

      expect(mockCb).toHaveBeenCalledWith(null, false);
    });
  });
});
