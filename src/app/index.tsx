import React, { useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Add24Regular,
  AddCircle24Regular,
  ArrowRight16Regular,
  BookOpen24Filled,
  BuildingBank24Filled,
  Checkmark12Filled,
  ChevronRight16Regular,
  Dismiss24Regular,
  Folder24Regular,
  FolderAdd24Filled,
  HatGraduation24Filled,
  History24Regular,
  Home24Regular,
  Library24Regular,
  LocalLanguage24Filled,
  Mic20Regular,
  Scales24Filled,
  Search20Regular,
  Search24Regular,
  Shield24Filled,
  VehicleCar24Filled,
} from '@/components/fluent-icons';
import { DesignTokens } from '@/constants/design-tokens';

const USE_NATIVE_DRIVER = Platform.OS !== 'web';

interface StudyDeck {
  id: string;
  title: string;
  flashcardCount: number;
  masteryPercent: number;
  icon: 'scales' | 'car' | 'book' | 'bank' | 'graduation' | 'language';
}

interface StudyFolder {
  id: string;
  name: string;
  deckCount: number;
  totalCards: number;
  masteryPercent: number;
  icon: 'shield' | 'graduation' | 'language' | 'book';
  decks: StudyDeck[];
}

const FOLDERS: StudyFolder[] = [
  {
    id: 'prf',
    name: 'PRF',
    deckCount: 8,
    totalCards: 280,
    masteryPercent: 72,
    icon: 'shield',
    decks: [
      {
        id: 'constitucional',
        title: 'Direito Constitucional',
        flashcardCount: 45,
        masteryPercent: 68,
        icon: 'scales',
      },
      {
        id: 'transito',
        title: 'Legislação de Trânsito',
        flashcardCount: 80,
        masteryPercent: 75,
        icon: 'car',
      },
      {
        id: 'portugues',
        title: 'Português',
        flashcardCount: 120,
        masteryPercent: 52,
        icon: 'book',
      },
      {
        id: 'administrativo',
        title: 'Direito Administrativo',
        flashcardCount: 35,
        masteryPercent: 60,
        icon: 'bank',
      },
    ],
  },
  {
    id: 'faculdade',
    name: 'Faculdade',
    deckCount: 5,
    totalCards: 190,
    masteryPercent: 54,
    icon: 'graduation',
    decks: [
      {
        id: 'estrutura-dados',
        title: 'Estrutura de Dados',
        flashcardCount: 50,
        masteryPercent: 62,
        icon: 'graduation',
      },
      {
        id: 'arquitetura',
        title: 'Arquitetura de Sistemas',
        flashcardCount: 40,
        masteryPercent: 70,
        icon: 'bank',
      },
    ],
  },
  {
    id: 'idiomas',
    name: 'Idiomas',
    deckCount: 6,
    totalCards: 310,
    masteryPercent: 64,
    icon: 'language',
    decks: [
      {
        id: 'ingles',
        title: 'Inglês Avançado C1',
        flashcardCount: 140,
        masteryPercent: 85,
        icon: 'language',
      },
      {
        id: 'espanhol',
        title: 'Vocabulário Espanhol',
        flashcardCount: 95,
        masteryPercent: 58,
        icon: 'book',
      },
    ],
  },
  {
    id: 'direito',
    name: 'Direito',
    deckCount: 4,
    totalCards: 165,
    masteryPercent: 48,
    icon: 'book',
    decks: [
      {
        id: 'penal',
        title: 'Direito Penal',
        flashcardCount: 65,
        masteryPercent: 58,
        icon: 'scales',
      },
      {
        id: 'processual',
        title: 'Processo Penal',
        flashcardCount: 55,
        masteryPercent: 44,
        icon: 'bank',
      },
    ],
  },
];

function FolderIcon({
  type,
  size = 26,
  onAccent = false,
  color,
}: {
  type: StudyFolder['icon'];
  size?: number;
  onAccent?: boolean;
  color?: string;
}) {
  const iconColor = color ?? (onAccent ? '#FFFFFF' : '#F2F2F2');
  switch (type) {
    case 'shield':
      return <Shield24Filled size={size} color={iconColor} />;
    case 'graduation':
      return <HatGraduation24Filled size={size} color={iconColor} />;
    case 'language':
      return <LocalLanguage24Filled size={size} color={iconColor} />;
    case 'book':
      return <BookOpen24Filled size={size} color={iconColor} />;
  }
}

function DeckIcon({
  type,
  size = 26,
  onAccent = false,
  color,
}: {
  type: StudyDeck['icon'];
  size?: number;
  onAccent?: boolean;
  color?: string;
}) {
  const iconColor = color ?? (onAccent ? '#FFFFFF' : '#F2F2F2');
  switch (type) {
    case 'scales':
      return <Scales24Filled size={size} color={iconColor} />;
    case 'car':
      return <VehicleCar24Filled size={size} color={iconColor} />;
    case 'book':
      return <BookOpen24Filled size={size} color={iconColor} />;
    case 'bank':
      return <BuildingBank24Filled size={size} color={iconColor} />;
    case 'graduation':
      return <HatGraduation24Filled size={size} color={iconColor} />;
    case 'language':
      return <LocalLanguage24Filled size={size} color={iconColor} />;
  }
}

