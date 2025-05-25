// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { useRouter } from 'expo-router';
// import { COLORS } from '@/constants/Colors';
// import { SPACING } from '@/constants/Spacing';
// import { TYPOGRAPHY } from '@/constants/Typography';
// import { Plus, Search, FilterX } from 'lucide-react-native';
// import Button from '@/components/ui/Button';
// import OutfitCard from '@/components/wardrobe/OutfitCard';
// import SearchBar from '@/components/ui/SearchBar';

// // Mock data
// const mockOutfits = [
//   {
//     id: '1',
//     name: 'Casual Summer',
//     image: 'https://images.pexels.com/photos/5325881/pexels-photo-5325881.jpeg',
//     date: '2025-05-10',
//     items: 3,
//   },
//   {
//     id: '2',
//     name: 'Business Meeting',
//     image: 'https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg',
//     date: '2025-05-08',
//     items: 4,
//   },
//   {
//     id: '3',
//     name: 'Weekend Look',
//     image: 'https://images.pexels.com/photos/5325886/pexels-photo-5325886.jpeg',
//     date: '2025-05-05',
//     items: 2,
//   },
//   {
//     id: '4',
//     name: 'Evening Event',
//     image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
//     date: '2025-05-01',
//     items: 5,
//   },
//   {
//     id: '5',
//     name: 'Workout Style',
//     image: 'https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg',
//     date: '2025-04-28',
//     items: 3,
//   },
//   {
//     id: '6',
//     name: 'Beach Day',
//     image: 'https://images.pexels.com/photos/1034859/pexels-photo-1034859.jpeg',
//     date: '2025-04-25',
//     items: 2,
//   },
// ];

// export default function WardrobeScreen() {
//   const router = useRouter();
//   const [outfits, setOutfits] = useState(mockOutfits);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredOutfits, setFilteredOutfits] = useState(mockOutfits);

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
    
//     if (query.trim() === '') {
//       setFilteredOutfits(outfits);
//     } else {
//       const filtered = outfits.filter(outfit => 
//         outfit.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredOutfits(filtered);
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//     setFilteredOutfits(outfits);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>My Wardrobe</Text>
//         <Text style={styles.subtitle}>Your generated outfits</Text>
//       </View>

//       <View style={styles.searchContainer}>
//         <SearchBar
//           value={searchQuery}
//           onChangeText={handleSearch}
//           placeholder="Search outfits..."
//           onClear={clearSearch}
//         />
//       </View>

//       {filteredOutfits.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <FilterX size={48} color={COLORS.black} style={{ opacity: 0.5 }} />
//           <Text style={styles.emptyText}>No outfits found</Text>
//           <Button 
//             title="Clear Search" 
//             onPress={clearSearch} 
//             style={styles.clearButton}
//           />
//         </View>
//       ) : (
//         <FlatList
//           data={filteredOutfits}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <OutfitCard 
//               name={item.name}
//               imageUrl={item.image}
//               date={item.date}
//               items={item.items}
//               onPress={() => {}}
//             />
//           )}
//           numColumns={2}
//           columnWrapperStyle={styles.outfitRow}
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//         />
//       )}

//       <TouchableOpacity 
//         style={styles.addButton}
//         onPress={() => router.push('/try-on')}
//       >
//         <Plus size={24} color={COLORS.white} />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   header: {
//     paddingTop: 60,
//     paddingHorizontal: SPACING.medium,
//     paddingBottom: SPACING.small,
//   },
//   title: {
//     ...TYPOGRAPHY.h1,
//     color: COLORS.black,
//   },
//   subtitle: {
//     ...TYPOGRAPHY.body,
//     color: COLORS.black,
//     opacity: 0.7,
//   },
//   searchContainer: {
//     paddingHorizontal: SPACING.medium,
//     marginBottom: SPACING.medium,
//   },
//   listContent: {
//     paddingHorizontal: SPACING.medium,
//     paddingBottom: 100, // Extra padding for the floating button
//   },
//   outfitRow: {
//     justifyContent: 'space-between',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: SPACING.large,
//   },
//   emptyText: {
//     ...TYPOGRAPHY.h3,
//     color: COLORS.black,
//     opacity: 0.7,
//     marginVertical: SPACING.medium,
//   },
//   clearButton: {
//     minWidth: 150,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 24,
//     right: 24,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: COLORS.green,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//     shadowColor: COLORS.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
// });