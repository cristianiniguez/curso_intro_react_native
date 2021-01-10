import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static instance = new Storage();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.log('storage store error', error);
      throw Error(error);
    }
  };

  get = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log('storage get error', error);
      throw Error(error);
    }
  };

  getAll = async (keys) => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.log('storage get-all error', error);
      throw Error(error);
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log('storage get-all-keys error', error);
      throw Error(error);
    }
  };

  remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log('storage remove error', error);
      throw Error(error);
    }
  };
}

export default Storage;
