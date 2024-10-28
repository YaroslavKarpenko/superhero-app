import fs from 'fs';
import path from 'path';
import createImageDirectory from '../../helpers/dirCheck';

jest.mock('fs');
jest.mock('path');

describe('createImageDirectory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен создавать директорию, если она не существует', () => {
    const mockImagePath = '/mocked/path/images';

    (path.join as jest.Mock).mockReturnValue(mockImagePath);

    (fs.existsSync as jest.Mock).mockReturnValue(false);

    (fs.mkdirSync as jest.Mock).mockImplementation(() => {});

    createImageDirectory();

    expect(path.join).toHaveBeenCalledWith(process.cwd(), '..', 'images');

    expect(fs.existsSync).toHaveBeenCalledWith(mockImagePath);

    expect(fs.mkdirSync).toHaveBeenCalledWith(mockImagePath, { recursive: true });
  });

  it('не должен создавать директорию, если она уже существует', () => {
    const mockImagePath = '/mocked/path/images';

    (path.join as jest.Mock).mockReturnValue(mockImagePath);

    (fs.existsSync as jest.Mock).mockReturnValue(true);

    createImageDirectory();

    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });
});
