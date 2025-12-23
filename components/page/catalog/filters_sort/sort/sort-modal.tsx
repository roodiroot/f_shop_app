import Button from "@/components/ui/button/button";
import Radio from "@/components/ui/radio";
import { SORT_TYPES, SortType } from "@/hooks/use-catalog-sort";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedValue?: SortType;
  onSelect?: (value: SortType) => void;
};

export function SortModal({
  visible,
  onClose,
  selectedValue,
  onSelect,
}: Props) {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-gray-900 opacity-40" onPress={onClose} />

      <View
        className="absolute bottom-0 inset-x-0 rounded-t-[40] bg-white px-6"
        style={{ paddingBottom: insets.bottom }}
      >
        <Text className="text-xl text-center font-medium py-4 border-b border-gray-200">
          Сортировка
        </Text>

        <View className="gap-2 mt-4">
          {Object.entries(SORT_TYPES).map(([key, value]) => (
            <Pressable
              key={key}
              onPress={() => {
                onSelect && onSelect(value.value);
                onClose();
              }}
              className=" flex-row justify-between items-center pt-3 pb-5 border-b border-gray-200"
            >
              <Text className="font-medium text-gray-500 text-xl">
                {value.name}
              </Text>
              <Radio checked={selectedValue === value.value} />
            </Pressable>
          ))}
        </View>

        <Button variant="big" className="mt-6" onPress={onClose}>
          Закрыть
        </Button>
      </View>
    </Modal>
  );
}
