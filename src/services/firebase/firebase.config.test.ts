import { getDownloadURL } from 'firebase/storage';
import { firebaseUrl } from './firebase.config';

jest.mock('firebase/storage');

describe('Given the firebaseUrl function', () => {
  describe('When the function is called with a mockFileName and mockFile', () => {
    test('Then, the fetDownloadURL function should be called', async () => {
      const mockFileName = 'test';
      const mockFile = new File(['guitar-test'], 'guitar-test.png', {
        type: 'image/png',
      });

      await firebaseUrl(mockFileName, mockFile);
      expect(getDownloadURL).toHaveBeenCalled();
    });
  });
});