export default function StudyHomeScreen() {
  const insets = useSafeAreaInsets();
  const bottomNavHeight = 68 + Math.max(insets.bottom, Platform.OS === 'web' ? 12 : 0);

  // Dynamic user data: starts empty as requested
  const [folders, setFolders] = useState<StudyFolder[]>([]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Creation modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createType, setCreateType] = useState<'folder' | 'deck'>('folder');
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderIcon, setNewFolderIcon] = useState<StudyFolder['icon']>('shield');
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckIcon, setNewDeckIcon] = useState<StudyDeck['icon']>('scales');
  const [selectedParentFolderId, setSelectedParentFolderId] = useState<string>('');

  // Animated values
  const [decksHeaderAnim] = useState(() => new Animated.Value(0));
  const [deckCardAnims] = useState(() => [0, 1, 2, 3, 4, 5, 6, 7].map(() => new Animated.Value(0)));

  const selectedFolder = folders.find((f) => f.id === selectedFolderId) ?? null;
  const totalFlashcards = folders.reduce((sum, f) => sum + f.totalCards, 0);

  const handleToggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSearchOpen((prev) => {
      if (prev) {
        setSearchQuery('');
      }
      return !prev;
    });
  };

  const animateDecksIn = (deckCount: number) => {
    decksHeaderAnim.setValue(0);
    deckCardAnims.forEach((anim) => anim.setValue(0));

    const activeDeckAnims = deckCardAnims.slice(0, Math.min(deckCount, deckCardAnims.length));

    Animated.parallel([
      Animated.timing(decksHeaderAnim, {
        toValue: 1,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: USE_NATIVE_DRIVER,
      }),
      Animated.stagger(
        55,
        activeDeckAnims.map((anim) =>
          Animated.spring(anim, {
            toValue: 1,
            damping: 18,
            stiffness: 190,
            mass: 0.8,
            useNativeDriver: USE_NATIVE_DRIVER,
          })
        )
      ),
    ]).start();
  };

  const handleSelectFolder = (folderId: string) => {
    if (isTransitioning) return;

    if (selectedFolderId === folderId) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setSelectedFolderId(null);
      return;
    }

    const targetFolder = folders.find((f) => f.id === folderId);
    if (!targetFolder) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedFolderId(folderId);
    animateDecksIn(targetFolder.decks.length);
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newFolder: StudyFolder = {
      id: `folder-${Date.now()}`,
      name: newFolderName.trim(),
      deckCount: 0,
      totalCards: 0,
      masteryPercent: 0,
      icon: newFolderIcon,
      decks: [],
    };
    setFolders((prev) => [newFolder, ...prev]);
    setNewFolderName('');
    setIsCreateModalOpen(false);
  };

  const handleCreateDeck = () => {
    if (!newDeckTitle.trim()) return;
    const targetFolderId = selectedParentFolderId || folders[0]?.id;
    if (!targetFolderId) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newDeck: StudyDeck = {
      id: `deck-${Date.now()}`,
      title: newDeckTitle.trim(),
      flashcardCount: 20,
      masteryPercent: 0,
      icon: newDeckIcon,
    };

    setFolders((prev) =>
      prev.map((f) => {
        if (f.id === targetFolderId) {
          return {
            ...f,
            deckCount: f.deckCount + 1,
            totalCards: f.totalCards + 20,
            decks: [newDeck, ...f.decks],
          };
        }
        return f;
      })
    );
    setNewDeckTitle('');
    setIsCreateModalOpen(false);
  };

  return (
    <View style={styles.screenRoot}>
      {/* Top App Bar (#1D1D1D) */}
      <View
        style={[
          styles.topHeaderSurface,
          {
            paddingTop: Math.max(insets.top, 14) + 6,
            paddingBottom: isSearchOpen ? 16 : 12,
          },
        ]}>
        <View style={styles.titleBarRow}>
          <View style={styles.titleBarLeft}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Perfil e alternador de conta"
              style={({ pressed }) => [styles.avatarButton, pressed && styles.pressedOpacity]}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>KM</Text>
                <View style={styles.presenceBadge}>
                  <Checkmark12Filled size={9} color={DesignTokens.colors.textOnAccent} />
                </View>
              </View>
            </Pressable>
          </View>

          <View style={styles.titleBarActions}>
            <Pressable
              onPress={handleToggleSearch}
              accessibilityRole="button"
              accessibilityState={{ expanded: isSearchOpen }}
              accessibilityLabel="Alternar barra de busca"
              style={({ pressed }) => [
                styles.headerIconButton,
                isSearchOpen && styles.headerIconButtonActive,
                pressed && styles.headerIconButtonPressed,
              ]}>
              <Search24Regular
                size={27}
                color={
                  isSearchOpen
                    ? DesignTokens.colors.accentPrimary
                    : DesignTokens.colors.textPrimary
                }
              />
            </Pressable>
          </View>
        </View>

        {isSearchOpen && (
          <View style={styles.searchExpandedRow}>
            <View style={styles.searchPill}>
              <Search20Regular size={22} color={DesignTokens.colors.textSecondary} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Buscar pastas ou decks"
                placeholderTextColor={DesignTokens.colors.textSecondary}
                autoFocus
                style={styles.searchTextInput}
              />
              <Mic20Regular size={22} color={DesignTokens.colors.textSecondary} />
            </View>
            <Pressable
              onPress={handleToggleSearch}
              accessibilityRole="button"
              accessibilityLabel="Fechar busca"
              style={({ pressed }) => [styles.cancelSearchBtn, pressed && styles.pressedOpacity]}>
              <Text style={styles.cancelSearchText}>Cancelar</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Main Scrollable OLED Black Canvas (#000000) */}
      <ScrollView
        style={styles.canvasScroll}
        contentContainerStyle={[
          styles.canvasContent,
          { paddingBottom: bottomNavHeight + 104 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Operational Callout: Revisões de hoje (mostrado apenas se houver flashcards) */}
        {folders.length > 0 && totalFlashcards > 0 && (
          <View style={styles.reviewGroupSection}>
            <View style={styles.reviewInsetCard}>
              <View style={styles.reviewTopRow}>
                <View style={styles.reviewIconBlock}>
                  <History24Regular size={24} color={DesignTokens.colors.accentPrimary} />
                </View>
                <View style={styles.reviewTextCol}>
                  <Text style={styles.reviewTitle}>Revisões de hoje</Text>
                  <Text style={styles.reviewSubtitle}>{totalFlashcards} flashcards pendentes</Text>
                </View>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Começar revisão de ${totalFlashcards} flashcards pendentes`}
                style={({ pressed }) => [
                  styles.startReviewPillBtn,
                  pressed && styles.startReviewPillBtnPressed,
                ]}>
                <Text style={styles.startReviewBtnText}>Começar revisão</Text>
                <ArrowRight16Regular size={16} color={DesignTokens.colors.textOnAccent} />
              </Pressable>
            </View>
          </View>
        )}

        {/* Section Header: "Pastas" (mostrado apenas se houver pastas) */}
        {folders.length > 0 && (
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Pastas</Text>
            {selectedFolder && (
              <Pressable
                onPress={() => handleSelectFolder(selectedFolder.id)}
                accessibilityRole="button"
                accessibilityLabel="Voltar para pastas grandes"
                style={({ pressed }) => [styles.sectionLinkBtn, pressed && styles.pressedOpacity]}>
                <Text style={styles.sectionLinkText}>Ver todas</Text>
              </Pressable>
            )}
          </View>
        )}

        {/* Empty State: Zero folders & zero decks */}
        {folders.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Pressable
              onPress={() => {
                setCreateType('folder');
                setIsCreateModalOpen(true);
              }}
              accessibilityRole="button"
              accessibilityLabel="Criar primeira pasta"
              style={({ pressed }) => [
                styles.emptyStateIconOuter,
                pressed && styles.pressedOpacity,
              ]}>
              <View style={styles.emptyStateIconInner}>
                <FolderAdd24Filled size={36} color={DesignTokens.colors.accentPrimary} />
              </View>
            </Pressable>
            <Text style={styles.emptyStateTitle}>Nenhuma pasta ainda</Text>
            <Text style={styles.emptyStateSubtitle}>
              Crie sua primeira pasta para organizar seus estudos e decks de flashcards.
            </Text>
            <Pressable
              onPress={() => {
                setCreateType('folder');
                setIsCreateModalOpen(true);
              }}
              accessibilityRole="button"
              accessibilityLabel="Criar primeira pasta"
              style={({ pressed }) => [
                styles.emptyStateActionButton,
                pressed && styles.startReviewPillBtnPressed,
              ]}>
              <AddCircle24Regular size={20} color={DesignTokens.colors.textOnAccent} />
              <Text style={styles.emptyStateActionText}>Criar primeira pasta</Text>
            </Pressable>
          </View>
        ) : !selectedFolder ? (
          /* STATE 1: No folder selected -> Physical Folder Silhouette Cards */
          <View style={styles.cardsGrid}>
            {folders.map((folder) => (
              <View key={folder.id} style={styles.folderCardWrapper}>
                <Pressable
                  onPress={() => handleSelectFolder(folder.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Pasta ${folder.name}, ${folder.deckCount} decks`}>
                  {({ pressed }) => {
                    const folderSurfaceColor = pressed ? '#242424' : '#1F1F1F';
                    return (
                      <View
                        style={[
                          styles.folderPocketBody,
                          { backgroundColor: folderSurfaceColor },
                        ]}>
                        <View style={styles.folderElasticBand} />

                        <View style={styles.minimalIconContainer}>
                          <FolderIcon type={folder.icon} size={26} />
                        </View>

                        <View style={styles.minimalCardBottom}>
                          <Text style={styles.minimalCardTitle} numberOfLines={1}>
                            {folder.name}
                          </Text>
                          <Text style={styles.minimalCardMeta} numberOfLines={1}>
                            {folder.deckCount} {folder.deckCount === 1 ? 'deck' : 'decks'}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          /* STATE 2: Folder selected -> Animated Stadium Pill Folders & Decks */
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.compactFoldersRow}>
              {folders.map((folder) => {
                const isSelected = folder.id === selectedFolder.id;
                return (
                  <Pressable
                    key={folder.id}
                    onPress={() => handleSelectFolder(folder.id)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={`Pasta ${folder.name}`}
                    style={({ pressed }) => [
                      styles.compactFolderChip,
                      isSelected && styles.compactFolderChipActive,
                      pressed && !isSelected && styles.minimalCardPressed,
                    ]}>
                    <FolderIcon
                      type={folder.icon}
                      size={18}
                      onAccent={isSelected}
                    />
                    <Text
                      style={[
                        styles.compactFolderName,
                        isSelected && styles.compactFolderNameActive,
                      ]}
                      numberOfLines={1}>
                      {folder.name}
                    </Text>
                    <Text
                      style={[
                        styles.compactFolderCount,
                        isSelected && styles.compactFolderCountActive,
                      ]}>
                      {folder.deckCount}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* DECKS SECTION */}
            <Animated.View
              style={[
                styles.decksSectionHeader,
                {
                  opacity: decksHeaderAnim,
                  transform: [
                    {
                      translateY: decksHeaderAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [14, 0],
                      }),
                    },
                  ],
                },
              ]}>
              <Text style={styles.sectionTitle}>Decks da {selectedFolder.name}</Text>
              <Text style={styles.decksSectionCount}>
                {selectedFolder.decks.length} {selectedFolder.decks.length === 1 ? 'deck' : 'decks'}
              </Text>
            </Animated.View>

            {selectedFolder.decks.length === 0 ? (
              <View style={styles.emptyDecksContainer}>
                <Text style={styles.emptyDecksText}>Esta pasta ainda não possui decks.</Text>
                <Pressable
                  onPress={() => {
                    setSelectedParentFolderId(selectedFolder.id);
                    setCreateType('deck');
                    setIsCreateModalOpen(true);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Criar deck nesta pasta"
                  style={({ pressed }) => [
                    styles.emptyStateActionButton,
                    pressed && styles.startReviewPillBtnPressed,
                  ]}>
                  <AddCircle24Regular size={20} color={DesignTokens.colors.textOnAccent} />
                  <Text style={styles.emptyStateActionText}>Criar deck nesta pasta</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.cardsGrid}>
                {selectedFolder.decks.map((deck, index) => {
                  const deckAnim = deckCardAnims[index] ?? deckCardAnims[0];
                  const animatedDeckStyle = {
                    opacity: deckAnim,
                    transform: [
                      {
                        translateY: deckAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [34, 0],
                        }),
                      },
                      {
                        scale: deckAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.92, 1],
                        }),
                      },
                    ],
                  };

                  return (
                    <Animated.View
                      key={deck.id}
                      style={[styles.deckCardWrapper, animatedDeckStyle]}>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Deck ${deck.title}, ${deck.flashcardCount} flashcards`}
                        style={({ pressed }) => [
                          styles.deckFrontCard,
                          pressed && styles.minimalCardPressed,
                        ]}>
                        <View style={styles.minimalIconContainer}>
                          <DeckIcon type={deck.icon} size={26} />
                        </View>

                        <View style={styles.minimalCardBottom}>
                          <Text style={styles.minimalDeckTitle} numberOfLines={2}>
                            {deck.title}
                          </Text>
                          <Text style={styles.minimalCardMeta} numberOfLines={1}>
                            {deck.flashcardCount} flashcards
                          </Text>
                          <View style={styles.minimalProgressTrack}>
                            <View
                              style={[
                                styles.minimalProgressFill,
                                { width: `${deck.masteryPercent}%` },
                              ]}
                            />
                          </View>
                        </View>
                      </Pressable>
                    </Animated.View>
                  );
                })}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <Pressable
        onPress={() => {
          if (folders.length === 0) {
            setCreateType('folder');
          }
          setIsCreateModalOpen(true);
        }}
        accessibilityRole="button"
        accessibilityLabel="Criar nova pasta ou deck"
        style={({ pressed }) => [
          styles.fabButton,
          { bottom: bottomNavHeight + 22 },
          pressed && styles.fabButtonPressed,
        ]}>
        <Add24Regular size={28} color={DesignTokens.colors.textOnAccent} />
      </Pressable>

      {/* Inset Grouped Creation Modal (Fluent 2 Mobile Style) */}
      <Modal
        visible={isCreateModalOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsCreateModalOpen(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalBackdrop}>
          <Pressable
            style={styles.modalDismissArea}
            onPress={() => setIsCreateModalOpen(false)}
          />

          <View style={styles.modalSheetCard}>
            {/* Modal Navigation Top Bar (#1E1E1E) */}
            <View style={styles.modalSheetHeader}>
              <Pressable
                onPress={() => setIsCreateModalOpen(false)}
                accessibilityRole="button"
                accessibilityLabel="Voltar"
                hitSlop={12}
                style={({ pressed }) => [styles.modalHeaderBtn, pressed && styles.pressedOpacity]}>
                <Text style={styles.modalHeaderBtnText}>Voltar</Text>
              </Pressable>

              <Text style={styles.modalSheetTitle}>
                {createType === 'folder' ? 'Nova Pasta' : 'Novo Deck'}
              </Text>

              <Pressable
                onPress={createType === 'folder' ? handleCreateFolder : handleCreateDeck}
                disabled={
                  createType === 'folder'
                    ? !newFolderName.trim()
                    : !newDeckTitle.trim() || folders.length === 0
                }
                accessibilityRole="button"
                accessibilityLabel="Criar"
                hitSlop={12}
                style={({ pressed }) => [
                  styles.modalHeaderBtn,
                  styles.modalHeaderBtnRight,
                  pressed && styles.pressedOpacity,
                ]}>
                <Text
                  style={[
                    styles.modalHeaderActionText,
                    (createType === 'folder'
                      ? !newFolderName.trim()
                      : !newDeckTitle.trim() || folders.length === 0) &&
                      styles.modalHeaderActionTextDisabled,
                  ]}>
                  Criar
                </Text>
              </Pressable>
            </View>

            {/* Modal Body (#141414 Inset Grouped Canvas) */}
            <ScrollView
              style={styles.modalSheetBody}
              contentContainerStyle={[
                styles.modalSheetScrollContent,
                { paddingBottom: Math.max(insets.bottom, 24) + 20 },
              ]}
              showsVerticalScrollIndicator={false}>
              {/* Account Context Identifier Row */}
              <View style={styles.accountContextRow}>
                <View style={styles.accountContextAvatar}>
                  <Text style={styles.accountContextAvatarText}>KM</Text>
                </View>
                <Text style={styles.accountContextEmail}>cballinger@constoso.com</Text>
              </View>

              {/* Group: Tipo de Criação */}
              <View style={styles.insetSectionGroup}>
                <Text style={styles.insetSectionHeader}>TIPO DE CRIAÇÃO</Text>
                <View style={styles.insetCard}>
                  <Pressable
                    onPress={() => setCreateType('folder')}
                    accessibilityRole="button"
                    accessibilityLabel="Tipo Pasta"
                    style={({ pressed }) => [
                      styles.insetRow,
                      pressed && styles.insetRowPressed,
                    ]}>
                    <View style={styles.insetRowLeft}>
                      <Folder24Regular size={20} color={DesignTokens.colors.textPrimary} />
                      <Text style={styles.insetRowLabel}>Nova Pasta</Text>
                    </View>
                    {createType === 'folder' && (
                      <Checkmark12Filled size={16} color={DesignTokens.colors.accentPrimary} />
                    )}
                  </Pressable>

                  <View style={styles.insetDivider} />

                  <Pressable
                    onPress={() => setCreateType('deck')}
                    accessibilityRole="button"
                    accessibilityLabel="Tipo Deck"
                    style={({ pressed }) => [
                      styles.insetRow,
                      pressed && styles.insetRowPressed,
                    ]}>
                    <View style={styles.insetRowLeft}>
                      <BookOpen24Filled size={20} color={DesignTokens.colors.textPrimary} />
                      <Text style={styles.insetRowLabel}>Novo Deck</Text>
                    </View>
                    {createType === 'deck' && (
                      <Checkmark12Filled size={16} color={DesignTokens.colors.accentPrimary} />
                    )}
                  </Pressable>
                </View>
                <Text style={styles.insetSectionFooter}>
                  Selecione se deseja organizar uma nova disciplina ou criar um deck de flashcards.
                </Text>
              </View>

              {/* Content when creating Folder */}
              {createType === 'folder' ? (
                <>
                  <View style={styles.insetSectionGroup}>
                    <Text style={styles.insetSectionHeader}>INFORMAÇÕES DA PASTA</Text>
                    <View style={styles.insetCard}>
                      <TextInput
                        value={newFolderName}
                        onChangeText={setNewFolderName}
                        placeholder="Nome da pasta (ex: OAB, Medicina...)"
                        placeholderTextColor="#707070"
                        style={styles.insetTextInput}
                        autoFocus
                      />
                    </View>
                    <Text style={styles.insetSectionFooter}>
                      As pastas agrupam múltiplos decks e organizam seus estudos por matéria.
                    </Text>
                  </View>

                  <View style={styles.insetSectionGroup}>
                    <Text style={styles.insetSectionHeader}>ÍCONE DE IDENTIFICAÇÃO</Text>
                    <View style={[styles.insetCard, styles.iconPickerCard]}>
                      {(['shield', 'graduation', 'language', 'book'] as const).map((iconKey) => {
                        const isSel = newFolderIcon === iconKey;
                        return (
                          <Pressable
                            key={iconKey}
                            onPress={() => setNewFolderIcon(iconKey)}
                            accessibilityRole="button"
                            accessibilityLabel={`Ícone ${iconKey}`}
                            style={[
                              styles.insetIconPill,
                              isSel && styles.insetIconPillSelected,
                            ]}>
                            <FolderIcon type={iconKey} size={22} onAccent={isSel} />
                          </Pressable>
                        );
                      })}
                    </View>
                    <Text style={styles.insetSectionFooter}>
                      O ícone escolhido será exibido no cartão principal da pasta.
                    </Text>
                  </View>

                  <View style={styles.insetSectionGroup}>
                    <View style={styles.insetCard}>
                      <Pressable
                        onPress={handleCreateFolder}
                        disabled={!newFolderName.trim()}
                        accessibilityRole="button"
                        accessibilityLabel="Criar Pasta"
                        style={({ pressed }) => [
                          styles.insetActionRow,
                          !newFolderName.trim() && styles.insetActionRowDisabled,
                          pressed && styles.pressedOpacity,
                        ]}>
                        <Text
                          style={[
                            styles.insetActionText,
                            !newFolderName.trim() && styles.insetActionTextDisabled,
                          ]}>
                          Criar Pasta
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </>
              ) : (
                /* Content when creating Deck */
                <>
                  {folders.length === 0 ? (
                    <View style={styles.insetSectionGroup}>
                      <Text style={styles.insetSectionHeader}>PASTA NECESSÁRIA</Text>
                      <View style={styles.insetCard}>
                        <View style={styles.insetWarningContent}>
                          <Text style={styles.insetWarningText}>
                            Para criar um deck, você precisa ter ao menos uma pasta criada.
                          </Text>
                          <Pressable
                            onPress={() => setCreateType('folder')}
                            accessibilityRole="button"
                            accessibilityLabel="Criar pasta agora"
                            style={styles.insetWarningAction}>
                            <Text style={styles.insetWarningActionText}>Criar pasta agora</Text>
                            <ChevronRight16Regular size={16} color={DesignTokens.colors.accentPrimary} />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <>
                      <View style={styles.insetSectionGroup}>
                        <Text style={styles.insetSectionHeader}>INFORMAÇÕES DO DECK</Text>
                        <View style={styles.insetCard}>
                          <TextInput
                            value={newDeckTitle}
                            onChangeText={setNewDeckTitle}
                            placeholder="Título do deck (ex: Direito Penal...)"
                            placeholderTextColor="#707070"
                            style={styles.insetTextInput}
                            autoFocus
                          />
                        </View>
                        <Text style={styles.insetSectionFooter}>
                          O deck armazenará seus flashcards e revisões diárias.
                        </Text>
                      </View>

                      <View style={styles.insetSectionGroup}>
                        <Text style={styles.insetSectionHeader}>PASTA DE DESTINO</Text>
                        <View style={styles.insetCard}>
                          {folders.map((folder, idx) => {
                            const isSel = (selectedParentFolderId || folders[0]?.id) === folder.id;
                            return (
                              <React.Fragment key={folder.id}>
                                {idx > 0 && <View style={styles.insetDivider} />}
                                <Pressable
                                  onPress={() => setSelectedParentFolderId(folder.id)}
                                  accessibilityRole="button"
                                  accessibilityLabel={`Selecionar pasta ${folder.name}`}
                                  style={({ pressed }) => [
                                    styles.insetRow,
                                    pressed && styles.insetRowPressed,
                                  ]}>
                                  <View style={styles.insetRowLeft}>
                                    <FolderIcon type={folder.icon} size={18} />
                                    <Text style={styles.insetRowLabel}>{folder.name}</Text>
                                  </View>
                                  {isSel && (
                                    <Checkmark12Filled size={16} color={DesignTokens.colors.accentPrimary} />
                                  )}
                                </Pressable>
                              </React.Fragment>
                            );
                          })}
                        </View>
                        <Text style={styles.insetSectionFooter}>
                          Selecione em qual pasta este deck será adicionado.
                        </Text>
                      </View>

                      <View style={styles.insetSectionGroup}>
                        <Text style={styles.insetSectionHeader}>ÍCONE DO DECK</Text>
                        <View style={[styles.insetCard, styles.iconPickerCard]}>
                          {(['scales', 'book', 'bank', 'graduation', 'language', 'car'] as const).map(
                            (iconKey) => {
                              const isSel = newDeckIcon === iconKey;
                              return (
                                <Pressable
                                  key={iconKey}
                                  onPress={() => setNewDeckIcon(iconKey)}
                                  accessibilityRole="button"
                                  accessibilityLabel={`Ícone ${iconKey}`}
                                  style={[
                                    styles.insetIconPill,
                                    isSel && styles.insetIconPillSelected,
                                  ]}>
                                  <DeckIcon type={iconKey} size={22} onAccent={isSel} />
                                </Pressable>
                              );
                            }
                          )}
                        </View>
                        <Text style={styles.insetSectionFooter}>
                          Ícone temático exibido no cartão do deck.
                        </Text>
                      </View>

                      <View style={styles.insetSectionGroup}>
                        <View style={styles.insetCard}>
                          <Pressable
                            onPress={handleCreateDeck}
                            disabled={!newDeckTitle.trim()}
                            accessibilityRole="button"
                            accessibilityLabel="Criar Deck"
                            style={({ pressed }) => [
                              styles.insetActionRow,
                              !newDeckTitle.trim() && styles.insetActionRowDisabled,
                              pressed && styles.pressedOpacity,
                            ]}>
                            <Text
                              style={[
                                styles.insetActionText,
                                !newDeckTitle.trim() && styles.insetActionTextDisabled,
                              ]}>
                              Criar Deck
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Bottom Tab Bar (#1D1D1D surface) */}
      <View
        style={[
          styles.bottomTabBar,
          {
            height: bottomNavHeight,
            paddingBottom: Math.max(insets.bottom, Platform.OS === 'web' ? 10 : 0),
          },
        ]}>
        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected: false }}
          style={styles.tabItem}>
          <Home24Regular size={28} color={DesignTokens.colors.textSecondary} />
          <Text style={styles.tabLabelInactive}>Início</Text>
        </Pressable>

        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected: false }}
          style={styles.tabItem}>
          <View style={styles.tabIconWrapper}>
            <Library24Regular size={28} color={DesignTokens.colors.textSecondary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>4</Text>
            </View>
          </View>
          <Text style={styles.tabLabelInactive}>Biblioteca</Text>
        </Pressable>

        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected: true }}
          style={styles.tabItem}>
          <HatGraduation24Filled size={28} color={DesignTokens.colors.accentPrimary} />
          <Text style={styles.tabLabelActive}>Estudar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: DesignTokens.colors.bgCanvas,
  },

  /* Top App Bar & Collapsible Search Header */
  topHeaderSurface: {
    backgroundColor: DesignTokens.colors.bgHeader,
    paddingHorizontal: 16,
  },
  titleBarRow: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: DesignTokens.radius.pill,
    backgroundColor: DesignTokens.colors.avatarPlumBg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarInitials: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    color: DesignTokens.colors.avatarPlumText,
  },
  presenceBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 13,
    height: 13,
    borderRadius: DesignTokens.radius.pill,
    backgroundColor: DesignTokens.colors.presenceAvailable,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIconButton: {
    width: 46,
    height: 46,
    borderRadius: DesignTokens.radius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconButtonActive: {
    backgroundColor: DesignTokens.colors.accentSubtleBg,
  },
  headerIconButtonPressed: {
    backgroundColor: DesignTokens.colors.bgSurfaceHover,
  },
  searchExpandedRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  searchPill: {
    flex: 1,
    height: 46,
    borderRadius: DesignTokens.radius.pill,
    backgroundColor: DesignTokens.colors.bgInput,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchTextInput: {
    flex: 1,
    fontFamily: DesignTokens.typography.fontFamily.regular,
    fontSize: 17,
    color: DesignTokens.colors.textPrimary,
    paddingVertical: 0,
  },
  cancelSearchBtn: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  cancelSearchText: {
    fontFamily: DesignTokens.typography.fontFamily.medium,
    fontSize: 16,
    color: DesignTokens.colors.textSecondary,
  },

  /* Scroll Canvas */
  canvasScroll: {
    flex: 1,
    backgroundColor: DesignTokens.colors.bgCanvas,
  },
  canvasContent: {
    paddingTop: 22,
  },

  /* Section Headers */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
  },
  sectionTitle: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.2,
    color: DesignTokens.colors.textPrimary,
  },
  sectionLinkBtn: {
    paddingVertical: 6,
  },
  sectionLinkText: {
    fontFamily: DesignTokens.typography.fontFamily.medium,
    fontSize: 15,
    lineHeight: 20,
    color: DesignTokens.colors.textLink,
  },

  /* Shared Grid Container */
  cardsGrid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 24,
  },

  /* ============================================================================
   * 1. PASTA (FOLDER) CARD
   * Clean rounded rectangle card (#1F1F1F) matching Fluent Design standards
   * ============================================================================ */
  folderCardWrapper: {
    width: '48%',
    flexGrow: 1,
    minWidth: 154,
  },
  folderPocketBody: {
    minHeight: 172,
    backgroundColor: DesignTokens.colors.bgCard,
    borderRadius: 14,
    padding: 18,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
  },
  folderElasticBand: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 26,
    width: 5,
    backgroundColor: '#191919',
  },

  /* ============================================================================
   * 2. DECK CARD SILHOUETTE
   * Clean rounded rectangle (#1F1F1F) without folder tab or stacked layers
   * ============================================================================ */
  deckCardWrapper: {
    width: '48%',
    flexGrow: 1,
    minWidth: 154,
  },
  deckFrontCard: {
    minHeight: 172,
    backgroundColor: DesignTokens.colors.bgCard,
    borderRadius: 14,
    padding: 18,
    justifyContent: 'space-between',
  },

  /* Shared Minimalist Card Content Elements */
  minimalCardPressed: {
    backgroundColor: DesignTokens.colors.bgSurfaceHover,
  },
  minimalIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: DesignTokens.colors.bgSettingsGroup,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minimalCardBottom: {
    marginTop: 22,
  },
  minimalCardTitle: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: -0.25,
    color: DesignTokens.colors.textPrimary,
  },
  minimalDeckTitle: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.2,
    color: DesignTokens.colors.textPrimary,
  },
  minimalCardMeta: {
    fontFamily: DesignTokens.typography.fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: DesignTokens.colors.textSecondary,
    marginTop: 4,
    fontVariant: ['tabular-nums'],
  },
  minimalProgressTrack: {
    marginTop: 12,
    height: 3,
    borderRadius: DesignTokens.radius.pill,
    backgroundColor: '#2A2A2E',
    overflow: 'hidden',
  },
  minimalProgressFill: {
    height: '100%',
    borderRadius: DesignTokens.radius.pill,
    backgroundColor: DesignTokens.colors.accentPrimary,
  },

  /* Compact Folders Top Row (Stadium Pills: Icon + Label) */
  compactFoldersRow: {
    paddingHorizontal: 16,
    paddingBottom: 22,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactFolderChip: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: DesignTokens.radius.pill,
    backgroundColor: '#1C1C22',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  compactFolderChipActive: {
    backgroundColor: '#0F6CBD',
  },
  compactFolderName: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  compactFolderNameActive: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
  compactFolderCount: {
    fontFamily: DesignTokens.typography.fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#8A8E9B',
    marginLeft: 2,
  },
  compactFolderCountActive: {
    color: '#D0E4F7',
  },

  /* Decks Section Header */
  decksSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  decksSectionCount: {
    fontFamily: DesignTokens.typography.fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: DesignTokens.colors.textSecondary,
    fontVariant: ['tabular-nums'],
  },

  /* Operational Callout: Revisões de hoje */
  reviewGroupSection: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
  },
  reviewInsetCard: {
    backgroundColor: DesignTokens.colors.bgCard,
    borderRadius: DesignTokens.radius.lg,
    padding: DesignTokens.spacing.space4,
    gap: 14,
  },
  reviewTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reviewIconBlock: {
    width: 42,
    height: 42,
    borderRadius: DesignTokens.radius.group,
    backgroundColor: DesignTokens.colors.bgSettingsGroup,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewTextCol: {
    flex: 1,
  },
  reviewTitle: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.16,
    color: DesignTokens.colors.textPrimary,
  },
  reviewSubtitle: {
    fontFamily: DesignTokens.typography.fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: DesignTokens.colors.textSecondary,
    marginTop: 2,
    fontVariant: ['tabular-nums'],
  },
  startReviewPillBtn: {
    height: 42,
    borderRadius: DesignTokens.radius.pill,
    backgroundColor: DesignTokens.colors.accentPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
  startReviewPillBtnPressed: {
    backgroundColor: DesignTokens.colors.accentPrimaryPressed,
  },
  startReviewBtnText: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: DesignTokens.colors.textOnAccent,
  },

  /* Floating Action Button (FAB) */
  fabButton: {
    position: 'absolute',
    right: 16,
    width: 60,
    height: 60,
    borderRadius: DesignTokens.radius.pill,
    backgroundColor: DesignTokens.colors.accentPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  fabButtonPressed: {
    backgroundColor: DesignTokens.colors.accentPrimaryPressed,
  },

  /* Bottom Navigation Bar */
  bottomTabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: DesignTokens.colors.bgNavSolid,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  tabItem: {
    flex: 1,
    height: 68,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  tabIconWrapper: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: DesignTokens.radius.pill,
    backgroundColor: DesignTokens.colors.statusDangerBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    fontFamily: DesignTokens.typography.fontFamily.bold,
    fontSize: 11,
    lineHeight: 14,
    color: DesignTokens.colors.statusDangerText,
    fontVariant: ['tabular-nums'],
  },
  tabLabelActive: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
    color: DesignTokens.colors.accentPrimary,
  },
  tabLabelInactive: {
    fontFamily: DesignTokens.typography.fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: DesignTokens.colors.textSecondary,
  },

  /* States */
  pressedOpacity: {
    opacity: 0.75,
  },

  /* Empty State */
  emptyStateContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateIconOuter: {
    width: 96,
    height: 96,
    borderRadius: 30,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyStateIconInner: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(71, 158, 245, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateTitle: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 18,
    lineHeight: 24,
    color: DesignTokens.colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontFamily: DesignTokens.typography.fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: DesignTokens.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 290,
  },
  emptyStateActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: DesignTokens.colors.accentPrimary,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: DesignTokens.radius.pill,
  },
  emptyStateActionText: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    color: DesignTokens.colors.textOnAccent,
  },

  /* Empty Decks Inside Folder */
  emptyDecksContainer: {
    paddingVertical: 36,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  emptyDecksText: {
    fontFamily: DesignTokens.typography.fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: DesignTokens.colors.textSecondary,
  },

  /* Inset Grouped Creation Modal (Fluent 2 Mobile Style) */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    justifyContent: 'flex-end',
  },
  modalDismissArea: {
    height: 48,
  },
  modalSheetCard: {
    flex: 1,
    backgroundColor: '#141414',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  modalSheetHeader: {
    height: 52,
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  modalHeaderBtn: {
    minWidth: 60,
    justifyContent: 'center',
  },
  modalHeaderBtnRight: {
    alignItems: 'flex-end',
  },
  modalHeaderBtnText: {
    fontFamily: DesignTokens.typography.fontFamily.regular,
    fontSize: 15,
    color: '#9E9E9E',
  },
  modalSheetTitle: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 16,
    color: DesignTokens.colors.textPrimary,
    textAlign: 'center',
  },
  modalHeaderActionText: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 15,
    color: DesignTokens.colors.accentPrimary,
  },
  modalHeaderActionTextDisabled: {
    color: '#555555',
  },
  modalSheetBody: {
    flex: 1,
    backgroundColor: '#141414',
  },
  modalSheetScrollContent: {
    paddingTop: 8,
  },
  accountContextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 28,
    paddingTop: 14,
    paddingBottom: 16,
  },
  accountContextAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#341A51',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountContextAvatarText: {
    fontFamily: DesignTokens.typography.fontFamily.bold,
    fontSize: 10,
    color: '#E2D5F0',
  },
  accountContextEmail: {
    fontFamily: DesignTokens.typography.fontFamily.regular,
    fontSize: 13,
    color: '#9E9E9E',
  },
  insetSectionGroup: {
    marginBottom: 16,
  },
  insetSectionHeader: {
    fontFamily: DesignTokens.typography.fontFamily.medium,
    fontSize: 12,
    color: '#9E9E9E',
    paddingHorizontal: 28,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  insetCard: {
    marginHorizontal: 16,
    backgroundColor: '#262626',
    borderRadius: 12,
    overflow: 'hidden',
  },
  insetSectionFooter: {
    fontFamily: DesignTokens.typography.fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: '#9E9E9E',
    paddingHorizontal: 28,
    marginTop: 6,
  },
  insetRow: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  insetRowPressed: {
    backgroundColor: '#303030',
  },
  insetRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  insetRowLabel: {
    fontFamily: DesignTokens.typography.fontFamily.regular,
    fontSize: 15,
    color: '#FFFFFF',
  },
  insetDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#333333',
    marginLeft: 48,
  },
  insetTextInput: {
    height: 50,
    paddingHorizontal: 16,
    fontFamily: DesignTokens.typography.fontFamily.regular,
    fontSize: 15,
    color: '#FFFFFF',
  },
  iconPickerCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 12,
  },
  insetIconPill: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insetIconPillSelected: {
    backgroundColor: DesignTokens.colors.accentPrimary,
  },
  insetActionRow: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insetActionRowDisabled: {
    opacity: 0.5,
  },
  insetActionText: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 15,
    color: DesignTokens.colors.accentPrimary,
  },
  insetActionTextDisabled: {
    color: '#707070',
  },
  insetWarningContent: {
    padding: 16,
    gap: 12,
  },
  insetWarningText: {
    fontFamily: DesignTokens.typography.fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#9E9E9E',
  },
  insetWarningAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  insetWarningActionText: {
    fontFamily: DesignTokens.typography.fontFamily.semiBold,
    fontSize: 14,
    color: DesignTokens.colors.accentPrimary,
  },
});
