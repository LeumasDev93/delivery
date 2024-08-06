import { useState, useRef } from "react";
import { View, FlatList, SectionList, Text } from "react-native";
import { Link } from "expo-router";

import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";

import { Header } from "@/components/header";
import { CategoryButton } from "@/components/category-button";
import { Product } from "@/components/product";
import { useCartStore } from "@/stores/cart-store";

export default function Home() {
  const cartStore = useCartStore();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  function handleCategorySelect(selectedCategory: string) {
    const selectedCategoryObject = {
      title: selectedCategory,
      thumbnail: selectedCategory,
    };

    setCategory(selectedCategoryObject);

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category.title === selectedCategory
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  function handleSearch(query: string) {
    if (query.trim().length < 3) {
      setIsSearching(false);
      setFilteredProducts([]);
    } else {
      setIsSearching(true);
      const products = MENU.map(section => section.data).flat();
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }

  return (
    <View className="flex-1">
      <Header title="" cardQuantityItens={cartQuantityItems} onSearch={handleSearch} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <CategoryButton
            data={{
              title: item.title,
              thumbnail: item.thumbnail,
              isSelected: item.title === category.title,
            }}
            onPress={() => handleCategorySelect(item.title)}
          />
        )}
        horizontal
        className="max-h-36"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 40, paddingHorizontal: 20 }}
      />

      {isSearching ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Link href={`/product/${item.id}`} asChild>
              <Product data={item} />
            </Link>
          )}
          contentContainerStyle={{ padding: 20 }}
        />
      ) : (
        <SectionList
          ref={sectionListRef}
          sections={MENU}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled={false}
          renderItem={({ item }) => (
            <Link href={`/product/${item.id}`} asChild>
              <Product data={item} />
            </Link>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text className="text-xl text-blue-900 font-heading mt-8 mb-5">
              {title}
            </Text>
          )}
          className="flex-1 p-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}
