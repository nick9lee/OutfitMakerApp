import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Search size={20} color={COLORS.mediumGray} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.mediumGray}
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <X size={18} color={COLORS.mediumGray} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: SPACING.small,
    paddingVertical: SPACING.small - 2,
  },
  searchIcon: {
    marginRight: SPACING.xsmall,
  },
  input: {
    ...TYPOGRAPHY.body,
    flex: 1,
    padding: 0,
    color: COLORS.black,
  },
  clearButton: {
    padding: SPACING.xxsmall,
  },
});

export default SearchBar;