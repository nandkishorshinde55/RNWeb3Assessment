import AsyncStorage from "@react-native-async-storage/async-storage";

export const reownStorage = {
  async getItem<T = unknown>(key: string): Promise<T | undefined> {
    const value = await AsyncStorage.getItem(key);

    if (!value) {
      return undefined;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  },

  async setItem<T = unknown>(key: string, value: T): Promise<void> {
    const data =
      typeof value === "string"
        ? value
        : JSON.stringify(value);

    await AsyncStorage.setItem(key, data);
  },

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  async getKeys(): Promise<string[]> {
    return [...(await AsyncStorage.getAllKeys())];
  },

  async getEntries<T = unknown>(
    keys?: string[]
  ): Promise<[string, T][]> {
    const storageKeys =
      keys ?? [...(await AsyncStorage.getAllKeys())];

    const entries = await AsyncStorage.multiGet(storageKeys);

    return entries
      .filter(([, value]) => value !== null)
      .map(([key, value]) => {
        try {
          return [key, JSON.parse(value!)] as [string, T];
        } catch {
          return [key, value as T];
        }
      });
  },
};