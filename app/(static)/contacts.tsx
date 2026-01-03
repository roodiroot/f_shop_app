import { markdownStyles } from "@/assets/markdown/style";
import WrapperList from "@/components/ui/wrapper-list";
import { View } from "react-native";
import Markdown from "react-native-markdown-display";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const text = `
# Контакты

## Fashion-приложение под ваш бренд

Это готовое коммерческое мобильное приложение для fashion-бизнеса, которое можно адаптировать под ваш бренд, ассортимент и процессы.

Подходит для брендов одежды, шоурумов и интернет-магазинов, которые хотят запустить собственное приложение без долгой разработки.

---

## Что входит в решение

### Мобильное приложение
- iOS / Android
- Каталог и карточки товаров
- Оформление заказов
- Личный кабинет / заказы (при необходимости)

### Backend и админ-панель
Отдельный backend с админ-панелью, где вы можете:
- добавлять и редактировать товары
- управлять категориями и коллекциями
- просматривать заказы
- менять статусы заказов

---

## Технологии

Приложение разработано на **React Native (Expo)**.  
Backend и админ-панель — отдельный сервис, который настраивается под ваш бизнес и масштабируется по мере роста.

---

## Демонстрация и запуск

По всем вопросам обращайтесь напрямую ко мне — с радостью покажу, как работает мобильное приложение, сайт и админ-панель, настрою под ваш бизнес и помогу с запуском.

---

## Связаться со мной

Email: [borisov130490@gmail.com](mailto:borisov130490@gmail.com)  
Телефон: [+7 987 570-45-14](tel:+79875704514)  
Telegram: [@mickkey_dee](https://t.me/mickkey_dee)
`;

export default function ContactsPage() {
  const insets = useSafeAreaInsets();
  return (
    <WrapperList>
      <View style={{ paddingBottom: insets.bottom }} className="pt-4">
        <Markdown style={{ ...markdownStyles }}>{text}</Markdown>
      </View>
    </WrapperList>
  );
}
