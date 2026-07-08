import AsyncStorage from "@react-native-async-storage/async-storage";

export const appStorage = {
  getItem: async (name: string) => {
    return AsyncStorage.getItem(name);
  },

  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },

  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};