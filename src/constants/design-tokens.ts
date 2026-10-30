/**
 * Memora Design System Tokens (Dark Mode)
 * Extracted directly from DESIGN.md
 */

export const DesignTokens = {
  colors: {
    // 2.1 Backgrounds & Surfaces (Fluent Dark Luminance Ladder)
    bgCanvas: '#000000',
    bgNavSolid: '#3D3D3D',
    bgNavTranslucent: 'rgba(61, 61, 61, 0.85)',
    bgSheetCanvas: '#141414',
    bgDrawer: '#1F1F1F',
    bgSheetHeader: '#1F1F1F',
    bgCard: '#1F1F1F',
    bgSurfaceDisabled: '#222222',
    bgHeader: '#3D3D3D',
    bgSettingsGroup: '#292929',
    bgSurfacePill: '#292929',
    bgCardOverlayBtn: 'rgba(41, 41, 41, 0.90)',
    bgSurfaceHover: '#333333',
    bgInput: '#3D3D3D',
    bgBackdropScrim: 'rgba(0, 0, 0, 0.60)',

    // 2.2 Brand & Accent
    accentPrimary: '#479EF5',
    accentPrimaryHover: '#62ABF5',
    accentPrimaryPressed: '#2886DE',
    accentSheetPeek: '#2F69A3',
    accentSubtleBg: 'rgba(71, 158, 245, 0.15)',

    // 2.3 Foregrounds & Text
    textPrimary: '#FFFFFF',
    textSecondary: '#9E9E9E',
    textDisabled: '#5E5E5E',
    textOnAccent: '#000000',
    textLink: '#479EF5',
    textDanger: '#D15E69',
    toggleThumb: '#FFFFFF',

    // 2.4 Semantic, Presence, Avatars & Borders
    statusDangerBg: '#B10E1C',
    statusDangerText: '#FFFFFF',
    presenceAvailable: '#3DB838',
    avatarPlumBg: '#341A51',
    avatarPlumText: '#E2D5F0',
    indicatorUnread: '#FFFFFF',

    // Semantic Category / Document Accents
    filetypeDocBlue: '#185ABD',
    filetypeSlideOrange: '#D24726',
    filetypeSheetGreen: '#107C41',
    filetypeMailBlue: '#0078D4',
    filetypeMailCyan: '#28A8EA',

    // Dividers & Hairlines
    borderSubtle: '#1A1A1A',
    borderNavTop: '#1B1B1B',
    borderDrawerDivider: '#2A2A2A',
    borderGroupInner: '#2E2E2E',
  },

  typography: {
    fontFamily: {
      regular: 'Inter_400Regular',
      medium: 'Inter_500Medium',
      semiBold: 'Inter_600SemiBold',
      bold: 'Inter_700Bold',
    },
    scale: {
      title1: {
        fontSize: 24,
        lineHeight: 30,
        letterSpacing: -0.48,
      },
      title2: {
        fontSize: 16,
        lineHeight: 22,
        letterSpacing: -0.16,
      },
      body1: {
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: -0.08,
      },
      cardTitle: {
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: -0.07,
      },
      body2: {
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: 0,
      },
      caption1: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0,
      },
      caption2: {
        fontSize: 10,
        lineHeight: 12,
        letterSpacing: 0.1,
      },
      badgeCount: {
        fontSize: 10,
        lineHeight: 12,
        letterSpacing: 0,
      },
    },
  },

  spacing: {
    space1: 4,
    space2: 8,
    space3: 12,
    space4: 16,
    space5: 20,
    space6: 24,
  },

  radius: {
    xs: 4,
    sm: 6,
    md: 8,
    group: 10,
    lg: 12,
    pill: 9999,
  },
} as const;

